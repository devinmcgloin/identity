import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import GalleryModal from './gallery-modal';
import Measure from 'react-measure';
import StackGrid from 'react-stack-grid';

const Gallery = ({ images }) => {
  const [modalVisible, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bounds, setBounds] = useState(0);

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

  const { width } = bounds;

  return (
    <React.Fragment>
      <GalleryModal
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        modalVisible={modalVisible}
        setModalVisibility={setModalVisibility}
      />
      <Measure
        bounds
        onResize={(contentRect) => {
          setBounds(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            <StackGrid columnWidth={width > 500 ? '50%' : '100%'} duration={0}>
              {renderedImages}
            </StackGrid>
          </div>
        )}
      </Measure>
    </React.Fragment>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
};

export default Gallery;
