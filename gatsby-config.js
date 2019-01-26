module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: 'Devin McGloin',
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
      linkedin: 'devinmcgloin',
      angelslist: 'devinmcgloin',
      fokal: 'devinmcgloin',
      city: 'New York, NY',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-remark-copy-linked-files',
    'gatsby-transformer-sharp',
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
        trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Enables Google Optimize using your container Id
        optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
        // Any additional create only fields (optional)
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'devin-mcgloin',
        start_url: '/',
        background_color: '#ededed',
        theme_color: '#eee',
        display: 'minimal-ui',
        icon: 'content/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
