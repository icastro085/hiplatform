import { useState, useEffect } from 'react';

import { IItem } from "../../../models/Items";

interface Props {
  item: IItem;
  isParentChecked?: boolean;
  renderSubItems?: (isChecked: boolean) => any;
  onChangeCheckbox?: (isChecked: boolean) => void;
}

export default function ListItem({
  item,
  isParentChecked = false,
  onChangeCheckbox = () => null,
  renderSubItems = () => null,
}: Props) {
  const { name, children: items = {} } = item;
  const [checked, setChecked] = useState<boolean>(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChangeCheckbox = (isChecked: boolean): void => {
    setChecked(isChecked);
    onChangeCheckbox(isChecked);
  };

  useEffect(() => {
    setHasChildren(!!Object.keys(items).length);
  }, [items]);

  useEffect(() => {
    setChecked(isParentChecked);
  }, [isParentChecked]);

  return (
    <li>
      <input
        data-testid="#checkbox-item"
        type="checkbox"
        checked={checked}
        onChange={(e) => handleOnChangeCheckbox(e.target.checked)} />
      <label>{checked ? 'checked-icon' : 'unckecked-icon'}</label>

      <label>{name}</label>
      {hasChildren ? <button onClick={() => setIsOpen(!isOpen)}>open-icon</button> : null}
      {hasChildren && isOpen ? renderSubItems(checked) : null}
    </li>
  );
}
