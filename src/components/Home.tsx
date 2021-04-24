import React, { useState, useEffect } from 'react';
import { GetRecent } from '../api/flickr';
import { iImage } from '../consts/types';
import Images from './Images';

const Home: React.FC = () => {
  const [images, setImages] = useState<Array<iImage> | null>(null);
  const getImages = async (): Promise<void> => {
    setImages(await GetRecent(0, 20));
  };
  useEffect(() => {
    getImages();
  }, []);

  return <Images images={images} />;
};

export default Home;
