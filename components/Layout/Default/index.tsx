import { Fragment } from 'react';
import css from 'styled-jsx/css';

import { DefaultPropsWithChildren } from '@app/components/types';
import Head, { HeadProps } from '@app/components/Head';
import UserBtn from '@app/components/Btn/User';

import Content from './Content';

type LayoutProps = DefaultPropsWithChildren &
  HeadProps & {
    readonly content?: any;
  };

const styles = css`
  div.root {
    @apply text-sm;

    > header {
      @apply bg-black;

      > div.container {
        @apply py-2 flex justify-between;

        > div:first-child {
          @apply font-bold py-2 text-white;
        }
      }
    }
  }
`;

const contentCss = css.resolve`
  div.container {
  }
`;

const Layout = ({
  className,
  title,
  description,
  children,
  content,
}: LayoutProps) => {
  const ContentComponent = content || Content;

  return (
    <Fragment>
      <div className={['root', className].join(' ')}>
        <Head title={title} description={description} />

        <header>
          <div className="container">
            <div>Fullerton Healthcare Group</div>
            <div>
              <UserBtn />
            </div>
          </div>
        </header>

        <ContentComponent className={`container ${contentCss.className || ''}`}>
          {children}
        </ContentComponent>
        {contentCss.styles}
      </div>

      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default Layout;
export { LayoutProps };
