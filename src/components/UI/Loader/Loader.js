import React from 'react';

import './Loader.css';

const loader = () => {
  return (
        
    <div className="lds-css ng-scope"><div style={{width:'100%',height:'100%', margin: 'auto'}} className="lds-rolling"><div></div></div></div>
  );
}

export default loader;


