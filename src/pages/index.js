import React from 'react'
import { Link } from 'gatsby'
import Header from '../components/header'
import { Splash } from '../components/splash'
import 'tachyons/css/tachyons.css'
import '../style/identity.css'
import Currently from '../components/currently'
import Table from '../components/table-list'
import { StandardLayout } from '../components/layout'
import { flatten } from '../transformation'

const IndexPage = ({ data }) => (
  <StandardLayout>
    <Splash />
    <Currently />
    <Table
      columns={[
        { type: 'title', description: 'Title' },
        { type: 'excerpt', description: 'Description' },
      ]}
      rows={data.projects.edges.map(e => flatten(e.node)).slice(0, 5)}
      color="dark"
      title="Projects"
      link="/projects"
    />

    <Table
      columns={[
        { type: 'title', description: 'Title' },
        {
          type: 'date',
          description: 'Date',
          dateFormatter: 'dddd, MMMM Do 0YYYY',
        },
      ]}
      rows={data.writing.edges.map(e => flatten(e.node)).slice(0, 5)}
      color="dark"
      title="Writing"
      link="/writing"
    />
  </StandardLayout>
)

export const query = graphql`
  {
    experiments: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/experiments/(.)+/" } } }
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
    writing: allMarkdownRemark(
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
    projects: allMarkdownRemark(
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
