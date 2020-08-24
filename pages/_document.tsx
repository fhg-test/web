import Document, { Head, Main, NextScript, DocumentProps } from 'next/document';

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <html>
        <Head>
          <base href="/" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
