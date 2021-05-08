import { useState, useEffect } from 'react';

import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';
import { useDb } from '../../../hooks/useDb';

import { IItem } from "../../../models/Items";
import * as S from './styles';

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
  const { save, get, remove } = useDb();

  const handleOnChangeCheckbox = (isChecked: boolean): void => {
    setChecked(isChecked);
    onChangeCheckbox(isChecked);
    handleSave(isChecked, isOpen);
  };

  const handleSetOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
    handleSave(checked, isOpen);
  };

  const handleSave = async (isChecked: boolean, isOpen: boolean) => {
    const { id } = item;

    await remove('items', id);
    await save('items', {
      id,
      isChecked,
      isOpen,
    });
  }

  useEffect(() => {
    setHasChildren(!!Object.keys(items).length);
  }, [items]);

  useEffect(() => {
    const { id } = item;
    const handleGet = async () => {
      const { result } = await get('items', id);
      if (result) {
        setChecked(result?.isChecked);
        setIsOpen(result?.isOpen);
      }
    };


    handleGet();
  }, [get, item]);

  useEffect(() => {
    setChecked(isParentChecked);
  }, [isParentChecked]);

  return (
    <S.ListItem>
      <S.ListItemContainer className="flex justify-between items-center">
        <div className="flex items-center">
          <Checkbox checked={checked} onChange={handleOnChangeCheckbox} className="mr2" />
          <S.ListItemLabel>{name}</S.ListItemLabel>
        </div>

        {hasChildren
          ? (
            <S.IconButton onClick={() => handleSetOpen(!isOpen)}>
              <Icon name={isOpen ? 'chevron-up-solid': 'chevron-down-solid' } width="12px" fill="var(--grey-dark)" />
            </S.IconButton>
          )
          : null}
      </S.ListItemContainer>
      {hasChildren && isOpen ? renderSubItems(checked) : null}
    </S.ListItem>
  );
}
