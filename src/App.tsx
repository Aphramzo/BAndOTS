import React from 'react';
import TitleBar from './components/TitleBar';
import AppBody from './components/AppBody';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <TitleBar />
      <AppBody />
    </Router>
  );
};

export default App;
