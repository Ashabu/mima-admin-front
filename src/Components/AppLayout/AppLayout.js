import React from 'react';
import './appLayout.scss';
import AppHeader from '../AppHeader/AppHeader';

const AppLayout = (props) => {
    return (
        <div className = 'app-layout'>
            <div className = 'app-layout-header'>
                <AppHeader/>
            </div>
            <div className = 'app-layout-body'>
                
                {props.children}  
            </div>
            
            
            
        </div>
    );
};

export default AppLayout;