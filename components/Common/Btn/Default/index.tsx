import { Fragment } from 'react';

import { STYLE, SIZE, TYPE, BtnProps } from './types';

import { className, styles } from './styles';

import { getClassName } from './utils';

const Btn = ({
  className: cn,
  t,
  style,
  outline,
  size,
  active,
  children,
  ...restProps
}: BtnProps) => {
  const customClassName = getClassName({ style, outline, size, active, className: cn });

  return (
    <Fragment>
      <button className={[className, customClassName].join(' ')} {...restProps}>
        {children}
      </button>

      {styles}
    </Fragment>
  );
};

export default Btn;
export {
  STYLE,
  SIZE,
  TYPE,
  BtnProps,
  className,
  styles,
  getClassName,
};
