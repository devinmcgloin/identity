import Head from 'next/head';
import { StandardMetadata } from 'components/metadata';
import { SWRConfig } from 'swr';
import 'styles/base.css';
import { useEffect } from 'react';

function Identity({ Component, pageProps }) {
  useEffect(() => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          console.log('Unregistering service worker');
          registration.unregister();
        }
      });
    }
  }, []);

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
        <Head />

        <Component {...pageProps} />
      </SWRConfig>
    </main>
  );
}

export default Identity;
