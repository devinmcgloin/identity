import React from 'react';
import { graphql } from 'gatsby';
import { PostLayout } from '../components/layout';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

const PostTemplate = ({ data }) => {
  const post = data.mdx;

  return (
    <PostLayout
      title={post.frontmatter.title}
      publishedAt={post.frontmatter.date}
      description={post.excerpt}
    >
      <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
    </PostLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "dddd, MMMM Do 0YYYY")
      }
      excerpt
    }
  }
`;

export default PostTemplate;
