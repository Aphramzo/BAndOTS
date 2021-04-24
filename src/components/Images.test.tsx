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
});
