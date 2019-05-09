import React from 'react';
import classes from './Card.module.css';


const card = props => {
  let cls = [classes.card];
  if(props.isOpen) {
    cls.push(classes.isOpen);
  }
  if(props.isCompleted) {
    cls.push(classes.isCompleted);
  }
  return(
    <div className={cls.join(' ')} onClick={props.clicked}> 
      { props.value }
    </div>
  )
}

export default card;