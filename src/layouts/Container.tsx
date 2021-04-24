import { makeStyles } from '@material-ui/core';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
}));

const Container: React.FC<ContainerProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export default Container;
