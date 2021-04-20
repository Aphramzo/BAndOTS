import React from 'react';
import { makeStyles, Typography, AppBar, Toolbar } from '@material-ui/core';
import AppMenu from './AppMenu';
import { Link } from 'react-router-dom';

// Currently using material ui alpha, and it looks like there is an issue with this here
// The background color gets correctly set in 4.11, but in 5 alpha it's not correct
// I'd rather still use 5 alpha w/ react 17 and deal with this
const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#444 !important', // See note above
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
    marginLeft: '.5em',
  },
}));

const TitleBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <AppMenu />
        <Link to="/" className={classes.title}>
          <Typography variant="h6">Odin & Brokk</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
