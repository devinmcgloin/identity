import React from 'react'
import { HeaderLayout } from '../components/layout'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
      <div>{post.frontmatter.title}</div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
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
