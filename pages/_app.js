import Head from 'next/head';
import { StandardMetadata } from 'components/metadata';
import { SWRConfig } from 'swr';
import 'styles/base.css';

function Identity({ Component, pageProps }) {
  return (
    <main>
      <SWRConfig
        value={{
          fetcher: (key) =>
            fetch(key)
              .then((res) => {
                if (!res.ok) throw res;
                return res.json();
              })
              .catch((err) => console.log(err)),
        }}
      >
        <StandardMetadata title="Devin McGloin" description="" />
        <Head>
          <link rel="preconnect" href="https://rsms.me" />
          <link
            rel="preload"
            href="https://rsms.me/inter/inter.css"
            as="style"
          />
        </Head>

        <Component {...pageProps} />
      </SWRConfig>
    </main>
  );
}

export default Identity;
