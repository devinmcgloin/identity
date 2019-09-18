import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql, Link } from 'gatsby';
import Gallery from '../components/gallery';
import Img from 'gatsby-image';

const IndexPage = ({ data }) => {
  let images = data.static.edges.map(e => e.node);

  return (
    <HeaderLayout
      title="Artwork"
      description="Personal artwork I've created, both interactive and static"
    >
      <article className="w-100 flex flex-wrap">
        {data.interactive.edges.map((edge, index) => (
          <Link
            to={edge.node.fields.slug}
            key={index}
            className={'w-50 w-25-ns pa2 pointer'}
          >
            <div className="ba b--black-10 pa1">
              <Img
                className="flex justify-center align-center"
                fluid={edge.node.frontmatter.image.childImageSharp.fluid}
              />
            </div>
          </Link>
        ))}
      </article>
      <hr className="b--black-10 mv3"></hr>
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
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

export default IndexPage;
