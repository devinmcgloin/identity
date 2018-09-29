import React from 'react'
import { ExperimentLayout } from '../components/layout'
import { graphql } from 'gatsby'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <ExperimentLayout {...post.frontmatter}>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </ExperimentLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        datgui
        instructions
      }
    }
  }
`
