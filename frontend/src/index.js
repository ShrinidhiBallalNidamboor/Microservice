import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './index.css';
import Home from './components/Home';
import Qna from './components/Qna';
import Trail from './components/Trail';
import Answers from './components/Answers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Qna' element={<Qna />}></Route>
      <Route path='/Answers' element={<Answers />}></Route>
      <Route path='/Trail' element={<Trail />}></Route>
      </Routes>
    </BrowserRouter>

    
  </React.StrictMode>
);

