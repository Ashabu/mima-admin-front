import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './appHeader.scss';
import Lang from '../../Services/SetLang';
import { Langs } from './../../Constants/Lang';

let langs = []

const AppHeader = () => {

    langs = Object.entries(Langs)
   
    const[currentLang, setCurrentLang] = useState(langs);

   

    const onChangeLang = () => {
        debugger
        setCurrentLang(lang => {
            let nextEl = lang[0];
             lang[0] = lang[1];
             lang[1] = nextEl
            return lang
        });

        Lang.getLang(currentLang[1][1]);
    }
    

    console.log(currentLang)




    return (
        <div className = 'app-header'>
            <div className = 'app-header-left'>
                <Link to ='home'>
                    <img src = '../../Assets/Images/mima-logo.svg' alt= 'mima-logo' />
                    </Link>
                
            </div>
            <div className = 'app-header-right'>
                <div style={{marginRight: 20, cursor: 'pointer'}} onClick = {onChangeLang}>
                    ENG
                </div>
                <div style={{marginRight: 20, cursor: 'pointer'}}>
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