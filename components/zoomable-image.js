import Zoom from 'react-medium-image-zoom';
import Image from 'next/image';

const ZoomableImage = (props) => (
  <Zoom>
    <Image {...props} />
  </Zoom>
);

export default ZoomableImage;
