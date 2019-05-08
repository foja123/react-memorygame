import React from 'react';
import Toolbar from '../Toolbar/Toolbar';

const layout = props => {
  return (
    <React.Fragment>
      <Toolbar />
      <main>
        {props.children}
      </main>
      <footer>FOOTER</footer>
    </React.Fragment>
  );
}

export default layout;