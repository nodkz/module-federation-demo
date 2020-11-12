import React, { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const RemoteButton = React.lazy(() => import('remote5002/Button'));

export function App() {
  const [cnt, setCnt] = useState(0);

  return (
    <div>
      <h1 style={{ fontSize: '64px' }}>Host Application</h1>

      <ErrorBoundary>
        <React.Suspense fallback="...">
          <RemoteButton
            text={`It works! ${cnt}`}
            onClick={() => {
              setCnt(cnt + 1);
            }}
          />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
