import { useState } from 'react';

import { IItem } from "../../../models/Items";

interface Props {
  item: IItem;
}

export default function ListItem({ item }: Props) {
  const { name } = item;
  const [checked, setChecked] = useState<boolean>(false);


  return (
    <li>
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <label>{name}</label>
    </li>
  );
}
