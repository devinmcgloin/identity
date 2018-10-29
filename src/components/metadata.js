import React from 'react';
import Helmet from 'react-helmet';

const MetaTags = ({ data }) => (
  <Helmet>
    <link href="https://gmpg.org/xfn/11" rel="profile" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1"
    />

    <title>
      {data.title} &middot; {data.tagline}
    </title>

    <link rel="shortcut icon" href="/public/favicon.ico" />

    <link
      rel="alternate"
      type="application/rss+xml"
      title="RSS"
      href="/feed.xml"
    />

    <link
      rel="icon"
      type="image/png"
      href="/public/favicon-32x32.png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="/public/favicon-16x16.png"
      sizes="16x16"
    />
    <meta
      name="twitter:image"
      content="https://devinmcgloin.com/public/icon.png"
    />
    <meta
      property="og:image"
      content="https://devinmcgloin.com/public/icon.png"
    />

    <meta property="og:image:height" content="550" />
    <meta property="og:image:width" content="550" />
    <meta name="twitter:card" content="summary" />

    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://devinmcgloin.com/${page.url}`} />
    <meta
      property="og:description"
      content="{{ page.excerpt | strip_html | truncate: 160 }}"
    />
    <meta
      property="description"
      content="{{ page.excerpt | strip_html | truncate: 160 }}"
    />
    <meta property="og:site_name" content="{{ site.title }}" />
    <meta property="og:locale" content="{{ site.locale }}" />

    <meta name="author" content="{{site.author.name}}" />

    <meta name="twitter:site" content="@{{site.author.twitter}}" />
    <meta name="twitter:creator" content="@{{site.author.twitter}}" />
    <meta name="twitter:title" content="{{page.title}}" />
    <meta
      name="twitter:description"
      content="{{ page.excerpt | truncate: 160 | strip_html }}"
    />

    <meta name="keywords" content="{{site.keywords}}" />
  </Helmet>
);
