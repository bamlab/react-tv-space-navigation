import { SpatialNavigationNode } from 'react-native-tv-spatial-navigation/src';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
};

export const ProgramNode = ({ programInfo, onSelect }: Props) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
      {({ isFocused }) => <Program isFocused={isFocused} programInfo={programInfo} />}
    </SpatialNavigationNode>
  );
};
