import React from 'react';
import './backFlip.scss';

const BackFlip = (props) => {
    return (
        props.show? <div className = 'backflip' onClick = {props.onClick}></div> : null
    );
};

export default BackFlip;