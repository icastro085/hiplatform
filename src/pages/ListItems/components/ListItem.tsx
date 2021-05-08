import { useState, useEffect } from 'react';

import { IItem } from "../../../models/Items";

interface Props {
  item: IItem;
  children?: any;
}

export default function ListItem({ item, children }: Props) {
  const { name, children: items = {} } = item;
  const [checked, setChecked] = useState<boolean>(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setHasChildren(!!Object.keys(items).length);
  }, []);

  return (
    <li>
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <label>{name}</label>
      <button onClick={() => setIsOpen(!isOpen)}>open-icon</button>
      {hasChildren && isOpen ? children : null}
    </li>
  );
}
