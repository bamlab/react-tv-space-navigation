import { Box } from '../../design-system/components/Box';
import { Spacer } from '../../design-system/components/Spacer';
import { Typography } from '../../design-system/components/Typography';
import { VirtualizedRow } from '../molecules/VirtualizedSpatialList';

type Props = {
  title: string;
  numberOfItems: number;
};

export const ProgramList = ({ title, numberOfItems }: Props) => {
  return (
    <Box paddingHorizontal="$8">
      <Box direction="horizontal">
        <Spacer direction="horizontal" gap="$8" />
        <Typography variant="title" fontWeight="strong">
          {title}
        </Typography>
      </Box>
      <Spacer gap="$5" />
      <VirtualizedRow numberOfItems={numberOfItems} />
    </Box>
  );
};
