import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { ProgramLandscape } from './ProgramLandscape';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  label?: string;
};

export const ProgramNodeLandscape = ({ programInfo, onSelect, label }: Props) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <ProgramLandscape isFocused={isFocused} programInfo={programInfo} label={label} />
      )}
    </SpatialNavigationFocusableView>
  );
};
