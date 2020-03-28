import React from 'react';
import { HeaderLayout } from '../components/layout';
import PostList from '../components/post-list';
import { flatten } from '../lib/transformation';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <HeaderLayout
    title="Writing"
    description="Thoughts from behind the screen, added to every so often."
  >
    <PostList entries={data.allMdx.edges.map((e) => flatten(e.node))} />
  </HeaderLayout>
);

export const query = graphql`
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
`;
export default IndexPage;
