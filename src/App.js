import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.scss';
import Faqs from './Containers/Faqs/Faqs';

import ItemList from './Components/ItemLIst/ItemList';

const App =()=> {

  // const [faqs, setFaqs] = useState([]);
  // useEffect(() => {
  //   getFaqs();
  // }, [])


  // const getFaqs = async () => {
  //   await axios.get('http://192.168.1.154:8080/getFaqs').then(res => {
  //     if(res.data.success) {
  //       let faqs = res.data.data.faqs;
  //       setFaqs(faqs);
  //     } else {
  //       console.log('error');
  //     }
  //   }).catch(e => {
  //     console.log(e);
  //   })
  // }

  return (
    <div className="App">
      <Faqs/>
      {/* {faqs && faqs.map((faq, index) => (
          <ItemList key = {index} faq = {faq} index={index}/>
      ))} */}
    </div>
  );
}

export default App;
