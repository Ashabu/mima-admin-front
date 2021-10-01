import React from 'react';
import { Link } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <div className = 'app-header'>
            <div className = 'app-header-left'>
                <Link to ='home'>
                    <img src = '../../Assets/Images/mima-logo.svg' alt= 'mima-logo' />
                    </Link>
                
            </div>
            <div className = 'app-header-right'>
                <div className = 'app-username'>
                    <span>Admin</span>
                </div>
                <div className = 'app-logout'>
                    <Link to = '/'>Logout</Link>
                </div>
            </div>
            
        </div>
    );
};

export default AppHeader;