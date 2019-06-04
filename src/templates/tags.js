import React from 'react';
import { HeaderLayout } from '../components/layout';
import { Link, graphql } from 'gatsby';
import PostList from '../components/post-list';
import { flatten } from '../lib/transformation';

const TagTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges } = data.allMdx;

  const header = `On ${tag}`;

  return (
    <HeaderLayout
      title={header}
      description={`Various thoughts on ${tag} and other musings`}
    >
      <PostList entries={edges.map(e => flatten(e.node))} />
      <div className="w-100 mw8 center tc pt4">
        <Link
          className={
            'f6 br2 ba ph3 pv2 mb2 dib bg-animate no-underline index-button black'
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
            date(formatString: "dddd, MMMM Do 0YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt(pruneLength: 270)
        }
      }
    }
  }
`;

export default TagTemplate;
