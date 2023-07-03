/* eslint-disable react-native/no-inline-styles -- TODO we'll see about that later */

import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Node } from '../../core/src/spatial-navigation/Components/Node';
import { Root } from '../../core/src/spatial-navigation/Components/Root';
import { ProgramLayout } from './components/program/ProgramLayout';

const Program = () => {
  return <Node isFocusable>{({ isFocused }) => <ProgramLayout isFocused={isFocused} />}</Node>;
};

const ViewNode = ({
  direction = 'horizontal',
  children,
}: {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}) => {
  return (
    <Node orientation={direction}>
      <div
        style={{
          borderStyle: 'solid',
          borderColor: 'grey',
          borderWidth: 1,
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: 20,
          margin: 20,
        }}
      >
        {children}
      </div>
    </Node>
  );
};

const App = () => (
  <div>
    <h1 style={{ color: 'white' }}>React Spatial Navigation Example</h1>
    <div />
    <Root>
      <ViewNode direction="horizontal">
        <ViewNode direction="vertical">
          <Program />
          <Program />
          <ViewNode direction="horizontal">
            <Program />
            <Program />
          </ViewNode>
        </ViewNode>
        <Program />
        <Program />
      </ViewNode>
      <ViewNode direction="horizontal">
        <Program />
        <Program />
        <Program />
      </ViewNode>
    </Root>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
