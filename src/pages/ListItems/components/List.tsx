import { IItems } from '../../../models/Items';
import ListItem from './ListItem';

interface Props {
  items: IItems;
}

export default function List({ items }: Props) {
  return (
    <ul>
      {Object.entries(items).map(([, item]) => {
        const { children = {} } = item;
        return (
          <ListItem key={item.id} item={item}>
            {Object.keys(children).length ? <List items={children} /> : null}
          </ListItem>
        );
      })}
    </ul>
  )
}
