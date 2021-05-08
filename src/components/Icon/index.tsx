import { ReactComponent as ChevronDownSolid } from '../../assets/chevron-down-solid.svg';
import { ReactComponent as ChevronUpSolid } from '../../assets/chevron-up-solid.svg';
import { ReactComponent as CheckSquareSolid } from '../../assets/check-square-solid.svg';
import { ReactComponent as SquareRegular } from '../../assets/square-regular.svg';
import { ReactComponent as MinusSquareRegular } from '../../assets/minus-square-regular.svg';

type TIconName =
 | 'chevron-down-solid'
 | 'chevron-up-solid'
 | 'check-square-solid'
 | 'square-regular'
 | 'minus-square-regular';

type TIconType = {
  [key in TIconName]: any;
}

interface Props {
  name: TIconName;
  width?: string;
  fill?: string;
}

const icons: TIconType = {
  'chevron-down-solid': ChevronDownSolid,
  'chevron-up-solid': ChevronUpSolid,
  'check-square-solid': CheckSquareSolid,
  'square-regular': SquareRegular,
  'minus-square-regular': MinusSquareRegular,
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = icons[name];

  return <IconComponent {...props} />
}
