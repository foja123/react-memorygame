import React, { Component } from 'react';
import classes from './Game.module.css';
import uniqId from 'uniqid';

import Card from '../Card/Card';
import Modal from '../UI/Modal/Modal';

import { shuffleArray } from '../utils';

class Game extends Component {

  state = {
    initialCards: ['A', 'B'],
    finalCards: [],
    selectedCards: [],
    toWin: null,
    vinto: false
  }

  componentDidMount() {
    console.log('componentDidMount GAME');
    this.initGame();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate GAME');
    if(prevState.selectedCards.length !== this.state.selectedCards.length) {
      if(this.state.selectedCards.length === 2) {
        setTimeout(() => {
          console.log('qui');
          this.checkCards();
        }, 1000)
      }
    }

    if (prevState.toWin !== this.state.toWin) {
      if(this.state.toWin === 0) {
        console.log('AAA');
        setTimeout(() => {
          console.log('oppure qui');
          console.log(prevState.toWin);
          //this.showModal();
          this.setState({vinto: true})
          
        }, 1000);
      }
    }

    if (prevState.vinto !== this.state.vinto) { 
      console.log(this.state.vinto);
      if(!this.state.vinto) {
        setTimeout(() => {
          console.log('game init');
          this.initGame();
        }, 1000);
      }
    }

  }


  initGame = () => {
    let buildCards = this.state.initialCards.map(item => {
      return [item,item]
    }).reduce((first,second) => {
      return first.concat(second);
    });
    let arr = [];
    for (let k in buildCards) {
      arr.push({
        value: buildCards[k],
        id: uniqId(),
        open: true,
        completed: false
      });
    }
    //let buildCards = this.state.initialCards.concat(this.state.initialCards).sort()
    this.setState({
      finalCards: shuffleArray(arr),
      toWin: this.state.initialCards.length
    });

    setTimeout(() => {
      this.closeCards();
    }, 2000)

  }

  clickCardHandler = (index) => {

    if(this.state.selectedCards.length === 2 || this.state.finalCards[index].completed === true || this.state.finalCards[index].open) {
      return;
    } else {
      this.state.finalCards[index].open = true
      let arrSel = [];
      arrSel.push(this.state.finalCards[index]);
      this.setState(prevState => {
        return {
          selectedCards: prevState.selectedCards.concat(arrSel)
        }
      });
    }
  }

  checkCards = () => {
    if(this.state.selectedCards.length === 2) {
      if(this.state.selectedCards[0].value === this.state.selectedCards[1].value) {
        //alert('win');
        this.winHandler();
      } else {
        //alert('loose');
        this.looseHandler();
      }
    }
    
  }

  resetCards = () => {
    this.setState({
      selectedCards: []
    });
  }

  looseHandler = () => {
    this.state.selectedCards.forEach(card => {
      card.open = false
    });
    this.resetCards();
  }
  
  winHandler = () => {
    this.state.selectedCards.forEach(card => {
      card.completed = true
    });
    this.setState(prevState => {
      return {
        toWin: prevState.toWin - 1
      }
    });
    this.resetCards();
  }

  clickModalHandler = () => {
    this.setState({
      vinto: false
    });
  }

  closeCards = () => {
    let finalCardsCopy = this.state.finalCards.slice();
    const finalCardsClosed = [];
    for (let k in finalCardsCopy) {
      finalCardsClosed.push({...finalCardsCopy[k]});
      finalCardsClosed[k].open = false;
    }
    this.setState({
      finalCards: finalCardsClosed
    });
  }

  render() {
    let cards = null;
    if(this.state.finalCards) {
      cards = this.state.finalCards.map((card, index) => {
        return <Card 
          isOpen={card.open}
          isCompleted={card.completed}
          index={index} 
          value={card.value} 
          key={card.id} 
          clicked={() => this.clickCardHandler(index)} />
      });
    }

    return (
      <React.Fragment>
        <Modal show={this.state.vinto} clicked={this.clickModalHandler}>
          YOU WIN
        </Modal>
        <div>{ this.state.toWin }</div>
        <div className={classes.gameContainer}>
        { cards }
        </div>
      </React.Fragment>
    );
  }
}

export default Game;