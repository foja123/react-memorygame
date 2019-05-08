import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Game from './components/Game/Game';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Game />
        </Layout>
      </React.Fragment>
    )
  }
}

export default App;
