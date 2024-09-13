import {
  SpatialNavigationFocusableView,
  SpatialNavigationNodeRef,
} from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { ProgramLandscape } from './ProgramLandscape';
import { forwardRef } from 'react';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  label?: string;
  indexRange?: [number, number];
};

export const ProgramNodeLandscape = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, label, indexRange }, ref) => {
    return (
      <SpatialNavigationFocusableView
        alignInGrid={!!indexRange}
        indexRange={indexRange}
        onSelect={onSelect}
        ref={ref}
      >
        {({ isFocused, isRootActive }) => (
          <ProgramLandscape
            isFocused={isFocused && isRootActive}
            programInfo={programInfo}
            label={label}
          />
        )}
      </SpatialNavigationFocusableView>
    );
  },
);
ProgramNodeLandscape.displayName = 'ProgramNodeLandscape';
