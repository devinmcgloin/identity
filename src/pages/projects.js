import React from 'react';
import { HeaderLayout } from '../components/layout';
import Table from '../components/table-list';
import { flatten } from '../lib/transformation';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  debugger;
  return (
    <HeaderLayout
      title="Projects"
      description="Porjects I've worked on, both current and past."
    >
      <Table
        columns={[
          { type: 'title', description: 'Title' },
          { type: 'excerpt', description: 'Description' },
        ]}
        rows={data.allMdx.edges.map(e => flatten(e.node))}
        color="light"
      />
    </HeaderLayout>
  );
};

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
