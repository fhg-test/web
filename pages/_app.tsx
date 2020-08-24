import { Fragment } from 'react';
import App, { Container, AppComponentProps } from 'next/app';
import css from 'styled-jsx/css';
import { Provider as ReduxProvider } from 'react-redux';

import initApi from '@app/api';
import { getOrCreateStore, assureUser } from '@app/utils/redux';

type MyAppProps = AppComponentProps & {
  readonly reduxState: any;
};

// init api client
initApi();

const styles = css.global`
  @tailwind preflight;
  @tailwind components;

  html {
    background-color: #f1f5f8;
  }
`;

class MyApp extends App<MyAppProps> {
  static async getInitialProps({ Component, ctx }) {
    const { pathname, query, asPath } = ctx;

    // initialize redux store
    const reduxStore = getOrCreateStore();
    await assureUser({ reduxStore, ctx });
    const reduxState = reduxStore.getState();

    // generate pageProps
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...ctx, reduxState })
      : {};

    return {
      reduxState,
      pageProps: {
        ...pageProps,
        pathname,
        query,
        asPath,
      },
    };
  }

  readonly state = {
    reduxStore: getOrCreateStore(this.props.reduxState),
  };

  render() {
    const { Component, pageProps } = this.props;
    const { reduxStore } = this.state;

    return (
      <Fragment>
        <ReduxProvider store={reduxStore}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ReduxProvider>

        <style jsx global>
          {styles}
        </style>
      </Fragment>
    );
  }
}

export default MyApp;
