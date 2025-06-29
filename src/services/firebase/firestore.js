import {getApp} from '@react-native-firebase/app';
import {
  getFirestore,
  Timestamp,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  where,
  getDoc,
  deleteDoc,
  orderBy,
} from '@react-native-firebase/firestore';

const firebaseApp = getApp();
const firestore = getFirestore(firebaseApp);
const tasksCollection = collection(firestore, 'Task');

const getFirestoreDate = () => Timestamp.now();

export const createItem = async ({data}) => {
  try {
    const docRef = await addDoc(tasksCollection, {
      ...data,
      id: '',
      createdAt: ConvertTimestampToISO({value: getFirestoreDate()}),
    });

    await updateDoc(docRef, {
      id: docRef.id,
    });

    return {Success: true, data: {...data, id: docRef.id}};
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const getItem = async id => {
  try {
    const docRef = doc(tasksCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error;
  }
};

export const getAllItems = async () => {
  try {
    const q = query(tasksCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error fetching all items:', error);
    throw error;
  }
};

export const updateItem = async ({id, updates}) => {
  try {
    await updateDoc(doc(tasksCollection, id), {
      ...updates,
      updatedAt: getFirestoreDate(),
    });
    return {Success: true};
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
};

export const deleteItem = async ({id}) => {
  try {
    await deleteDoc(doc(tasksCollection, id));
    return {Success: true};
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error;
  }
};

export const searchItemsByTitle = async letter => {
  try {
    const q = query(
      tasksCollection,
      where('Title', '>=', letter),
      where('Title', '<', letter + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error(`Error searching items starting with "${letter}":`, error);
    throw error;
  }
};

export const ConvertTimestampToISO = ({value}) => {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  return value;
};
