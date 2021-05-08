import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

import Icon from '../Icon';

import * as S from './styles';

interface Props {
  checked: boolean;
  onChange?: (isChecked: boolean) => void;
}

export default function Checkbox({ checked, onChange = () => null }: Props) {
  const forId = useRef(uuid());

  const handleOnChangeCheckbox = (isChecked: boolean): void => {
    onChange(isChecked);
  };

  return (
    <>
      <S.InputHidden
        data-testid="#checkbox-item"
        id={forId.current}
        type="checkbox"
        checked={checked}
        onChange={(e) => handleOnChangeCheckbox(e.target.checked)} />
      <S.LabelCheckbox htmlFor={forId.current} >
        <Icon name={checked ? 'check-square-solid' : 'square-regular' } fill="var(--blue)" width="16px" />
      </S.LabelCheckbox>
    </>
  )
}
