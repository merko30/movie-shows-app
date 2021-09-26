import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MovieProvider from './context/Movie';
import { Detail, Home, NotFound } from './pages';

function App():JSX.Element {
  return (
    <MovieProvider>
      <Router>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Detail} path="/:type/:id" />
          <Route component={NotFound} path="*" />
        </Switch>
      </Router>
    </MovieProvider>
  );
}

export default App;
