import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetRecent } from '../api/flickr';
import { iImage } from '../consts/types';
import Container from '../layouts/Container';
import Images from './Images';

const Home: React.FC = () => {
  const [images, setImages] = useState<Array<iImage> | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getImages = async (pageNumber: number): Promise<void> => {
    const imgs = await GetRecent(pageNumber, 20);
    setImages((previousImages) => {
      if (previousImages) {
        return [...previousImages, ...imgs];
      }
      return imgs;
    });
  };

  const fetchNextPage = (): void => {
    setPageNumber((previousPageNum) => previousPageNum + 1);
  };

  useEffect(() => {
    getImages(pageNumber);
  }, [pageNumber]);

  return (
    <Container>
      <InfiniteScroll
        dataLength={images?.length || 0}
        hasMore
        next={fetchNextPage}
        loader={<div>Sure</div>}
      >
        <Images images={images} />
      </InfiniteScroll>
    </Container>
  );
};

export default Home;
