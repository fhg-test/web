import { DefaultProps } from '../../types';

import Input from '../../Input';

type NumberProps = DefaultProps & {
  readonly value?: number,
  readonly onChange?: Function,
  readonly [key: string]: any,
};

const Number = (props: NumberProps) => (
  <Input
    type="number"
    placeholder="0"
    {...props}
  />
);

export default Number;
export {
  NumberProps,
};
