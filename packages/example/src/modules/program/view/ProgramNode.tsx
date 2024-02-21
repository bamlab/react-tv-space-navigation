import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';
import { LongProgram } from './LongProgram';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from '../../../../../lib/src/spatial-navigation/types/SpatialNavigationNodeRef';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
};

export const ProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange }: Props, ref) => {
    return (
      <SpatialNavigationFocusableView onSelect={onSelect} indexRange={indexRange} ref={ref}>
        {({ isFocused }) => <Program isFocused={isFocused} programInfo={programInfo} />}
      </SpatialNavigationFocusableView>
    );
  },
);
ProgramNode.displayName = 'ProgramNode';

export const LongProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange }: Props, ref) => {
    return (
      <SpatialNavigationFocusableView
        onSelect={onSelect}
        alignInGrid
        indexRange={indexRange}
        ref={ref}
      >
        {({ isFocused }) => <LongProgram isFocused={isFocused} programInfo={programInfo} />}
      </SpatialNavigationFocusableView>
    );
  },
);
LongProgramNode.displayName = 'LongProgramNode';
