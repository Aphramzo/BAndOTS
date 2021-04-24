import React from 'react';
import { render, screen } from '@testing-library/react';
import Images from './Images';
import { iImage } from '../consts/types';

describe('Images component', () => {
  test('Renders no images message if null', () => {
    render(<Images images={null} />);
    const noImagesMessage = screen.getByTestId('no-images');
    expect(noImagesMessage).toBeInTheDocument();
  });

  test('Renders no message if empty array', () => {
    render(<Images images={[]} />);
    const noImagesMessage = screen.getByTestId('no-images');
    expect(noImagesMessage).toBeInTheDocument();
  });

  test('renders an image for each', () => {
    render(
      <Images
        images={[
          { urlLarge: 'test', description: 'testing' } as iImage,
          { urlLarge: 'other test', description: 'testing' } as iImage,
        ]}
      />,
    );
    const images = screen.getAllByAltText('testing');
    expect(images.length).toBe(2);
  });
});
