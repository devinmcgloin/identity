import React from 'react';
import { HeaderLayout } from '../components/layout';
import Table from '../components/table-list';
import { flatten } from '../lib/transformation';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <HeaderLayout
    title="Projects"
    description="Projects I've worked on, both current and past."
  >
    <Table
      columns={[
        { type: 'title', description: 'Title' },
        { type: 'excerpt', description: 'Description' },
      ]}
      rows={data.allMdx.edges.map((e) => flatten(e.node))}
      color="light"
    />
  </HeaderLayout>
);

export const query = graphql`
  {
    allMdx(
      filter: { fields: { slug: { regex: "/projects/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            repo
            date
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
