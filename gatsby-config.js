const mdxFeed = require('gatsby-mdx/feed');

require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Devin McGloin',
    description: 'Converging on quality',
    siteUrl: 'https://devinmcgloin.com',
    headerLinks: [
      { slug: '/projects', title: 'Projects' },
      { slug: '/artwork', title: 'Artwork' },
      { slug: '/writing', title: 'Writing' },
    ],
    social: {
      name: 'Devin McGloin',
      email: 'devin@devinmcgloin.com',
      github: 'devinmcgloin',
      twitter: 'devinmcgloin',
      unsplash: 'devinmcgloin',
      city: 'New York, NY',
    },
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-remark-copy-linked-files',
    'gatsby-transformer-sharp',
    { resolve: 'gatsby-plugin-feed', options: mdxFeed },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 850,
              withWebp: true,
              linkImagesToOriginal: true,
            },
          },
          'gatsby-plugin-sharp',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./data/`,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Devin McGloin',
        short_name: 'devinmcgloin',
        start_url: '/',
        background_color: '#f3f8ff',
        theme_color: '#f3f8ff',
        display: 'browser',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
