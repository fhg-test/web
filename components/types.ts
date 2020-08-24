import {
  DefaultProps as DefaultPropsCommon,
  DefaultPropsWithChildren as DefaultPropsWithChildrenCommon,
} from '@app/components/Common/types';

type Props = {
  readonly style?: Object,
};

type DefaultProps = DefaultPropsCommon & Props;

type DefaultPropsWithChildren = DefaultPropsWithChildrenCommon & Props;

export {
  DefaultProps,
  DefaultPropsWithChildren,
};
