import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';
import { useDb } from '../../../hooks/useDb';

import { IItem, IItems } from "../../../models/Items";
import * as S from './styles';

export interface ParentState {
  isChecked: boolean;
  hash?: string | null;
}

interface Props {
  item: IItem;
  parentId?: string;
  renderSubItems?: (options: {
    items: IItems;
    onChildChangeCheckbox?: () => void;
    parentState?: ParentState
  }) => any;
  onChangeCheckbox?: () => void;
  parentState?: ParentState,
}

export default function ListItem({
  item,
  parentId,
  renderSubItems = () => null,
  onChangeCheckbox = () => null,
  parentState,
}: Props) {
  const { name, children: items = {} } = item;

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCheckedPartial, setIsCheckedPartial] = useState<boolean>(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState<string | null>('');

  const { save, get, getAll } = useDb();

  const getChildrenIds = (items: IItems) => Object.entries(items || {}).map(([, { id }]) => id);

  const getStateCurrentState = async (ids: string[]): Promise<{ isChecked: boolean; isCheckedPartial: boolean }> => {
    const response = await getAll('items', ids);

    const availableChildrenChecked = response?.filter(({ result }) =>
      result?.isChecked);
    const availableChildrenCheckedPartial = response?.filter(({ result }) =>
      result?.isChecked ||  result?.isCheckedPartial);

    const isChecked = ids?.length === availableChildrenChecked?.length;
    const isCheckedPartial = !!availableChildrenCheckedPartial?.length;

    return { isChecked, isCheckedPartial };
  };

  const handleChangeCheckbox = async (isChecked: boolean): Promise<void> => {
    setIsChecked(isChecked);
    setIsCheckedPartial(false);

    const { id } = item;
    const data: any = { id, isChecked, isCheckedPartial: false };

    await save('items', data);
  };

  const handleChangeIsOpen = async (isOpen: boolean): Promise<void> => {
    setIsOpen(isOpen);
    setHash(null);

    const { id } = item;
    const data: any = { id, isOpen };

    await save('items', data);
  };

  const handleSaveCurrentState = async (
    id: string,
    isChecked: boolean,
    isCheckedPartial: boolean) => save('items', {
    id,
    isChecked,
    isCheckedPartial,
  });

  const handleReactParentState = async (data: any): Promise<void> => {
    setIsChecked(data?.isChecked);
    setIsCheckedPartial(false);
    await handleSaveCurrentState(item.id, data?.isChecked, false);
  };

  useEffect(() => {
    setHasChildren(!!Object.keys(items).length);
  }, [items]);

  useEffect(() => {
    const handleGet = async () => {
      const { id } = item;
      const { result: parent } = await get('items', parentId || '');

      const { result } = await get('items', id);
      if (result) {
        setIsChecked(result?.isChecked);
        setIsOpen(result?.isOpen);
        setIsCheckedPartial(result?.isCheckedPartial);
      }

      if (parent && !parent?.isCheckedPartial) {
        handleReactParentState(parent);
      }
    };

    handleGet();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChildChangeCheckbox = async () => {
    const ids = getChildrenIds(items);
    const { isChecked, isCheckedPartial } = await getStateCurrentState(ids);

    setIsChecked(isChecked);
    setIsCheckedPartial(isCheckedPartial);

    await handleSaveCurrentState(item.id, isChecked, isCheckedPartial);
    onChangeCheckbox();
  };

  useEffect(() => {
    if (parentState?.hash) {
      const handleUseCaseChildren = async () => {
        handleReactParentState(parentState);

        if (isOpen) {
          setHash(uuid());
        }
      };

      handleUseCaseChildren();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentState?.hash]);

  return (
    <S.ListItem>
      <S.ListItemContainer className="flex justify-between items-center">
        <div className="flex items-center md-col-12">
          <Checkbox
            checked={isChecked}
            checkedPartial={isCheckedPartial}
            onChange={async (isChecked: boolean): Promise<void> => {
              await handleChangeCheckbox(isChecked);
              onChangeCheckbox();
              setHash(uuid());
            }}>
            <S.ListItemLabel className="ml1">{name}</S.ListItemLabel>
          </Checkbox>
        </div>

        {hasChildren
          ? (
            <S.IconButton onClick={async (): Promise<void> => await handleChangeIsOpen(!isOpen)}>
              <Icon
                name={isOpen
                  ? 'chevron-up-solid'
                  : 'chevron-down-solid' }
                width="12px" fill="var(--grey-dark)" />
            </S.IconButton>
          )
          : null}
      </S.ListItemContainer>
      {hasChildren && isOpen
        ? renderSubItems({
          items,
          onChildChangeCheckbox,
          parentState: { isChecked, hash },
        }) : null}
    </S.ListItem>
  );
}
