import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { AppContext } from '../../Context/AppContext';
import './appHeader.scss';


const AppHeader = () => {


    const { activeLang, setLang } = useContext(AppContext);
    const history = useHistory();

    
    const logOut = () => {
        history.replace({pathname: '/'})
      }



    return (
        <div className='app-header'>
            <div className='app-header-left'>
                <Link to='home'>
                    <img src='../../Assets/Images/mima-logo.svg' alt='mima-logo' />
                </Link>

            </div>
            <div className='app-header-mid'>
                <ul>
                    <li>
                        <Link to='firstContainer'>Main Banner</Link>
                    </li>
                    <li>
                        <Link to='benefits'>Benefits</Link>
                    </li>
                    <li>
                        <Link to='commission'>Commision</Link>
                    </li>
                    <li>
                        <Link to='testimonials'>Testimonials</Link>
                    </li>
                    <li>
                        <Link to='marketingTools'>Marketing</Link>
                    </li>
                    <li>
                        <Link to='faqs'>FAQs</Link>
                    </li>
                    <li>
                        <Link to='partners'>Partners</Link>
                    </li>
                    {/* <li>
                        <Link to='users'>Users</Link>
                    </li> */}

                </ul>

            </div>
            <div className='app-header-right'>
                <div className={activeLang === 'en' ? 'lang active' : 'lang'} onClick={() => setLang('en')}>
                    ENG
                </div>
                <div className={activeLang === 'ru' ? 'lang active' : 'lang'} onClick={() => setLang('ru')}>
                    RU
                </div>
                <div className='app-username'>
                    <span>Admin</span>
                </div>
                <div className='app-logout'>
                    <span onClick={logOut}>Logout</span>
                </div>
            </div>

        </div>
    );
};

export default AppHeader;