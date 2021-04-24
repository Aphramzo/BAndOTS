import React from 'react';
import { PhotoProps } from 'react-photo-gallery';
import { iImage } from '../consts/types';

type ImageProps = {
  image: iImage;
  index: number;
  photo: PhotoProps;
};

const Image: React.FC<ImageProps> = ({ image, photo }) => {
  return (
    <div
      style={{
        height: photo.height,
        width: photo.width,
        position: 'relative',
        overflow: 'hidden',
        margin: '2px',
      }}
    >
      <img
        height={photo.height}
        width={photo.width}
        alt={image.description}
        src={image.urlSmall}
      />
    </div>
  );
};

export default Image;
