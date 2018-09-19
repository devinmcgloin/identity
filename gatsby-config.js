module.exports = {
  siteMetadata: {
    title: 'Devin McGloin',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'devin-mcgloin',
        start_url: '/',
        background_color: '#ededed',
        theme_color: '#eee',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
}
