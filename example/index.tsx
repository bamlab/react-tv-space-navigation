import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { MyComponent } from '../src/index';

const App = () => (
  <div>
    <h1>React Spatial Navigation Example</h1>
    <div />
    <MyComponent />
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
