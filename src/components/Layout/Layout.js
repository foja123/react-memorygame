import React from 'react';
import Toolbar from '../Toolbar/Toolbar';

const layout = props => {

  console.log('layout: ', props)
  return (
    <React.Fragment>
      <Toolbar />
      <main>
        {props.children}
      </main>
      <footer></footer>
    </React.Fragment>
  );
}

export default layout;