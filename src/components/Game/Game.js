import React, { Component } from 'react';
import classes from './Game.module.css';
import uniqId from 'uniqid';

import Card from '../Card/Card';

class Game extends Component {

  state = {
    initialCards: ['A', 'B', 'C', 'D'],
    duplicatedCards: [],
    finalCards: [],
    selectedCards: []
  }

  componentDidMount() {
    let buildCards = this.state.initialCards.map(item => {
      return [item,item]
    }).reduce((first,second) => {
      return first.concat(second)
    });
    let arr = [];
    for (let k in buildCards) {
      arr.push({
        value: buildCards[k],
        id: uniqId(),
        open: false
      });
    }
    //let buildCards = this.state.initialCards.concat(this.state.initialCards).sort()
    this.setState({
      duplicatedCards: buildCards,
      finalCards: arr
    }, () => {
      console.log(this.state.finalCards);
    });
  }

  clickCardHandler = (value, index) => {
    console.log(this.state.finalCards[index]);
    let testArray = [];
    testArray.push(this.state.finalCards[index]);
    this.setState({
      selectedCards: [...this.state.selectedCards, testArray]
    }, () => {
      if(this.state.selectedCards.length == 2) {
        console.log('a');
      }
    })
    
  }

  render() {
    let cards = null;
    if(this.state.finalCards) {
      cards = this.state.finalCards.map((card, index) => {
        return <Card index={index} value={card.value} key={card.id} clicked={() => this.clickCardHandler(card.value, index)}/>
      });
    }


    return (
      <div className={classes.gameContainer}>
        { cards }
      </div>
    );
  }
}

export default Game;