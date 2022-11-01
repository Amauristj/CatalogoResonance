import React from 'react';
import ReactDOM from 'react-dom/client';

import RouterWeb from './RouterWeb'
import Footer from './layout/Footer/Footer';
import NavBar from './layout/NavBar/NavBar';
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='container-lg conatinerst2'> 
      <NavBar></NavBar> 
        <main className='Principal'>
          <RouterWeb> </RouterWeb> 
        </main>
      <Footer></Footer>
  </div>
);


