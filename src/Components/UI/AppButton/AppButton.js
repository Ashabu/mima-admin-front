import React, { Fragment } from 'react';
import "./button.scss";


const AppButton = (props) => {

    let button = (<button className={props.buttonClass} onClick={props.onClick}>{props.children}</button>);

    if (props.loading) {
        button = (<div className="btn-wrap">
            <button className={props.buttonClass + " disabled"} onClick={props.onClick} >{props.children}</button>
            <img className="btn-loader" src="../../Assets/Images/loader.svg" alt="loader" />
        </div>)
    };

    return (
        <Fragment>
            {button}
        </Fragment>
    );
};


export default AppButton;