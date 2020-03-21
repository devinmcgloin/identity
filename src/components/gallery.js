import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import GalleryModal from './gallery-modal';
import styled from 'styled-components';

const ImageContainer = styled.div`
  @media screen and (min-width: 30em) {
    column-count: 2;
  }

  @media screen and (min-width: 60em) {
    column-count: 3;
  }
`;

const Gallery = ({ images }) => {
  const [modalVisible, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  let renderedImages = images.map((image, i) => (
    <div
      key={i}
      className={'w-100 pa1 pointer dib'}
      onClick={() => {
        setSelectedImage(i);
        setModalVisibility(true);
      }}
    >
      <div className="ba b--black-10 pa1">
        <Img
          imgStyle={{
            objectFit: 'contain',
          }}
          fluid={image.fluid}
        />
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <GalleryModal
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        modalVisible={modalVisible}
        setModalVisibility={setModalVisibility}
      />
      <ImageContainer>{renderedImages}</ImageContainer>
    </React.Fragment>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
};

export default Gallery;
