import React from 'react';
import './appLayout.scss';
import AppHeader from '../AppHeader/AppHeader';
import NavigationPanel from '../NavigationPanel/NavigationPanel';

const AppLayout = (props) => {
    return (
        <div className = 'app-layout'>
            <div className = 'app-layout-header'>
                <AppHeader/>
            </div>
            <div className = 'app-layout-body'>
                <NavigationPanel/>
                {props.children}  
            </div>
            
            
            
        </div>
    );
};

export default AppLayout;