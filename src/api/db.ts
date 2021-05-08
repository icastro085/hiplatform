export const connect = async (): Promise<any> => {
  const result = new Promise((resolved) => {
    const request = window.indexedDB.open('HiPlatform', 1);
    
    request.onsuccess = (e: any) => {
      const db = e?.target?.result;
      resolved(db);

      console.log('Connection established');
    }

    request.onupgradeneeded = (e: any) => {
      const db = e?.target?.result;
      db.createObjectStore('items', { keyPath: 'id' });
    }
  });

  return result;
}
