import React from 'react';

import classes from './Overlay.module.css';

const overlay = (props) => {
  let cls = [classes.overlay]

  if(props.show) {
    cls.push(classes.show)
  }

  return ( 
    <div className={cls.join(' ')} onClick={props.clicked}></div>
  );
}


export default overlay;