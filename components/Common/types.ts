type DefaultProps = {
  readonly className?: string,
};

type DefaultPropsWithChildren = DefaultProps & {
  readonly children: any,
};

export {
  DefaultProps,
  DefaultPropsWithChildren,
};
