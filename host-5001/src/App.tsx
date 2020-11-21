import React, { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const RemoteButton = React.lazy(() => import('remote5002/Button'));

export function App() {
  const [cnt, setCnt] = useState(0);

  return (
    <div>
      <h1 style={{ fontSize: '64px' }}>Host Application</h1>

      <h2>
        App imports &lt;Button /&gt; from another domain at runtime, <br />
        and controls its props &amp; behavior.
      </h2>

      <ErrorBoundary>
        <React.Suspense fallback="...">
          <RemoteButton
            text={`It works! ${cnt}`}
            onClick={() => {
              setCnt(cnt + 1);
            }}
            // // Click with custom remote logic:
            // onClick={() => {
            //   import('remote5002/customCalc')
            //     .then((m) => m.default)
            //     .then((f) => {
            //       setCnt(f(cnt + 1));
            //     });
            // }}
          />
        </React.Suspense>
      </ErrorBoundary>

      <div style={{ marginTop: '500px' }}>
        <h2>Code example:</h2>
        <img src={require('public/assets/app-code.png').default} width={900} />
      </div>
    </div>
  );
}
