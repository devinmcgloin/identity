import Head from 'next/head';
import { useRouter } from 'next/router';

const StandardMetadata = ({ title, description }) => (
  <Head>
    <meta charSet="utf-8" />
    <link rel="canonical" key="canonical" href="https://www.devinmcgloin.com" />
    <title key="title">{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charSet="utf-8" />
    <link rel="icon" href="/assets/logo.svg" />
    <link rel="shortcut icon" href="/assets/logo.svg" />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="57x57"
      href="/assets/apple-touch-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="114x114"
      href="/assets/apple-touch-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="72x72"
      href="/assets/apple-touch-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="144x144"
      href="/assets/apple-touch-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="60x60"
      href="/assets/apple-touch-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="120x120"
      href="/assets/apple-touch-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="76x76"
      href="/assets/apple-touch-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon-precomposed"
      sizes="152x152"
      href="/assets/apple-touch-icon-152x152.png"
    />
    <link
      rel="icon"
      type="image/png"
      href="/assets/favicon-196x196.png"
      sizes="196x196"
    />
    <link
      rel="icon"
      type="image/png"
      href="/assets/favicon-96x96.png"
      sizes="96x96"
    />
    <link
      rel="icon"
      type="image/png"
      href="/assets/favicon-32x32.png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="/assets/favicon-16x16.png"
      sizes="16x16"
    />
    <link
      rel="icon"
      type="image/png"
      href="/assets/favicon-128.png"
      sizes="128x128"
    />
    <meta name="application-name" content="&nbsp;" />
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
    <meta
      name="twitter:image"
      content="https://www.devinmcgloin.com/assets/logo.png"
    />
    <meta
      property="og:image"
      content="https://www.devinmcgloin.com/assets/logo.png"
    />
    <meta property="og:image:height" content="650" />
    <meta property="og:image:width" content="650" />
    <meta name="twitter:card" content="summary" />
    <meta property="og:title" content={title} key="og-title" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.devinmcgloin.com" />
    <meta
      property="og:description"
      content={description}
      key="og-description"
    />

    <meta
      name="description"
      property="description"
      content={description}
      key="description"
    />
    <meta property="og:site_name" content={title} key="og-site_name" />
    <meta property="og:locale" content="en" />
    <meta name="twitter:title" content={title} key="twitter-title" />
    <meta
      name="twitter:description"
      content={description}
      key="twitter-description"
    />
  </Head>
);

const CommonMetadata = ({ title, description }) => {
  const router = useRouter();

  return (
    <Head>
      <link
        key="canonical"
        rel="canonical"
        href={`https://www.devinmcgloin.com${router.pathname}`}
      />

      {title && <title>{title} - Devin McGloin</title>}
      {title && (
        <meta
          property="og:title"
          content={`${title} - Devin McGloin`}
          key="title"
        />
      )}
      {title && (
        <meta
          property="og:site_name"
          content={`${title} - Devin McGloin`}
          key="og-site_name"
        />
      )}
      {title && (
        <meta
          name="twitter:title"
          content={`${title} - Devin McGloin`}
          key="twitter-title"
        />
      )}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
      )}
      {description && (
        <meta property="description" content={description} key="description" />
      )}
      {description && (
        <meta
          name="twitter:description"
          content={description}
          key="twitter-description"
        />
      )}
    </Head>
  );
};

export { StandardMetadata, CommonMetadata };
