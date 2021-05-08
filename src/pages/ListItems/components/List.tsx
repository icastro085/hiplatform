import { IItems } from '../../../models/Items';

import ListItem, { ParentState } from './ListItem';
import * as S from './styles';

interface Props {
  items: IItems;
  parentId?: string;
  onChildChangeCheckbox?: () => void;
  parentState?: ParentState,
}

export default function List({
  items,
  parentId,
  onChildChangeCheckbox = () => null,
  parentState,
}: Props) {
  return (
    <S.List>
      {Object.entries(items).map(([, item]) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            parentId={parentId}
            parentState={parentState}
            onChangeCheckbox={onChildChangeCheckbox}
            renderSubItems={({ items, onChildChangeCheckbox, parentState }) => {
              return (
                <List
                  items={items}
                  parentId={item.id}
                  onChildChangeCheckbox={onChildChangeCheckbox}
                  parentState={parentState} />
              )}
            } />
        );
      })}
    </S.List>
  )
}
