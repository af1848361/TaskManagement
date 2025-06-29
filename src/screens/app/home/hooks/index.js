import {useEffect, useMemo, useState} from 'react';
import {
  getAllItems,
  ConvertTimestampToISO,
} from '../../../../services/firebase';
import {addAllTask} from '../../../../store/appSlice';
import {useDispatch, useSelector} from 'react-redux';

export function useHooks() {
  const [SelectTaskType, setSelectTaskType] = useState('All');
  const [SearchValue, setSearchValue] = useState('');
  const [TaskData, setTaskaData] = useState([]);
  const [IsLoadingData, setIsLoadingData] = useState(false);

  const dispatch = useDispatch();
  const StoredTask = useSelector(state => state?.app?.tasks);

  console.log('>>>>>>>>>>>>>', StoredTask);
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoadingData(true);
      await getAllItems().then(responce => {
        if (responce && responce.length > 0) {
          const TosaveOnRedux = responce.map(item => {
            return {
              ...item,
              createdAt: ConvertTimestampToISO({value: item?.createdAt}),
              updatedAt: item?.updatedAt
                ? ConvertTimestampToISO({value: item.updatedAt})
                : null,
            };
          });
          dispatch(addAllTask(TosaveOnRedux));
          setIsLoadingData(false);
          setTaskaData([...responce]);
          console.log(responce);
        } else {
          console.log('Ended');
          setIsLoadingData(false);
        }
      });
    };
    if (StoredTask.length === 0) {
      fetchItems();
    } else {
      setTaskaData([...StoredTask]);
    }
  }, []);
  const TypesOfTaskList = useMemo(
    () => ['All', 'Todo', 'In Progress', 'Completed'],
    [],
  );

  const StatusCount = useMemo(() => {
    const count = {
      Todo: 0,
      'In Progress': 0,
      Completed: 0,
      Total: 0,
    };
    TaskData.forEach(task => {
      count[task.status] = count[task.status] + 1;
      count.Total = count.Total + 1;
    });
    return count;
  }, [TaskData]);

  return {
    // States
    SelectTaskType,
    setSelectTaskType,
    SearchValue,
    setSearchValue,
    // Hooks
    TypesOfTaskList,
    TaskData,
    StatusCount,

    //Loading
    IsLoadingData,
  };
}
