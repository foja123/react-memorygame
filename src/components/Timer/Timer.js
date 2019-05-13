import React, { Component } from 'react';


class Timer extends Component {

  state = {
    elapsed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({
      elapsed: new Date() - this.props.start
    })
  }

  setElapsed = () => {
    clearInterval(this.timer);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nextProps.isPlaying ', nextProps.isPlaying);
  //   console.log('this.props.isPlaying ', this.props.isPlaying);
  //   if(nextProps.isPlaying !== this.props.isPlaying) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  
  render() {
    
    if(this.props.stop) {
      clearInterval(this.timer);
    }

    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds =  (elapsed / 10).toFixed(1); 

    return (
      <div onClick={this.setElapsed}>Timer: {seconds}</div>
    )
  }
}


export default Timer;