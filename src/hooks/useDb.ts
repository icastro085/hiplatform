import { useContext } from 'react';
import { DBContext } from '../components/DBProvider';

interface IResult {
  status: boolean;
  result?: any;
  message?: string;
}

const onSuccess = (e:any): IResult => ({ status: true, result: e.target.result });
const onError = (e: any): IResult => ({ status: false, message: e.target.error.message });

const getTransaction = (db: any, table: string) =>
  db?.transaction(table, 'readwrite')?.objectStore(table);

export const useDb = () => {
  const { db } = useContext<any>(DBContext);
  
  const save = async (table: string, data: any): Promise<any> => {
    try {
      const result = new Promise(async (resolved, rejected) => {
        const { result } = await get(table, data.id);

        const transaction = getTransaction(db, table);
        const request = transaction.put({ ...result, ...data });
      
        request.onsuccess = (e: any) => resolved(onSuccess(e));
        request.onerror = (e: any) => rejected(onError(e));
      });

      return result;
    } catch {
      return null;
    }
  };

  const get = async (table: string, id: string): Promise<any> => {
    try {
      const result = new Promise((resolved, rejected) => {
        const transaction = getTransaction(db, table);
        const request = transaction.get(id);
      
        request.onsuccess = (e: any) => resolved(onSuccess(e));
        request.onerror = (e: any) => rejected(onError(e));
      });

      return result;
    } catch {
      return null;
    }
  };

  const getAll = async (table: string, ids: string[]) =>
    Promise.all(ids.map((id: string) => get(table, id)));

  return {
    save,
    get,
    getAll,
  };
};
