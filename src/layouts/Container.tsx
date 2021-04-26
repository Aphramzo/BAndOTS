import { makeStyles } from '@material-ui/core';
import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  id?: string;
};

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    overflow: 'scroll',
  },
}));

const Container: React.FC<ContainerProps> = ({ children, id }) => {
  const classes = useStyles();
  return (
    <div id={id} className={classes.container}>
      {children}
    </div>
  );
};

export default Container;
