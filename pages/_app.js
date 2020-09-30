import Head from 'next/head';
import { StandardMetadata } from 'components/metadata';
import 'styles/base.css';

function Identity({ Component, pageProps }) {
  return (
    <body>
      <StandardMetadata title="Devin McGloin" description="" />
      <Head>
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="preload" href="https://rsms.me/inter/inter.css" as="style" />
      </Head>

      <Component {...pageProps} />
    </body>
  );
}

export default Identity;
