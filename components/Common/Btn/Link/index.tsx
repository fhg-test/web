import { Fragment } from 'react';
import NextLink from 'next/link';
import { UrlLike } from 'next/router';
import css from 'styled-jsx/css';

import {
  STYLE,
  BtnProps,
  className as btnClassName,
  styles as btnStyles,
  getClassName,
} from '../../Btn';

type LinkProps = BtnProps & {
  readonly href: string | UrlLike,
  readonly prefetch?: boolean,
};

const styles = css`
  a {
    @apply inline-block no-underline text-black;
  }
`;

const Link = ({
  className: cn,
  style = STYLE.transparent,
  outline,
  size,
  active,
  type,
  children,
  href,
  prefetch = false,
  ...restProps
}: LinkProps) => {
  const customClassName = getClassName({ style, outline, size, active, className: cn });

  return (
    <Fragment>
      <NextLink {...{ href, prefetch }}>
        <a className={[btnClassName, customClassName].join(' ')} {...restProps}>
          {children}
        </a>
      </NextLink>

      {btnStyles}
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default Link;
export {
  LinkProps,
};
