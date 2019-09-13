import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Img from 'gatsby-image';
import styled from 'styled-components';
import noScroll from 'no-scroll';
import { useSwipeable } from 'react-swipeable';

const CloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: block;
  z-index: 100;
`;

const CrossBar = styled.div`
  position: absolute;
  left: 10px;
  content: ' ';
  height: 20px;
  width: 2px;
  transform: rotate(45deg);
  transform: ${props => (props.right ? 'rotate(45deg)' : 'rotate(-45deg)')};

  background-color: #333;
`;

const XDisplay = props => (
  <CloseButton {...props}>
    <CrossBar></CrossBar>
    <CrossBar right></CrossBar>
  </CloseButton>
);

const PositionDisplay = styled.div`
  font-family: 'Open Sans';
  font-size: 1rem;
  line-height: 1.5;
  width: 100px;
  text-align: center;
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -50px;
`;

const ArrowContainer = styled.div`
  font-size: 24px;
  height: 20px;
  width: 20px;
  display: block;
  position: absolute;
  bottom: 30px;
  right: 80px;
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  color: ${props => (props.disabled ? '#eee' : '#333')};
`;

const LeftArrowContainer = styled(ArrowContainer)`
  right: 80px;
`;

const RightArrowContainer = styled(ArrowContainer)`
  right: 40px;
`;

const Arrow = styled.div`
  border-style: solid;
  border-width: 2px 2px 0 0;
  transform: ${props => (props.right ? 'rotate(45deg)' : 'rotate(-135deg)')};

  height: 10px;
  left: 10px;
  position: relative;
  top: 5px;
  vertical-align: top;
  width: 10px;
`;

const GalleryModal = ({
  modalVisible,
  setModalVisibility,
  images,
  selectedImage,
  setSelectedImage,
}) => {
  const setIndex = current => {
    setSelectedImage(Math.max(0, Math.min(current, images.length - 1)));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex(selectedImage - 1),
    onSwipedRight: () => setIndex(selectedImage + 1),

    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  const handleUserKeyPress = useCallback(event => {
    const { key } = event;
    switch (key) {
      case 'ArrowRight':
        setIndex(selectedImage + 1);
        break;
      case 'ArrowLeft':
        setIndex(selectedImage - 1);
        break;
    }
  });

  const [viewHeight, setViewHeight] = useState('100vh');
  useEffect(() => {
    setViewHeight(window.innerHeight);
  });

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });

  const customStyles = () => {
    return {
      content: {
        width: '100vw',
        height: viewHeight,
        background: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 0,
      },
    };
  };

  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => {
        setModalVisibility(false);
        noScroll.off();
      }}
      style={customStyles()}
      contentLabel="Image Modal"
    >
      <div
        {...handlers}
        style={{
          position: 'relative',
          height: '100%',
          padding: '70px 0px 70px 0px',
        }}
      >
        <XDisplay
          onClick={() => {
            noScroll.off();
            setModalVisibility(false);
          }}
        />
        <Img
          style={{
            maxWidth: '100%',
            height: '100%',
            display: 'block',
          }}
          imgStyle={{
            objectFit: 'contain',
          }}
          fluid={images[selectedImage].fluid}
        />
        <PositionDisplay>
          {selectedImage + 1} of {images.length}
        </PositionDisplay>
        <LeftArrowContainer
          onClick={() => setIndex(selectedImage - 1)}
          disabled={selectedImage === 0}
        >
          <Arrow></Arrow>
        </LeftArrowContainer>
        <RightArrowContainer
          onClick={() => setIndex(selectedImage + 1)}
          disabled={selectedImage === images.length - 1}
        >
          <Arrow right></Arrow>
        </RightArrowContainer>
      </div>
    </Modal>
  );
};

export default GalleryModal;