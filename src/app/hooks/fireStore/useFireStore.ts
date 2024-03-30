import { useCallback, useEffect, useRef } from "react";
//redux
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/genericSlice";
import { DocumentData,collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";


type ListenerState = {
  name?: string
  unsubscribe: () => void
}


export const useFireStore = <T extends DocumentData>(path: string) => {

  const listenerRef = useRef<ListenerState[]>([])


  useEffect(() => {
    let listenerRefValue: ListenerState[] | null = null;
    
    if (listenerRef.current) {
      listenerRefValue = listenerRef.current;
    }

    return () => {
      if (listenerRefValue) {
        listenerRefValue.forEach((listener) => listener.unsubscribe());
      }
    };
  }, [])

  //prepare it to work with collections
  const dispatch = useAppDispatch();
  
  // Load Collections
  const loadCollection = useCallback((actions: GenericActions<T>) => {
    dispatch(actions.loading());

    const query = collection(db, path);

    const listener = onSnapshot(query, {
      next: querySnapshot => {
        const data: DocumentData[] = [];
        if (querySnapshot.empty) {
          dispatch(actions.success([] as unknown as T));
          return;
        }
        //if querySnapshot not empty
        querySnapshot.forEach(doc => data.push({id: doc.id, ...doc.data()}));

        dispatch(actions.success(data as unknown as T))
      },
      error: error => {
        dispatch(actions.error(error.message));
        console.error('Collection error: ', error.message);
      }
    })

    listenerRef.current.push({name: path, unsubscribe: listener});

  }, [dispatch, path])


  // Load single document
  const loadDocument = useCallback((id: string, actions: GenericActions<T>) => {
    dispatch(actions.loading());
    
    const docRef = doc(db, path, id);

    const listener = onSnapshot(docRef, {
      next: doc => {
        if (!doc.exists) {
          dispatch(actions.error('Document does not exist'));
          return;
        }
        dispatch(actions.success({id: doc.id, ...doc.data()} as unknown as T))
      }
    })
    listenerRef.current.push({name: path + '/' + id, unsubscribe: listener})

  }, [dispatch, path])


  //create a document
  const create = async (data: T) => {
    try {
      const ref = doc(collection(db, path))
      await setDoc(ref, data);
      return ref;

    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }


  //update document
  const update = async (id: string, data : T) => {
    const docRef = doc(db, path, id);
    try {
      return await updateDoc(docRef, data);

    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }
  

  //delete document
  const remove = async (id: string) => {
    try {
      return await deleteDoc(doc(db, path, id));

    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return { loadCollection, loadDocument, create, update, remove };

};