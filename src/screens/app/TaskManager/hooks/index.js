import {useEffect, useMemo, useState} from 'react';
import {
  createItem,
  deleteItem,
  updateItem,
} from '../../../../services/firebase';
import {navigate} from '../../../../navigation/rootNavigation';
import {routes} from '../../../../services';
import {useRoute} from '@react-navigation/native';
import {updateDoc} from '@react-native-firebase/firestore';

export function useHooks() {
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
    if (!err) {
      try {
        setIsLoading(true);
        if (ItemCameFromParam) {
          await updateItem({
            id: ItemCameFromParam?.id,
            updates: taskValues,
          }).then(response => {
            if (response.Success) {
              setIsLoading(false);
              setTimeout(() => {
                navigate(routes.home);
              }, 500);
            }
          });
        } else {
          await createItem({data: taskValues}).then(response => {
            console.log('Got the responce: ', response.Success);
            if (response.Success) {
              setIsLoading(false);
              setTimeout(() => {
                navigate(routes.home);
              }, 500);
            }
          });
        }
      } catch (error) {
        console.log('Error: >>>>>>>>>', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Error');
    }
  };
  const handleDelete = async () => {
    try {
      setIsDelLoading(true);
      await deleteItem({
        id: ItemCameFromParam?.id,
      }).then(response => {
        if (response.Success) {
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
