import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import AppProvider, { AppContext } from './Context/AppContext';
import './App.scss';
import Routing from './Routing/Routing';
import { useHistory } from "react-router";
import AuthService from './Services/AuthService';

const App =()=> {

  const {isUserAuthorized, setUserAuthorized} = useContext(AppContext);
  const history = useHistory();

  const AuthInterceptorSubscription = useRef();
  const [isInterceptorLoaded, setIsInterceptorLoaded] = useState(true);

  useEffect(() => {
    setIsInterceptorLoaded(true)
    AuthInterceptorSubscription.current = AuthService.registerAuthInterceptor(logOut);

    setIsInterceptorLoaded(false)

    return () => {
      AuthInterceptorSubscription.current.unsubscribe();
    }
  }, [])


//checking if user session is out 
  useEffect(() => {
    console.log(AuthService.isAuthenticated())
    if(AuthService.isAuthenticated()) {
      
      setUserAuthorized(true)
    } else {
      setUserAuthorized(false)
    }
  }, [])

  useEffect(() => {

  }, [])

// logout user 
  const logOut = () => {
    history.replace({pathname: '/'})
  }

  useEffect(() => {
    if(!isUserAuthorized){
      AuthService.SignOut();
      logOut();
    }
  }, [isUserAuthorized])


if(isInterceptorLoaded) return null;
  


  return (
    <AppProvider>
      <Routing/>
    </AppProvider>
  );
}

export default App;
