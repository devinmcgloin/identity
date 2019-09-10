import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import Gallery from '../components/gallery';

const IndexPage = ({ data }) => {
  let images = data.photos.edges.map(e => e.node);

  return (
    <HeaderLayout
      title="Photography"
      description="Various photos I'm proud of. Taken across the world and stored on Unsplash."
    >
      <Gallery images={images} />
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    photos: allImageSharp(
      filter: { original: { src: { regex: "/photography/" } } }
      sort: { fields: resize___originalName }
    ) {
      edges {
        node {
          id
          fluid(quality: 100, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

export default IndexPage;
