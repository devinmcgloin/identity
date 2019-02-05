import React from 'react';
import { StandardLayout } from '../components/layout';
import { graphql, Link } from 'gatsby';

const Tags = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <StandardLayout>
    {group.map(tag => (
      <li key={tag.fieldValue}>
        <Link to={`/tags/${tag.fieldValue}/`}>
          {tag.fieldValue} ({tag.totalCount})
        </Link>
      </li>
    ))}
  </StandardLayout>
);

export default Tags;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
