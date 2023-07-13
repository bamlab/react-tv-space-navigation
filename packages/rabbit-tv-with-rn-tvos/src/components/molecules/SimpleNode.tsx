import { SpatialNavigationNode } from 'react-native-tv-spatial-navigation/src';

import { Program } from '../atom/Program';

type Props = {
  onSelect?: () => void;
};

export const SimpleNode = ({ onSelect }: Props) => {
  return (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
      {({ isFocused }) => <Program touchable={false} isFocused={isFocused} />}
    </SpatialNavigationNode>
  );
};
