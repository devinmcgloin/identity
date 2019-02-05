/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        let templatePath;
        switch (node.fields.slug.split('/')[1]) {
          case 'writing':
            templatePath = './src/templates/writing.js';
            break;
          case 'projects':
            templatePath = './src/templates/project.js';
            break;
        }
        createPage({
          path: node.fields.slug,
          component: path.resolve(templatePath),
          context: {
            slug: node.fields.slug,
          },
        });
      });

      let tags = [];
      result.data.allMarkdownRemark.edges.forEach(
        ({ node }) => (tags = tags.concat(node.frontmatter.tags))
      );

      [...new Set(tags)]
        .filter(t => t !== null)
        .forEach(tag => {
          createPage({
            path: `/tags/${slugify(tag)}`,
            component: path.resolve('./src/templates/tags.js'),
            context: {
              tag,
            },
          });
        });

      resolve();
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /dat.gui/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.onPreBootstrap = () => {
  require('isomorphic-fetch');
};

const slugify = str =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
