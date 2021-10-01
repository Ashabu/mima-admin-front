import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.scss';
import Routing from './Routing/Routing';


const App =()=> {
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
