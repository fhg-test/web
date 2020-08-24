import css from 'styled-jsx/css';

import { DefaultPropsWithChildren } from '@app/components/types';
import { Fragment } from 'react';

type ContentProps = DefaultPropsWithChildren;

const styles = css`
  div.root {
    @apply py-4;
  }
`;

const Content = ({ className, children }: ContentProps) => (
  <Fragment>
    <div className={['root', className].join(' ')}>{children}</div>

    <style jsx>{styles}</style>
  </Fragment>
);

export default Content;
export { ContentProps };
