import { IItems } from '../../../models/Items';
import ListItem from './ListItem';

interface Props {
  items: IItems;
  isParentChecked?: boolean;
}

export default function List({ items, isParentChecked = false }: Props) {
  return (
    <ul>
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
    </ul>
  )
}
