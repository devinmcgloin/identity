import React from 'react';
import { ProjectLayout } from '../components/layout';
import moment from 'moment';
import { graphql } from 'gatsby';
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const ProjectTemplate = ({ data }) => {
  const post = data.mdx;

  return (
    <ProjectLayout
      title={post.frontmatter.title}
      description={post.frontmatter.excerpt}
      publishedAt={moment(Date.parse(post.frontmatter.date))}
      repo={post.frontmatter.repo}
      license={post.frontmatter.license}
    >
      <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
    </ProjectLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        repo
        license
        excerpt
      }
      code {
        body
      }
    }
  }
`;

export default ProjectTemplate;