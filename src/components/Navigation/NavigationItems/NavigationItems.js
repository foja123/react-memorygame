import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css'

const navigationItems = props => {
  return(
    <nav className="navigation">
      <ul>
        <NavigationItem link="/game">Game</NavigationItem>
      </ul>
    </nav>
  )
}

export default navigationItems;