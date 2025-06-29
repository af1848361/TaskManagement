import {useEffect, useMemo, useState} from 'react';
import {
  createItem,
  deleteItem,
  updateItem,
} from '../../../../services/firebase';
import {navigate} from '../../../../navigation/rootNavigation';
import {routes} from '../../../../services';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addTask, removeTask, updateTask} from '../../../../store/appSlice';

export function useHooks() {
  const dispatch = useDispatch();

  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    status: 'Todo',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [error, setError] = useState({
    title: false,
  });
  const route = useRoute();
  const ItemCameFromParam = useMemo(() => route?.params?.Item, []);

  useEffect(() => {
    if (ItemCameFromParam) {
      setTaskValues(ItemCameFromParam);
    }
  }, []);

  const handleSettingError = () => {
    if (taskValues.title.trim() === '' || taskValues.title.length == 0) {
      setError({title: true});
      return true;
    } else {
      setError({title: false});
      return false;
    }
  };

  const handleChangingTaskValue = (updatedField, value) => {
    setTaskValues(prevValues => ({
      ...prevValues,
      [updatedField]: value,
    }));
  };

  const handleSubmit = async () => {
    const err = handleSettingError();
    if (err) {
      console.log('Validation Error');
      return;
    }

    try {
      setIsLoading(true);

      if (ItemCameFromParam) {
        const {title, description, status, id} = ItemCameFromParam;

        if (!id) {
          console.error('Error: Item ID is undefined. Cannot update item.');
          setIsLoading(false);
          return;
        }

        if (
          title === taskValues.title &&
          description === taskValues.description &&
          status === taskValues.status
        ) {
          setIsLoading(false);
          setTimeout(() => navigate(routes.home), 500);
          return;
        }

        const response = await updateItem({id, updates: taskValues});

        if (response.Success) {
          dispatch(
            updateTask({
              id,
              updatedTask: taskValues,
            }),
          );
          setIsLoading(false);
          setTimeout(() => navigate(routes.home), 500);
        }
      } else {
        const response = await createItem({data: taskValues});
        if (response.Success) {
          dispatch(addTask(response.data));
          setIsLoading(false);
          setTimeout(() => navigate(routes.home), 500);
        }
      }
    } catch (error) {
      console.log('Error: >>>>>>>>>', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDelLoading(true);
      await deleteItem({
        id: ItemCameFromParam?.id,
      }).then(response => {
        if (response.Success) {
          dispatch(removeTask(ItemCameFromParam?.id));
          setIsDelLoading(false);
          setTimeout(() => {
            navigate(routes.home);
          }, 500);
        }
      });
    } catch (error) {
      console.log('Error: >>>>>>>>>', error);
    } finally {
      setIsDelLoading(false);
    }
  };

  return {
    taskValues,
    error,
    handleChangingTaskValue,
    handleSubmit,
    isLoading,
    handleDelete,
    ItemCameFromParam,
    isDelLoading,
  };
}
