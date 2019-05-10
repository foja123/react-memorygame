import React from 'react';
import Logo from '../Logo/Logo';

import classes from './Toolbar.module.css';

const toolbar = () => {
  return (
    <header className={classes.header}>
      <Logo />
    </header>
  )
}

export default toolbar;