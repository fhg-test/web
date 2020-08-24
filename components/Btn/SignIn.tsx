import { DefaultProps } from '@app/components/types';
import LinkBtn from '@app/components/Common/Btn/Link';

type SignInProps = DefaultProps;

const SignIn = ({ className }: SignInProps) => (
  <LinkBtn className={className} style="primary" href="/auth/sign-in">
    Sign In
  </LinkBtn>
);

export default SignIn;
export { SignInProps };
