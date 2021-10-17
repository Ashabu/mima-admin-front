import axios from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import AppProvider from './Context/AppContext';
import './App.scss';
import Routing from './Routing/Routing';
import Lang from './Services/SetLang';


const App =()=> {
  


  return (
    <AppProvider>
      <Routing/>
    </AppProvider>
  );
}

export default App;
