import React from 'react'
import { HeaderLayout } from '../components/layout'
import Table from '../components/table-list'
import { flatten } from '../transformation'

const IndexPage = ({ data }) => (
  <HeaderLayout title="Projects">
    <Table
      columns={[
        { type: 'title', description: 'Title' },
        { type: 'excerpt', description: 'Description' },
      ]}
      rows={data.allMarkdownRemark.edges.map(e => flatten(e.node))}
      color="light"
    />
  </HeaderLayout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/projects/(.)+/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            excerpt
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default IndexPage
