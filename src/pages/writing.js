import React from 'react';
import { HeaderLayout } from '../components/layout';
import Table from '../components/table-list';
import { flatten } from '../lib/transformation';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <HeaderLayout
    title="Writing"
    description="Thoughts from behind the screen, added to every so often."
  >
    <Table
      columns={[
        { type: 'title', description: 'Title' },
        {
          type: 'date',
          description: 'Date',
        },
      ]}
      rows={data.allMdx.edges.map(e => flatten(e.node))}
      color="light"
    />
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
            categories
            date(formatString: "dddd, MMMM Do 0YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
export default IndexPage;
