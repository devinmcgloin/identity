import React from 'react';
import { ProjectLayout } from '../components/layout';
import moment from 'moment';
import { graphql } from 'gatsby';
import { CommonMetadata } from '../components/metadata';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <ProjectLayout
      title={post.frontmatter.title}
      publishedAt={moment(Date.parse(post.frontmatter.date))}
      repo={post.frontmatter.repo}
      license={post.frontmatter.license}
    >
      <CommonMetadata
        title={post.frontmatter.title}
        description={post.frontmatter.excerpt}
      />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </ProjectLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        repo
        license
        excerpt
      }
    }
  }
`;
