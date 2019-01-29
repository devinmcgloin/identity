import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';

const IndexPage = ({ data }) => {
  let images = data.allImageSharp.edges.map(e => {
    return {
      src: e.node.fluid.src,
      width: e.node.fluid.presentationWidth,
      height: e.node.fluid.presentationHeight,
    };
  });
  return (
    <HeaderLayout title="Artwork">
      <Gallery photos={images}/>
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    allImageSharp(filter: { original: { src: { regex: "/sketch/" } } }) {
      edges {
        node {
          id
          fluid(quality: 100) {
            src
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`;

export default IndexPage;
