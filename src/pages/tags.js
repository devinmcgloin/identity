import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import TagButton from '../components/tag';

const Tags = ({
  data: {
    allMdx: { group },
  },
}) => (
  <HeaderLayout
    title={'Tags'}
    description="Want to find something specific? This will help you get there."
  >
    <ul>
      {group.map((tag) => (
        <TagButton tag={tag.fieldValue} key={tag.fieldValue} />
      ))}
    </ul>
  </HeaderLayout>
);

export default Tags;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000, sort: { fields: frontmatter___tags, order: ASC }) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;
