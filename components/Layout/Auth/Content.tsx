import { Fragment } from 'react';
import css from 'styled-jsx/css';

import { DefaultPropsWithChildren } from '@app/components/types';

type ContentProps = DefaultPropsWithChildren;

const styles = css`
  div.root {
    @apply py-8;

    div {
      @apply w-1/3 mx-auto;
    }
  }
`;

const Content = ({ className, children }: ContentProps) => (
  <Fragment>
    <div className={['root', className].join(' ')}>
      <div>{children}</div>
    </div>

    <style jsx>{styles}</style>
  </Fragment>
);

export default Content;
export { ContentProps };
