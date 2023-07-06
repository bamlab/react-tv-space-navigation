/* eslint-disable react-native/no-inline-styles -- TODO we'll see about that later */

import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './configureKeyboard';

import { SpatialNavigationNode } from '@react-spatial-navigation/core/src/index';
import { SpatialNavigationRoot } from '@react-spatial-navigation/core/src/index';
import { ProgramLayout } from './components/program/ProgramLayout';
import { Typography } from './components/Typography';

const Program = () => {
  return (
    <SpatialNavigationNode isFocusable>
      {({ isFocused }) => <ProgramLayout isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};

const ViewNode = ({
  direction = 'horizontal',
  children,
}: {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}) => {
  return (
    <SpatialNavigationNode orientation={direction}>
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
    </SpatialNavigationNode>
  );
};

const App = () => {
  return (
    <div>
      <Typography>React Spatial Navigation Example</Typography>
      <div />
      <SpatialNavigationRoot>
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
      </SpatialNavigationRoot>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
