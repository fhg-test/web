import Router from 'next/router';

import userSelectors from '@app/store/user/selectors';

import { isServer } from '.';

const auth = ({ access, reduxState, ctx }) => {
  if (!userSelectors.isSignedIn(reduxState)) {
    const redirect = `/auth/sign-in?redirect=${ctx.pathname}`;

    if (isServer()) {
      ctx.res.redirect(redirect);
    } else {
      Router.replace(redirect);
    }

    return;
  }

  if (!userSelectors.hasAccess(reduxState)(access)) {
    throw new Error('401 Unauthorized');
  }
};

const withAuthSync = (access: ReadonlyArray<string> = []) => {
  return (Component: any) =>
    class WithAuthSync extends Component {
      static async getInitialProps({ reduxState, ...ctx }) {
        auth({ access, reduxState, ctx });

        return Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {};
      }

      render() {
        return <Component {...this.props} />;
      }
    };
};

export { withAuthSync };
