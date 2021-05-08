import { useState, useEffect } from 'react';

import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';

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
      <Checkbox checked={checked} onChange={handleOnChangeCheckbox} />

      <label>{name}</label>
      {hasChildren
        ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon name={isOpen ? 'chevron-up-solid': 'chevron-down-solid' } width="12px" />
          </button>
        )
        : null}
      {hasChildren && isOpen ? renderSubItems(checked) : null}
    </li>
  );
}
