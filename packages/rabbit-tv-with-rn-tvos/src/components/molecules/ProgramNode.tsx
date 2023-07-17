import { SpatialNavigationNode } from 'react-native-tv-spatial-navigation/src';

import { Program } from '../atom/Program/view/Program';

type Props = {
  onSelect?: () => void;
};

export const ProgramNode = ({ onSelect }: Props) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
      {({ isFocused }) => <Program touchable={false} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};
