import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import Grid from '../components/grid';

const IndexPage = ({ data }) => {
  let images = data.allUnsplashPhoto.edges.map(e => e.node.urls.regular);
  return (
    <HeaderLayout title="Photography">
      <Grid imageURLS={images} />
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    allUnsplashPhoto {
      edges {
        node {
          urls {
            regular
          }
        }
      }
    }
  }
`;

export default IndexPage;
