import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql, Link } from 'gatsby';
import Gallery from '../components/gallery';
import Img from 'gatsby-image';

const IndexPage = ({ data }) => {
  let images = data.static.edges.map(e => e.node.fluid);

  return (
    <HeaderLayout
      title="Artwork"
      description="Personal artwork I've created, both interactive and static"
    >
      <h2 className="f3 pl2 ttu tracked lh-copy black-60">Interactive</h2>
      <article className="w-100 flex flex-wrap">
        {data.interactive.edges.map((edge, index) => (
          <Link
            key={index}
            className="w-100 w-50-m w-25-l pa2"
            to={edge.node.fields.slug}
          >
            <Img
              className="br2"
              fluid={edge.node.frontmatter.image.childImageSharp.fluid}
            />
          </Link>
        ))}
      </article>

      <h2 className="f3 pl2 ttu tracked lh-copy black-60">Static</h2>
      <Gallery images={images} maxHeight={6000} />
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    interactive: allMdx(
      filter: { fields: { slug: { regex: "/interactive/(.)+/" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 1000, maxHeight: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    static: allImageSharp(
      filter: { original: { src: { regex: "/sketch/" } } }
      sort: { fields: resize___originalName }
    ) {
      edges {
        node {
          id
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

export default IndexPage;
