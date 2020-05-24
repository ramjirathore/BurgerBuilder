import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="YourBurger"/>
    </div>
);

export default logo;

// we can't directly put the path in src since webpack while  
// bundeling won't recognize it as image and will bundle it normally
// so we seaparately declare so webpack treats the image differently