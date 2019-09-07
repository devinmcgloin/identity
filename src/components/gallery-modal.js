import React, { useState } from 'react';
import Modal from 'react-modal';
import Img from 'gatsby-image';
import styled from 'styled-components';

const customStyles = {
  content: {
    width: '100vw',
    height: '100vh',
    background: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 0,
  },
};

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

const XDisplay = () => (
  <CloseButton>
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

const LeftArrow = styled.div`
  font-size: 24px;
  height: 20px;
  width: 20px;
  display: block;
  position: absolute;
  bottom: 30px;
  right: 80px;
  cursor: pointer;
`;

const RightArrow = styled.div`
  font-size: 24px;
  height: 20px;
  width: 20px;
  display: block;
  position: absolute;
  bottom: 30px;
  cursor: pointer;
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
  return (
    <Modal
      isOpen={modalVisible}
      onRequestClose={() => setModalVisibility(false)}
      style={customStyles}
      contentLabel="Image Lightbox Modal"
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          padding: '70px 0px 70px 0px',
        }}
      >
        <XDisplay
          onClick={() => {
            setModalVisibility(false);
          }}
        ></XDisplay>
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
        <LeftArrow onClick={() => setIndex(selectedImage - 1)}>
          <Arrow></Arrow>
        </LeftArrow>
        <RightArrow onClick={() => setIndex(selectedImage + 1)}>
          <Arrow right> </Arrow>
        </RightArrow>
      </div>
    </Modal>
  );
};

export default GalleryModal;
