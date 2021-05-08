import { IItems } from '../../../models/Items';
import ListItem from './ListItem';

interface Props {
  items: IItems;
}

export default function List({ items }: Props) {
  return (
    <ul>
      {Object.entries(items).map(([index, item]) => {
        return <ListItem key={item.id} item={item} />
      })}
    </ul>
  )
}
