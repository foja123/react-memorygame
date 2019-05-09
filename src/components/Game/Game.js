import React, { Component } from 'react';
import classes from './Game.module.css';
import uniqId from 'uniqid';

import Card from '../Card/Card';
import Modal from '../UI/Modal/Modal';

class Game extends Component {

  state = {
    initialCards: ['A', 'B'],
    duplicatedCards: [],
    finalCards: [],
    selectedCards: [],
    toWin: null
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
          this.showModal();
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
        open: false,
        completed: false
      });
    }
    //let buildCards = this.state.initialCards.concat(this.state.initialCards).sort()
    this.setState({
      duplicatedCards: buildCards,
      finalCards: arr,
      toWin: this.state.initialCards.length
    });
  }

  clickCardHandler = (index) => {

    if(this.state.selectedCards.length === 2 || this.state.finalCards[index].completed === true) {
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

  showModal = () => {
    this.setState({
      showModal: true
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false
    }, () => {
      this.initGame();
    })
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

    console.log(this.state.toWin == false);

    return (
      <React.Fragment>
        <Modal show={!this.state.toWin} clicked={this.closeModal}>
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