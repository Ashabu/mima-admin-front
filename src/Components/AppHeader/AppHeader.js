import React from 'react';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <div className = 'app-header'>
            <div className = 'app-header-left'>
                <img src = '../../Assets/Images/mima-logo.svg' alt= 'mima-logo' />
            </div>
            <div className = 'app-header-right'>
                <div className = 'app-username'>
                    <span>username</span>
                </div>
                <div className = 'app-logout'>
                    <button>Logout</button>
                </div>
            </div>
            
        </div>
    );
};

export default AppHeader;