import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const PureFooter = ({ data }) => {
  const { email, twitter, github, unsplash } = data.social.siteMetadata.social;

  const projects = data.projects.edges.map(e => {
    return {
      title: e.node.frontmatter.title,
      slug: e.node.fields.slug,
    };
  });

  const artwork = data.artwork.edges.map(e => {
    return {
      title: e.node.frontmatter.title,
      slug: e.node.fields.slug,
    };
  });
  return (
    <footer className="flex flex-column flex-row-ns pa4 pa5-l black-70 bt b--black-10 mw8 center">
      <article className="w-100 w-auto-ns mr4-m mr5-l mb4">
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
      <article className="w-100 w-auto-ns mr4-m mr5-l mb4">
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
      <article className="w-100 w-auto-ns mr4-m mr5-l mb4">
        {artwork.map(p => (
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
    </footer>
  );
};

const Footer = () => (
  <StaticQuery
    query={graphql`
      {
        social: site {
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
        artwork: allMdx(
          filter: { fields: { slug: { regex: "/interactive/(.)+/" } } }
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
        projects: allMdx(
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
    render={data => <PureFooter data={data} />}
  />
);
export { PureFooter };
export default Footer;
