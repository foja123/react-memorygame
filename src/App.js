import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Game from './components/Game/Game';
import Auth from './components/Auth/Auth';

import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
          <Route path="/game" component={Game} />
          <Route path="/auth" component={Auth} />
          <Redirect from="/" to="/game" />
          </Switch>
        </Layout>
      </React.Fragment>
    )
  }
}

export default App;
