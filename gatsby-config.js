module.exports = {
  pathPrefix: `/`,
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
    'gatsby-mdx',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-remark-copy-linked-files',
    'gatsby-transformer-sharp',
    'gatsby-plugin-feed',
    {
      resolve: `gatsby-source-unsplash`,
      options: {
        accessKey:
          '01cab8b60c13c600c6b06727ff46e8153598cc933f782c5e99b48c25b522cebc',
        secretKey:
          '1103dd3e8fc70ac5d8220f6eeae39bc3ff4583dbf06f4d325b6f5c44627987fb',
      },
    },
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
        trackingId: 'UA-12359332-14',
        head: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'devin-mcgloin',
        start_url: '/',
        background_color: '#B3C6C4',
        theme_color: '#B3C6C4',
        display: 'browser',
        icon: 'content/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
