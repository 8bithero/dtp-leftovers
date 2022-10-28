import { INFTData2 } from '@/common/types';
import db from '@/firebase/init';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const usePandaData = () => {
  const getAll = async () => {
    const data: INFTData2[] = [];

    const q = query(collection(db, 'pandas'), where('mintAddress', '==', null));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push(doc.data() as INFTData2);
    });

    return data;
  };

  const update = async (id: number | number, data: any) => {
    const pandaRef = doc(db, 'pandas', id.toString());

    updateDoc(pandaRef, data)
      .then(() => {
        console.log('Document updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getAll,
    update,
  };
};
