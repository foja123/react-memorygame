import React from 'react';

import './Input.css';

const input = props => {

  let inputEl = null;

  switch(props.elementType) {
    case 'input': 
      inputEl = <input {...props.elementConfig} />
    break;
  }

  return (
    <div className="inputContainer">
      { inputEl }
    </div>
  )
}

export default input;