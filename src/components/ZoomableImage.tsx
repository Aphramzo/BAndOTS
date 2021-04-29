import React from 'react';
import Zoom from 'react-medium-image-zoom';
import { iImage } from '../consts/types';

type ZoomableImageProps = {
  image: iImage;
  width: number;
  height: number;
};

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  image,
  height,
  width,
}) => {
  return (
    <Zoom
      image={{
        src: image.urlSmall,
        alt: image.description,
        style: { width: width, height: height },
      }}
      zoomImage={{
        src: image.urlLarge,
        alt: image.description,
      }}
      defaultStyles={{ overlay: { backgroundColor: 'rgb(51, 51, 51, .9)' } }}
    />
  );
};

export default ZoomableImage;
