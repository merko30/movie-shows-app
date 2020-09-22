import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MovieProvider from "./context/Movie";

import { Detail, Home } from "./pages";

function App() {
  return (
    <MovieProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:type/:id" component={Detail} />
        </Switch>
      </Router>
    </MovieProvider>
  );
}

export default App;
