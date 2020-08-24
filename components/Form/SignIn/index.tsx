import { Fragment, PureComponent, FormEvent } from 'react';
import css from 'styled-jsx/css';

import { DefaultProps } from '@app/components/types';
import Email from '@app/components/Common/Input/Email';
import Password from '@app/components/Common/Input/Password';
import SubmitBtn from '@app/components/Common/Btn/Submit';

type SignInProps = DefaultProps & {
  readonly onSubmit: Function;
};

type SignInState = {
  readonly email: string;
  readonly password: string;
};

const styles = css`
  form > div {
    &:not(:first-child) {
      @apply mt-4;
    }

    &:nth-child(2) div {
      @apply flex justify-between mb-2;

      label {
        @apply mb-0;
      }
    }

    &:nth-child(3) {
      @apply text-center;

      > :global(button) {
        @apply w-full;
      }
    }
  }

  label {
    @apply inline-block mb-2;
  }
`;

class SignIn extends PureComponent<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFieldChange(field: string, value: string) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit(this.state);
  }

  render() {
    const { className } = this.props;
    const { email, password } = this.state;

    return (
      <Fragment>
        <form className={className} onSubmit={this.handleFormSubmit}>
          <div>
            <label>Email Address</label>

            <Email
              value={email}
              onChange={(value: string) =>
                this.handleFieldChange('email', value)
              }
              required
            />
          </div>

          <div>
            <label>Password</label>

            <Password
              value={password}
              onChange={(value: string) =>
                this.handleFieldChange('password', value)
              }
              required
            />
          </div>

          <div>
            <SubmitBtn>Sign In</SubmitBtn>
          </div>
        </form>

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

export default SignIn;
export { SignInProps };
