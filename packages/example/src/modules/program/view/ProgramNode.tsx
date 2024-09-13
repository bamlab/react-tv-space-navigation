import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';
import { forwardRef } from 'react';
import { SpatialNavigationNodeRef } from '../../../../../lib/src/spatial-navigation/types/SpatialNavigationNodeRef';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
  label?: string;
};

export const ProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange, label }: Props, ref) => {
    return (
      <SpatialNavigationFocusableView
        onSelect={onSelect}
        indexRange={indexRange}
        viewProps={{ accessibilityLabel: programInfo.title }}
        ref={ref}
      >
        {({ isFocused, isRootActive }) => (
          <Program isFocused={isFocused && isRootActive} programInfo={programInfo} label={label} />
        )}
      </SpatialNavigationFocusableView>
    );
  },
);
ProgramNode.displayName = 'ProgramNode';
