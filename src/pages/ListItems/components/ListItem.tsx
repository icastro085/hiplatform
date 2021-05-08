import { useState, useEffect, useRef } from 'react';

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
  const { save, get } = useDb();
  const isFirstRender = useRef(true);

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
    const handleGet = async () => {
      const { id } = item;
      const { result } = await get('items', id);
      if (result) {
        setChecked(result?.isChecked);
        setIsOpen(result?.isOpen);
      }
    };


    handleGet();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleUpated = async () => {
      const { id } = item;

      const { result } = await get('items', id);
      save('items', {
        id,
        isChecked: isParentChecked,
        isOpen: result?.isOpen,
      });

      setChecked(isParentChecked);
    };

    if (!isFirstRender.current) {
      handleUpated();
    }

    isFirstRender.current = false;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isParentChecked]);

  return (
    <S.ListItem>
      <S.ListItemContainer className="flex justify-between items-center">
        <div className="flex items-center md-col-12">
          <Checkbox checked={checked} onChange={handleOnChangeCheckbox}>
            <S.ListItemLabel className="ml1">{name}</S.ListItemLabel>
          </Checkbox>
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
