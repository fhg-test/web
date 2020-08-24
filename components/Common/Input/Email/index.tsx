import { DefaultProps } from '../../types';

import Input from '../../Input';

type EmailProps = DefaultProps & {
  readonly value?: string,
  readonly onChange?: Function,
  readonly placeholder?: string,
  readonly [key: string]: any,
};

const Email = ({
  placeholder = 'Your email address',
  ...restProps
}: EmailProps) => (
  <Input
    type="email"
    autoComplete="email"
    placeholder={placeholder}
    {...restProps}
  />
);

export default Email;
export {
  EmailProps,
};
