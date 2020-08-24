import { Fragment, PureComponent } from 'react';
import css from 'styled-jsx/css';
import Router from 'next/router';
import { connect } from 'react-redux';
import * as rest from '@fhg-test/rest';

import { DefaultProps } from '@app/pages/types';
import AuthLayout from '@app/components/Layout/Auth';
import SignInForm from '@app/components/Form/SignIn';

import userActions from '@app/store/user/actions';

type SignInValues = {
  readonly email: string;
  readonly password: string;
};

type SignInProps = DefaultProps & {
  readonly signIn: Function;
  readonly updateUser: Function;
  readonly updateUserRBAC: Function;
};

type SignInState = {
  readonly error?: Error;
};

const styles = css`
  div.root {
    @apply p-8 bg-white rounded shadow;

    > h1 {
      @apply text-center;
    }

    > div {
      @apply text-red mt-8 text-center;
    }
  }
`;

const formCss = css.resolve`
  form {
    @apply mt-8;
  }
`;

class SignIn extends PureComponent<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);

    this.state = {};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(obj: SignInValues) {
    try {
      const { signIn, updateUser, updateUserRBAC, query } = this.props;

      await rest.user.sessions.create(obj);
      const [user, rbac] = await Promise.all([
        rest.user.get(),
        rest.user.rbac.get(),
      ]);

      updateUser(user);
      updateUserRBAC(rbac);
      signIn();

      const redirect = query.redirect || '/';
      Router.replace(redirect.toString());
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <Fragment>
        <AuthLayout title="Sign In">
          <div className="root">
            <h1>Sign In</h1>

            {error && <div>{error.message}</div>}

            <SignInForm
              className={formCss.className}
              onSubmit={this.handleFormSubmit}
            />

            {formCss.styles}
          </div>
        </AuthLayout>

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  signIn: userActions.signIn,
  updateUser: userActions.updateUser,
  updateUserRBAC: userActions.updateUserRBAC,
};

export default connect(null, mapDispatchToProps)(SignIn);
