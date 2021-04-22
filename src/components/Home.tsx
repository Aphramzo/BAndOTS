import React, { useState, useEffect } from 'react';
import { GetRecent } from '../api/flickr';
import { iImage } from '../consts/types';

const Home: React.FC = () => {
  // TODO: obvs just a test
  const [images, setImages] = useState<Array<iImage> | null>(null);
  const getImages = async (): Promise<void> => {
    setImages(await GetRecent(0, 20));
  };
  useEffect(() => {
    getImages();
  }, []);

  return <div>Got {images?.length} images back</div>;
};

export default Home;
