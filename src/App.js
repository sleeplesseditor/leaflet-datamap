import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LazyLoader from './components/LazyLoader/LazyLoader';
import './App.scss';

const Map = React.lazy(() => import('./components/Map/Map'));

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LazyLoader(Map)} />
      </Switch>
  </Router>
  );
}

export default App;
