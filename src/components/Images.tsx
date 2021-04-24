import React from 'react';
import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { iImage } from '../consts/types';
import Image from './Image';

type ImagesProps = {
  images: Array<iImage> | null;
};

const Images: React.FC<ImagesProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return <div data-testid="no-images">No Images Found</div>;
  }

  const renderImage: React.ComponentType<RenderImageProps> = ({
    index,
    photo,
  }) => {
    // The renderer here doesn't have access to the full image we want
    // So grab it out of the array
    const image = images?.find((i) => i.urlSmall === photo.src);
    if (image) {
      return <Image index={index} image={image} photo={photo} />;
    }
    return null;
  };

  return (
    <Gallery
      photos={images.map((image) => ({
        src: image.urlSmall,
        width: image.smallWidth,
        height: image.smallHeight,
      }))}
      renderImage={renderImage}
    />
  );
};

export default Images;
