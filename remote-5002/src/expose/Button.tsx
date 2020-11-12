import React from 'react';
import s from './Button.module.scss';

interface P {
  text: string;
  onClick?: () => any;
}

export default function Button({ text, onClick }: P) {
  return (
    <button className={s.button} onClick={onClick} title="MY_BTN">
      {text}
    </button>
  );
}
