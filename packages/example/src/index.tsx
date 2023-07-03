import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Node } from '../../core/src/spatial-navigation/Components/Node'
import { Root } from '../../core/src/spatial-navigation/Components/Root'
import { ProgramLayout } from './components/program/ProgramLayout';

const Program = () => {
  return (
    <Node isFocusable>
      {({isFocused}) => <ProgramLayout isFocused={isFocused}/> }
    </Node>
  );
}

const App = () => (
  <div>
    <h1 style={{ color: 'white' }}>React Spatial Navigation Example</h1>
    <div />
    <Root>
      <Node orientation="horizontal">
        <div style={{display: 'flex', flexDirection: 'row', gap: 20, margin: 20}}>
          <Program />
          <Program />
          <Program />
        </div>
      </Node>
      <Node orientation="horizontal">
        <div style={{display: 'flex', flexDirection: 'row', gap: 20, margin: 20}}>
          <Program />
          <Program />
          <Program />
        </div>
      </Node>
    </Root>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
