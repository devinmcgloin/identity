import Head from 'next/head';
import { StandardMetadata } from 'components/metadata';
import { SWRConfig } from 'swr';
import 'styles/base.css';
import 'styles/tweakpane.css';
import { useEffect } from 'react';
import { FormspreeProvider } from '@formspree/react';

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
    <main className="min-h-screen h-full w-screen">
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
        <StandardMetadata
          title="Devin McGloin"
          description="Californian in Dublin, Software @ Quorum. Ex-Intercom."
        />
        <Head />
        <FormspreeProvider project={'1597253424540285963'}>
          <Component {...pageProps} />
        </FormspreeProvider>
      </SWRConfig>
    </main>
  );
}

export default Identity;
