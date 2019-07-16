import React, { useState } from 'react';
import Img from 'gatsby-image';
import Lightbox from 'react-images';
import Measure from 'react-measure';

const Gallery = ({ images }) => {
  const [width, setWidth] = useState(1);

  let widthFactor;
  if (width >= 945) widthFactor = 0.33;
  else if (width >= 465) widthFactor = 0.5;
  else widthFactor = 1;
  let columnWidth = widthFactor * width - 80;

  let totalHeight = images.reduce(
    (acc, image) => acc + columnWidth / image.aspectRatio + 80,
    0
  );

  let renderedImages = images.map((image, i) => (
    <div key={i} className={'w-33-l w-50-m w-100 pa2'}>
      <div className="pa4 bg-light-gray">
        <Img className="flex justify-center align-center" fluid={image} />
      </div>
    </div>
  ));

  let maxHeight = totalHeight * (widthFactor + 0.01);

  return (
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
  );
};

export default Gallery;
