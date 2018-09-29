import React from 'react'
import { HeaderLayout } from '../components/layout'
import Table from '../components/table-list'
import { flatten } from '../transformation'

const IndexPage = ({ data }) => (
  <HeaderLayout title="Writing">
    <Table
      columns={[
        { type: 'title', description: 'Title' },
        {
          type: 'date',
          description: 'Date',
          dateFormatter: 'dddd, MMMM Do 0YYYY',
        },
      ]}
      rows={data.allMarkdownRemark.edges.map(e => flatten(e.node))}
      color="light"
    />
  </HeaderLayout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/writing/(.)+/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            categories
            excerpt
            date
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
