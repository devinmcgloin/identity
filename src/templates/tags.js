import React from 'react';
import { HeaderLayout } from '../components/layout';
import { Link, graphql } from 'gatsby';
import { CommonMetadata } from '../components/metadata';

export default ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;

  const header = `On ${tag}`;

  return (
    <HeaderLayout title={header}>
      <CommonMetadata title={header} />
      {edges.map(({ node }) => {
        const { title } = node.frontmatter;
        const { slug } = node.fields;
        return (
          <li key={slug}>
            <Link to={slug}>{title}</Link>
          </li>
        );
      })}
      <Link to="/tags"> View all tags</Link>
    </HeaderLayout>
  );
};

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
