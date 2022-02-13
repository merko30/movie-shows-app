import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Detail from './pages/Detail'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import MovieProvider from './context/Movie'

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <MovieProvider>
        <Router>
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={Detail} path="/:type/:id" />
            <Route component={NotFound} path="*" />
          </Switch>
        </Router>
      </MovieProvider>
    </div>
  )
}

export default App
