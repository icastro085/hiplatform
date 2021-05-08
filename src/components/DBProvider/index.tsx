import { createContext, useEffect, useState } from 'react';
import { connect } from '../../api/db';

interface Props {
  children?: any;
}

export const DBContext = createContext(null);

export default function DBProvider({ children }: Props) {
  const [db, setDb] = useState();

  useEffect(() => {
    const getDb = async () => {
      const db = await connect();
      setDb(db);
    }

    getDb();
  }, []);

  if (!db) {
    return null;
  }

  return (
    <DBContext.Provider value={{ db } as any}>
      {children}
    </DBContext.Provider>
  );
}
