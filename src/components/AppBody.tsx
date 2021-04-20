import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Memories from './Memories';
import routes from '../consts/routes';

const useStyles = makeStyles(() => ({
  body: {
    color: '#fff',
    backgroundColor: `#333`,
    height: '100%',
  },
}));

const AppBody: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Switch>
        <Route path={routes.memories} component={Memories} />
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default AppBody;
