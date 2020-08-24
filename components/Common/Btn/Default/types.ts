import { DefaultPropsWithChildren } from '../../types';

enum STYLE {
  default = 'default',
  primary = 'primary',
  transparent = 'transparent',
}

enum SIZE {
  base = 'base',
  sm = 'sm',
  xs = 'xs',
}

enum TYPE {
  button = 'button',
  submit = 'submit',
}

type BtnProps = DefaultPropsWithChildren & {
  readonly children: any,
  readonly style?: string | STYLE,
  readonly outline?: boolean,
  readonly size?: string | SIZE,
  readonly active?: boolean,
  readonly type?: string | TYPE,
  readonly [key: string]: any,
};

export {
  STYLE,
  SIZE,
  TYPE,
  BtnProps,
};
