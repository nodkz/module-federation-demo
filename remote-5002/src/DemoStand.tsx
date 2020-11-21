import React from 'react';
import Button from './expose/Button';

export function DemoStand() {
  return (
    <div>
      <h1>
        Remote5002 APP which exposes &lt;Button /&gt; component with styles, fonts &amp; images to
        other apps.
      </h1>

      <Button text="Click me!" />

      <br />
      <br />
      <img src={require('public/assets/button-code.png').default} width={700} />
    </div>
  );
}
