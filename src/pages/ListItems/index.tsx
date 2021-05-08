import { useEffect, useState } from 'react';

import { IItems } from '../../models/Items';
import { getAll } from '../../api/server';

import List from './components/List';

export default function ListItems() {
  const [items, setItems] = useState<IItems>({});

  useEffect(() => {
    const handleGetAll = async () => {
      const items = await getAll();
      setItems(items);
    }

    handleGetAll();
  }, []);

  return (
    <List items={items} />
  );
}
