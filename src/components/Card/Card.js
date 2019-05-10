import React from 'react';
import classes from './Card.css';


const card = props => {
  let classes = ['flip-card'];

  if(props.isOpen) {
      classes.push('open');
  }
  if(props.isCompleted) {
      classes.push('complete');
  }

  return (
      <div className={classes.join(' ')} onClick={props.clicked}>
          <div className="flip-card-inner">
              <div className="flip-card-front">
              </div>
              <div className="flip-card-back">
                  {props.value}
              </div>
          </div>
      </div>
  );
}

export default card;