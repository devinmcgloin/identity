import React from 'react';
import { graphql } from 'gatsby';
import { PostLayout } from '../components/layout';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <PostLayout
      title={post.frontmatter.title}
      publishedAt={post.frontmatter.date}
    >
      <div id="post" dangerouslySetInnerHTML={{ __html: post.html }} />
    </PostLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd, MMMM Do 0YYYY")
      }
    }
  }
`;
