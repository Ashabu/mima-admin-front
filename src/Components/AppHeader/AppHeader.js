import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import './appHeader.scss';


const AppHeader = () => {


    const {setLang} = useContext(AppContext);



    return (
        <div className = 'app-header'>
            <div className = 'app-header-left'>
                <Link to ='home'>
                    <img src = '../../Assets/Images/mima-logo.svg' alt= 'mima-logo' />
                    </Link>
                
            </div>
            <div className = 'app-header-right'>
                <div style={{marginRight: 20, cursor: 'pointer'}} onClick = {() => setLang('en')}>
                    ENG
                </div>
                <div style={{marginRight: 20, cursor: 'pointer'}} onClick = {() => setLang('ru')}>
                    RU
                </div>
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