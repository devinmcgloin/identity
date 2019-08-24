import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Measure from 'react-measure';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#eee',
    border: 'none',
    borderRadius: '2px',
    padding: '32px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
  },
};

const Gallery = ({ images }) => {
  const [width, setWidth] = useState(1100);
  const [modalVisible, setModalVisibility] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  let widthFactor;
  if (width >= 945) widthFactor = 0.33;
  else if (width >= 465) widthFactor = 0.5;
  else widthFactor = 1;
  let columnWidth = widthFactor * width - 80;

  let totalHeight = images.reduce(
    (acc, image) => acc + columnWidth / image.fluid.aspectRatio + 80,
    0
  );

  let renderedImages = images.map((image, i) => (
    <div
      key={i}
      className={'w-33-l w-50-m w-100 pa2 pointer dim'}
      onClick={() => {
        setSelectedImage(i);
        setModalVisibility(true);
      }}
    >
      <div className="pa4 bg-light-gray">
        <Img className="flex justify-center align-center" fluid={image.fluid} />
      </div>
    </div>
  ));

  let maxHeight = totalHeight * (widthFactor + 0.02);

  return (
    <React.Fragment>
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
        style={customStyles}
        contentLabel="Image Lightbox Modal"
      >
        <Img
          style={{
            width: width * images[selectedImage].fluid.aspectRatio,
            maxHeight: '80vh',
            maxWidth: '80vw',
          }}
          fluid={images[selectedImage].fluid}
        />
      </Modal>
      <Measure
        bounds
        onResize={rect => {
          let { width } = rect.bounds;
          setWidth(width);
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className="flex flex-wrap flex-column mw8 flex-start"
            style={{ maxHeight: maxHeight }}
          >
            {renderedImages}
          </div>
        )}
      </Measure>
    </React.Fragment>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(),
};

export default Gallery;
