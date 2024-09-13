import { MutableRefObject } from 'react';
import { Box } from '../../../design-system/components/Box';
import { Spacer } from '../../../design-system/components/Spacer';
import { Typography } from '../../../design-system/components/Typography';
import { ProgramsRow } from './ProgramList';
import { SpatialNavigationVirtualizedListRef } from '../../../../../lib/src/spatial-navigation/types/SpatialNavigationVirtualizedListRef';

type Props = {
  title: string;
  listRef?: MutableRefObject<SpatialNavigationVirtualizedListRef>;
  listSize?: number;
};

export const ProgramListWithTitle = ({ title, listRef, listSize }: Props) => {
  return (
    <Box direction="vertical">
      <Typography variant="body" fontWeight="strong">
        {title}
      </Typography>
      <Spacer direction="vertical" gap="$2" />
      <ProgramsRow listRef={listRef ?? null} listSize={listSize} />
    </Box>
  );
};

export const ProgramListWithTitleAndVariableSizes = ({ title, listSize }: Props) => {
  return (
    <Box direction="vertical">
      <Typography variant="body" fontWeight="strong">
        {title}
      </Typography>
      <Spacer direction="vertical" gap="$2" />
      <ProgramsRow variant="variable-size" listSize={listSize} />
    </Box>
  );
};
