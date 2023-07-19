import { SpatialNavigationNode } from 'react-native-tv-spatial-navigation/src';

import { ProgramInfo } from '../atom/Program/domain/program';
import { Program } from '../atom/Program/view/Program';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
};

export const ProgramNode = ({ programInfo, onSelect }: Props) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
      {({ isFocused }) => (
        <Program touchable={false} isFocused={isFocused} programInfo={programInfo} />
      )}
    </SpatialNavigationNode>
  );
};
