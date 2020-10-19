import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <script
            async
            defer
            data-domain="devinmcgloin.com"
            src="https://plausible.io/js/plausible.js"
          ></script>
          <link rel="preconnect" href="https://rsms.me" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="dark:bg-off-black">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
