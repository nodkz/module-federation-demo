import React from 'react';
import s from './App.module.scss';
import img from 'public/assets/bot.png';

export function App() {
  return (
    <div>
      <h1 className={`${s.header} color`}>Hello world!</h1>
      <img src={img} alt="testing img loader" />
    </div>
  );
}
