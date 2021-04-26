import { Skeleton } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import * as uuid from 'uuid';

type MockImagesProps = {
  count: number;
};

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    '& span': {
      margin: '2px',
      display: 'inline-block',
    },
  },
}));

const MockImages: React.FC<MockImagesProps> = ({ count }) => {
  const classes = useStyles();
  const images = [...Array(count)];
  return (
    <div className={classes.container}>
      {images.map(() => {
        return (
          <Skeleton
            key={uuid.v4()}
            variant="rectangular"
            width={300}
            height={200}
          />
        );
      })}
    </div>
  );
};

export default MockImages;
