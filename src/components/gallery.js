import React, { Component } from 'react';
import Img from 'gatsby-image';
import Lightbox from 'react-images';

const Gallery = ({ images, widthClasses = 'w-33', maxHeight = '6000px' }) => {
  let renderedImages = images.map((image, i) => (
    <div key={i} className={`${widthClasses} pa2`}>
      <div className="pa4 bg-light-gray">
        <Img className="flex justify-center align-center" fluid={image} />
      </div>
    </div>
  ));

  return (
    <div
      className="flex flex-wrap flex-column mw8 flex-start"
      style={{ maxHeight: maxHeight }}
    >
      {renderedImages}
    </div>
  );
};

export default Gallery;
