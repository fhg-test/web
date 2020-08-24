import { DefaultProps } from '../../types';

import Input from '../../Input';

type PasswordProps = DefaultProps & {
  readonly value?: string,
  readonly onChange?: Function,
  readonly [key: string]: any,
};

const Password = (props: PasswordProps) => (
  <Input
    type="password"
    autoComplete="current-password new-password"
    placeholder="******"
    {...props}
  />
);

export default Password;
export {
  PasswordProps,
};
