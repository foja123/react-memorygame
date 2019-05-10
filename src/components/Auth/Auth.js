import React, { Component } from 'react';
import './Auth.css';

import Input from '../UI/Input/Input';

class Auth extends Component {

  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        }
      }
    }
  }
  
  render() {

    let inputArray = [];

    for (let k in this.state.controls) {
      console.log(k , this.state.controls[k]);
      inputArray.push({name: k, ...this.state.controls[k]});
    }
    
    console.log(inputArray);

    let input = null;

    if(inputArray.length !== 0) {
      input = inputArray.map(inp => {
        return <Input key={inp.name} elementType={inp.elementType} elementConfig={inp.elementConfig} />
      })
    }


    return (
      <div className="authContainer">
        <form>
          { input }
        </form>
      </div>
    )
  }
}

export default Auth;