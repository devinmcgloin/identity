import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Footer = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            social {
              name
              email
              github
              twitter
              unsplash
            }
          }
        }
        allExperimentsYaml(limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "/projects/(.)+/" } } }
          sort: { order: DESC, fields: frontmatter___date }
          limit: 5
        ) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        email,
        twitter,
        github,
        unsplash,
      } = data.site.siteMetadata.social;

      const projects = data.allMarkdownRemark.edges.map(e => {
        return {
          title: e.node.frontmatter.title,
          slug: e.node.fields.slug,
        };
      });

      const experiments = data.allExperimentsYaml.edges.map(e => {
        return {
          title: e.node.title,
          slug: e.node.slug,
        };
      });
      return (
        <footer className="pa4 pa5-l black-70 bt b--black-10 mw8 center">
          <div className="mb4-l">
            <article className="fl w-100 dib-ns w-auto-ns mr4-m mr5-l mb4">
              <a
                className="f6 db fw5 pv1 black-70 link dim"
                title="Email"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <a
                className="f6 db fw5 pv1 black-70 link dim"
                title="Email"
                href={`https://twitter.com/${twitter}`}
              >
                <span className="black-50">twitter</span>/{twitter}
              </a>
              <a
                className="f6 db fw5 pv1 black-70 link dim"
                title="Email"
                href={`https://github.com/${github}`}
              >
                <span className="black-50">github</span>/{github}
              </a>
              <a
                className="f6 db fw5 pv1 black-70 link dim"
                title="Email"
                href={`https://unsplash.com/${unsplash}`}
              >
                <span className="black-50">unsplash</span>/{unsplash}
              </a>
            </article>
            <article className="fl w-100 dib-ns w-auto-ns mr4-m mr5-l mb4">
              {projects.map(p => (
                <a
                  key={p.slug}
                  className="f6 db fw5 pv1 black-70 link dim"
                  title={p.title}
                  href={p.slug}
                >
                  <span className="black-50">project</span>/{p.title}
                </a>
              ))}
            </article>
            <article className="fl w-100 dib-ns w-auto-ns mr4-m mr5-l mb4">
              {experiments.map(p => (
                <a
                  key={p.slug}
                  className="f6 db fw5 pv1 black-70 link dim"
                  title={p.title}
                  href={p.slug}
                >
                  <span className="black-50">interactive</span>/{p.title}
                </a>
              ))}
            </article>
          </div>
        </footer>
      );
    }}
  />
);

export default Footer;
