import React from 'react'
import { HeaderLayout } from '../components/layout'
import { graphql, Link } from 'gatsby'

const IndexPage = ({ data }) => (
  <HeaderLayout title="Experiments">
    <article className="dib w-100">
      {data.allMarkdownRemark.edges.map(e => {
        return (
          <Link
            key={e.node.fields.slug}
            to={e.node.fields.slug}
            className="fl w-50 w-25-l link overflow-hidden pa2"
          >
            <div
              role="img"
              className="grow aspect-ratio--4x6"
              style={{
                background: `url(${
                  e.node.frontmatter.featuredImage.childImageSharp.fluid.src
                }) no-repeat center center`,
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
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/experiments/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
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
