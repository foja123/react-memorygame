import React from 'react';
import Overlay from '../Overlay/Overlay';

import classes from './Modal.module.css';

const modal = props => {

  let cls = [classes.modal];
  if(props.show) {
    cls.push(classes.show);
  }

  return (
    <React.Fragment>
      <Overlay show={props.show} clicked={props.clicked}/>
      <div className={cls.join(' ')}>
        { props.children }
      </div>
    </React.Fragment>
  )
}

export default modal;