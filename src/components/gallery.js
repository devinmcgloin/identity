import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Measure from 'react-measure';
import GalleryModal from './gallery-modal';
import noScroll from 'no-scroll';

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
      className={'w-33-l w-50-m w-100 pa2 pointer'}
      onClick={() => {
        setSelectedImage(i);
        setModalVisibility(true);
        noScroll.on();
      }}
    >
      <div className="ba b--black-10 pa1">
        <Img className="flex justify-center align-center" fluid={image.fluid} />
      </div>
    </div>
  ));

  let maxHeight = totalHeight * (widthFactor + 0.03);

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
  images: PropTypes.array,
};

export default Gallery;
