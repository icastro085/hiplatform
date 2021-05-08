import { IItems } from '../../../models/Items';

import ListItem from './ListItem';
import * as S from './styles';

interface Props {
  items: IItems;
  isParentChecked?: boolean;
}

export default function List({ items, isParentChecked = false }: Props) {
  return (
    <S.List>
      {Object.entries(items).map(([, item]) => {
        const { children = {} } = item;

        return (
          <ListItem
            key={item.id}
            item={item}
            isParentChecked={isParentChecked}
            renderSubItems={(isParentChecked) => <List items={children} isParentChecked={isParentChecked} />} />
        );
      })}
    </S.List>
  )
}
