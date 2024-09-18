import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from '../../../../../lib/src/spatial-navigation/types/SpatialNavigationNodeRef';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
  label?: string;
  variant?: 'portrait' | 'landscape';
};

export const ProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange, label, variant }: Props, ref) => {
    const rotationZ = useSharedValue(0);

    const rotate360 = () => {
      rotationZ.value = withTiming(rotationZ.value + 360);
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotateZ: `${rotationZ.value}deg` }],
      };
    });

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
