import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import Grid from '../components/grid';

const IndexPage = ({ data }) => {
  let images = data.allImageSharp.edges.map(e => e.node.fluid.src);
  return (
    <HeaderLayout title="Artwork">
      <Grid imageURLS={images} />
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
            sizes
          }
        }
      }
    }
  }
`;

export default IndexPage;
