import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css'

const navigationItems = props => {
  return(
    <nav className="navigation">
      <ul>
        <NavigationItem link="/game">Game</NavigationItem>
        <NavigationItem link="/auth">Auth</NavigationItem>
      </ul>
    </nav>
  )
}

export default navigationItems;