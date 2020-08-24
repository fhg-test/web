import css from 'styled-jsx/css';

import { DefaultProps } from '../../types';
import Input from '../../Input';
import { Fragment } from 'react';

type DateProps = DefaultProps & {
  readonly value?: string,
  readonly onChange?: Function,
  readonly placeholder?: string,
  readonly [key: string]: any,
};

const { className, styles } = css.resolve`
  input {
    height: 34px;

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
      @apply appearance-none m-0;
    }
  }
`;

const Date = ({ placeholder = 'mm/dd/yyyy', ...restProps }: DateProps) => (
  <Fragment>
    <Input
      className={className}
      type="date"
      autoComplete="date"
      placeholder={placeholder}
      {...restProps}
    />

    {styles}
  </Fragment>
);

export default Date;
export {
  DateProps,
};
