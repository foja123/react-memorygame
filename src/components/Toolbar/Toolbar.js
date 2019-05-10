import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

import classes from './Toolbar.module.css';

const toolbar = () => {
  return (
    <header className={classes.header}>
      <Logo />
      <NavigationItems />
    </header>
  )
}

export default toolbar;