import React from 'react';
import { HeaderLayout } from '../components/layout';
import { Link, graphql } from 'gatsby';

const TagTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges } = data.allMdx;

  const header = `On ${tag}`;

  return (
    <HeaderLayout
      title={header}
      description={`Various thoughts on ${tag} and other musings`}
    >
      <ul className="list pl0">
        {edges.map(({ node }) => {
          const { title } = node.frontmatter;
          const { slug } = node.fields;
          return (
            <Link key={slug} to={slug} className="no-underline">
              <li className="pa3 pa4-ns">
                <b className="db f3 mb1 garamond underline">{title}</b>
                <span className="f5 db lh-copy">{node.excerpt}</span>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="w-100 mw8 center tc pt4">
        <Link
          className={
            'f6 br2 ba ph3 pv2 mb2 dib bg-animate no-underline index-button'
          }
          to={'/tags'}
        >
          View All Tags
        </Link>
      </div>
    </HeaderLayout>
  );
};

export const query = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            categories
            date(formatString: "dddd, MMMM Do 0YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;

export default TagTemplate;
