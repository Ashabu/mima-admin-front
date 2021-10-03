import axios from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import './App.scss';
import Routing from './Routing/Routing';
import Lang from './Services/SetLang';


const App =()=> {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLang, setActiveLang] = useState(Lang.langKey);
  const [, forceUpdate]  = useReducer(x => x + 1, 0);

  const langSubscribe = () => Lang.subscribe(activeLang => {
    setActiveLang(activeLang);
    forceUpdate();
  });
  
  useEffect(() => {
    Lang.getLang(Lang.langKey, setIsLoaded(true));
    langSubscribe();
    return () => langSubscribe.unsubscribe();
  }, []);


  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
