import React from 'react';
import { HeaderLayout } from '../components/layout';
import Table from '../components/table-list';
import { flatten } from '../lib/transformation';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <HeaderLayout title="Projects">
    <Table
      columns={[
        { type: 'title', description: 'Title' },
        { type: 'excerpt', description: 'Description' },
      ]}
      rows={data.allMarkdownRemark.edges.map(e => flatten(e.node))}
      color="light"
    />
  </HeaderLayout>
);

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/projects/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            excerpt
            repo
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
export default IndexPage;
