import React from 'react';
import { HeaderLayout } from '../components/layout';
import { graphql } from 'gatsby';
import Gallery from '../components/gallery';

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
      <Gallery images={images} />
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
