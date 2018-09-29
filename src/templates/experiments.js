import React from 'react'
import { HeaderLayout } from '../components/layout'
import { graphql } from 'gatsby'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <HeaderLayout title={post.frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </HeaderLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
