import React from 'react';

const BackDrop = (props) => {
    const { show, onClick } = props;
    return (
        show ? <div className = 'back-drop' onClick = {onClick}></div> : null
    );
};

export default BackDrop;