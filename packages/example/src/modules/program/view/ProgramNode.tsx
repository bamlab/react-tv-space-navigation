import { SpatialNavigationNode } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';
import { LongProgram } from './LongProgram';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
};

export const ProgramNode = ({ programInfo, onSelect, indexRange }: Props) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect} indexRange={indexRange}>
      {({ isFocused }) => <Program isFocused={isFocused} programInfo={programInfo} />}
    </SpatialNavigationNode>
  );
};

export const LongProgramNode = ({ programInfo, onSelect, indexRange }: Props) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect} alignInGrid indexRange={indexRange}>
      {({ isFocused }) => <LongProgram isFocused={isFocused} programInfo={programInfo} />}
    </SpatialNavigationNode>
  );
};
