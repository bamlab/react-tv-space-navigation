import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { MyComponent } from '../src/index';
import { Node } from '../src/spatial-navigation/Components/Node'
import { Root } from '../src/spatial-navigation/Components/Root'

const Element = () => {
  return (
    <Node isFocusable>
      {({isFocused}) => <div style={{width: 100, height: 100, backgroundColor: isFocused ? 'green' : 'grey'}} /> }
    </Node>
  );
}

const App = () => (
  <div>
    <h1>React Spatial Navigation Example</h1>
    <div />
    <Root>
      <Node orientation="horizontal">
        <div style={{display: 'flex', flexDirection: 'row', gap: 20, margin: 20}}>
          <Element />
          <Element />
          <Element />
        </div>
      </Node>
      <Node orientation="horizontal">
        <div style={{display: 'flex', flexDirection: 'row', gap: 20, margin: 20}}>
          <Element />
          <Element />
          <Element />
        </div>
      </Node>
    </Root>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
