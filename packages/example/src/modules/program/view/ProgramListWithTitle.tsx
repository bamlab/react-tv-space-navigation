import { MutableRefObject } from 'react';
import { Box } from '../../../design-system/components/Box';
import { Spacer } from '../../../design-system/components/Spacer';
import { Typography } from '../../../design-system/components/Typography';
import { ProgramsRow } from './ProgramList';
import { ProgramsRowVariableSize } from './ProgramListVariableSize';
import { SpatialNavigationVirtualizedListRef } from '../../../../../lib/src/spatial-navigation/types/SpatialNavigationVirtualizedListRef';
import { useRemotePrograms } from '../infra/useRemotePrograms';

type Props = {
  title: string;
  listRef?: MutableRefObject<SpatialNavigationVirtualizedListRef>;
};

export const ProgramListWithTitle = ({ title, listRef }: Props) => {
  const programsQuery = useRemotePrograms();
  console.log('programsQuery', programsQuery);
  if (programsQuery.data?.pages) {
    console.log('on a des data');
  }

  return (
    <Box direction="vertical">
      <Typography variant="body" fontWeight="strong">
        {title}
      </Typography>
      <Spacer direction="vertical" gap="$2" />
      <ProgramsRow
        onEndReached={() => programsQuery.fetchNextPage()}
        data={programsQuery.data?.pages?.flat?.() ?? []}
        listRef={listRef ?? null}
      />
    </Box>
  );
};

export const ProgramListWithTitleAndVariableSizes = ({ title }: Props) => {
  return (
    <Box direction="vertical">
      <Typography variant="body" fontWeight="strong">
        {title}
      </Typography>
      <Spacer direction="vertical" gap="$2" />
      <ProgramsRowVariableSize />
    </Box>
  );
};
