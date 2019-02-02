import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const BaseLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            social {
              name
              twitter
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <div className="sans-serif">
          <StandardMetadata
            title={data.site.siteMetadata.title}
            description={data.site.siteMetadata.description}
            social={data.site.siteMetadata.social}
          />
          {children}
        </div>
      );
    }}
  />
);

const StandardMetadata = ({ title, description, siteUrl, social }) => (
  <Helmet titleTemplate={`%s - ${title}`} defaultTitle={title}>
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/public/favicon.ico" />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="RSS"
      href="/rss.xml"
    />
    <link rel="canonical" href={siteUrl} />

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
    <meta property="og:url" content={siteUrl} />
    <meta property="og:description" content={description} />
    <meta property="description" content={description} />
    <meta property="og:site_name" content={title} />
    <meta property="og:locale" content="en" />

    <meta name="author" content={social.name} />

    <meta name="twitter:site" content={`@${social.twitter}`} />
    <meta name="twitter:creator" content={`@${social.twitter}`} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);

const CommonMetadata = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="description" content={description} />
    <meta property="og:site_name" content={title} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);

export { BaseLayout, CommonMetadata };
