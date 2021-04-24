import React from 'react';
import { iImage } from '../consts/types';

type ImagesProps = {
  images: Array<iImage> | null;
};

const Images: React.FC<ImagesProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return <div data-testid="no-images">No Images Found</div>;
  }

  return (
    <div>
      {images.map((image) => {
        return (
          <div key={image.urlLarge}>
            <img src={image.urlLarge} alt={image.description} />
          </div>
        );
      })}
    </div>
  );
};

export default Images;
