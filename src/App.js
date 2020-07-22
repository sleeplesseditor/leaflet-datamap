import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LazyLoader from './components/LazyLoader/LazyLoader';
import './App.scss';
import Header from './components/Header/Header';

const Map = React.lazy(() => import('./components/Map/Map'));

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={LazyLoader(Map)} />
      </Switch>
  </Router>
  )
}

export default App;
