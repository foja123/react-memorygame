import React, { Component } from 'react';
import classes from './Game.module.css';
import uniqId from 'uniqid';

import Card from '../Card/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import Timer from '../Timer/Timer';

import { shuffleArray } from '../utils';

import angular from '../../assets/images/angular.png';
import gatsby from '../../assets/images/gatsby.png';
import graphql from '../../assets/images/graphql.png';
import ionic from '../../assets/images/ionic.png';
import js from '../../assets/images/js.png';
import node from '../../assets/images/node.png';
import react from '../../assets/images/react.png';
import reactnative from '../../assets/images/reactnative.png';
import redux from '../../assets/images/redux.png';
import vue from '../../assets/images/vue.png';

class Game extends Component {

  state = {
    initialCards: [angular, gatsby, graphql, ionic, js, node, react, reactnative, redux, vue],
    finalCards: [],
    selectedCards: [],
    toWin: null,
    vinto: false,
    stop: false,
    isPlaying: false
  }



  componentDidMount() {
    this.int = setTimeout(() => {
      this.initGame();
      this.setState({isPlaying: true})
    }, 2000); 
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedCards.length !== this.state.selectedCards.length) {
      if(this.state.selectedCards.length === 2) {
        setTimeout(() => {
          this.checkCards();
        }, 1000);
      }
    }

    if (prevState.toWin !== this.state.toWin) {
      if(this.state.toWin === 0) {
        setTimeout(() => {
          this.setState({vinto: true, stop: true}) 
        }, 1000);
      }
    }

    if (prevState.vinto !== this.state.vinto) { 
      if(!this.state.vinto) {
        //this.initHandler();
      }
    }

  }

  componentWillUnmount() {
    clearTimeout(this.int);
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
    }, 2000);

  }

  clickCardHandler = (index) => {

    if(this.state.selectedCards.length === 2 || this.state.finalCards[index].completed || this.state.finalCards[index].open) {
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
        this.winHandler();
      } else {
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
      finalCardsClosed.push({...finalCardsCopy[k], open: false});
      //finalCardsClosed[k].open = false;
    }
    this.setState({
      finalCards: finalCardsClosed
    });
  }

  render() {

    let cards = <Loader />;
    if(this.state.finalCards.length !== 0) {
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
          COMPLETED!
        </Modal>
        <div style={{textAlign: 'center', margin: '25px'}}>
          <Button clicked={this.initGame}>start Game</Button>
        </div>
        <div className={classes.gameContainer}>
          { cards }
        </div>
      </React.Fragment>
    );
  }
}

export default Game;