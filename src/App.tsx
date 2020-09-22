import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MovieProvider from './context/Movie';
import { Detail, Home } from './pages';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Detail} path="/:type/:id" />
        </Switch>
      </Router>
    </MovieProvider>
  );
}

export default App;
