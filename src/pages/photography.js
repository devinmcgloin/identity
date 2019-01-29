import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';

const IndexPage = ({ data }) => {
  let images = data.allUnsplashPhoto.edges.map(e => {
    return {
      src: e.node.urls.regular,
      width: e.node.width,
      height: e.node.height,
    };
  });
  return (
    <HeaderLayout title="Photography">
      <Gallery margin={5} photos={images} />
    </HeaderLayout>
  );
};

export const query = graphql`
  {
    allUnsplashPhoto {
      edges {
        node {
          width
          height
          urls {
            regular
          }
        }
      }
    }
  }
`;

export default IndexPage;
