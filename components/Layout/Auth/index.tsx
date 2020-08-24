import { DefaultPropsWithChildren } from '@app/components/types';
import { HeadProps } from '@app/components/Head';
import Layout from '@app/components/Layout';

import Content from './Content';

type AuthProps = DefaultPropsWithChildren & HeadProps;

const Auth = (props: AuthProps) => <Layout content={Content} {...props} />;

export default Auth;
export { AuthProps };
