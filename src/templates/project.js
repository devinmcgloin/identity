import React from 'react'
import { ProjectLayout } from '../components/layout'
import moment from 'moment'
export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <ProjectLayout
      title={post.frontmatter.title}
      publishedAt={moment(Date.parse(post.frontmatter.date))}
    >
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </ProjectLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
