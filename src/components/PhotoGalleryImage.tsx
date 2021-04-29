import React from 'react';
import { PhotoProps } from 'react-photo-gallery';
import { iImage } from '../consts/types';
import 'react-medium-image-zoom/dist/styles.css';
import Video from './Video';
import ZoomableImage from './ZoomableImage';

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
      data-testid="photo-gallery-image"
    >
      {image.video ? (
        <Video video={image} height={photo.height} width={photo.width} />
      ) : (
        <ZoomableImage
          image={image}
          height={photo.height}
          width={photo.width}
        />
      )}
    </div>
  );
};

export default Image;
