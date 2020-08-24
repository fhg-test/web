import NextHead from 'next/head';

type HeadProps = {
  readonly title?: string,
  readonly description?: string,
};

const Head = ({ title, description }: HeadProps) => (
  <NextHead>
    <title key="title">{title}</title>
    <meta name="description" content={description} key="description" />
  </NextHead>
);

export default Head;
export { HeadProps };
