import Head from 'next/head';
import { StandardMetadata } from 'components/metadata';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes';
import 'styles/base.css';

function Identity({ Component, pageProps }) {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class"
      forcedTheme={Component.theme || null}
    >
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
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          </Head>

          <Component {...pageProps} />
        </SWRConfig>
      </main>
    </ThemeProvider>
  );
}

export default Identity;
