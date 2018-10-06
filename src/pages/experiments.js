import React from 'react'
import { HeaderLayout } from '../components/layout'
import { graphql, Link } from 'gatsby'

const IndexPage = ({ data }) => (
  <HeaderLayout title="Experiments">
    <article className="dib w-100">
      {data.allExperimentsYaml.edges.map(e => {
        return (
          <Link
            key={e.node.slug}
            to={e.node.slug}
            className="fl w-50 w-25-l link overflow-hidden pa2"
          >
            <div
              role="img"
              className="grow aspect-ratio--4x6"
              style={{
                background: `url() no-repeat center center`,
                backgroundSize: 'cover',
              }}
            />
          </Link>
        )
      })}
    </article>
  </HeaderLayout>
)

export const query = graphql`
  {
    allExperimentsYaml {
      edges {
        node {
          title
          slug
          date
        }
      }
    }
  }
`

export default IndexPage
