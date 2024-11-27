import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from '../../../../../lib/src/spatial-navigation/types/SpatialNavigationNodeRef';
import { useRotateAnimation } from './useRotateAnimation';
import { Animated } from 'react-native';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
  label?: string;
  variant?: 'portrait' | 'landscape';
};

export const ProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange, label, variant }: Props, ref) => {
    const { rotate360, animatedStyle } = useRotateAnimation();

    return (
      <SpatialNavigationFocusableView
        onSelect={onSelect}
        onLongSelect={rotate360}
        indexRange={indexRange}
        viewProps={{ accessibilityLabel: programInfo.title }}
        ref={ref}
      >
        {({ isFocused, isRootActive }) => (
          <Animated.View style={animatedStyle}>
            <Program
              isFocused={isFocused && isRootActive}
              programInfo={programInfo}
              label={label}
              variant={variant}
            />
          </Animated.View>
        )}
      </SpatialNavigationFocusableView>
    );
  },
);
ProgramNode.displayName = 'ProgramNode';
