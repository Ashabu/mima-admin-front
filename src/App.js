import axios from 'axios';
import React, { useEffect } from 'react';
import './App.scss';

const App =()=> {


  useEffect(() => {
    getFaqs();
  }, [])


  const getFaqs = async () => {
    await axios.get('http://192.168.1.154:8080/getFaqs').then(res => {
      console.log(res.data);
    })
  }

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
