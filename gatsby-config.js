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
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-remark-copy-linked-files',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                });
              });
            },
            query: `
              {
                allMdx(
                  filter: { fields: { slug: { regex: "/writing/(.)+/" } } }
                  sort: { order: DESC, fields: frontmatter___date }
                ) {
                  edges {
                    node {
                      frontmatter {
                        title
                        date(formatString: "dddd, MMMM Do 0YYYY")
                        tags
                      }
                      fields {
                        slug
                      }
                      excerpt(pruneLength: 270)
                      timeToRead
                    }
                  }
                }
             }
            `,
            output: '/rss.xml',
            title: "Devin McGloin's RSS Feed",
          },
        ],
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
    'gatsby-transformer-yaml',
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
      resolve: `gatsby-plugin-mdx`,
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
