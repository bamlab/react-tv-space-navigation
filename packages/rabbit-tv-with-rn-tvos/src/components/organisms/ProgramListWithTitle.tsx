import { Box } from '../../design-system/components/Box';
import { Spacer } from '../../design-system/components/Spacer';
import { Typography } from '../../design-system/components/Typography';
import { ProgramsRow } from '../molecules/ProgramList';

type Props = {
  title: string;
  numberOfItems: number;
};

export const ProgramListWithTitle = ({ title, numberOfItems }: Props) => {
  return (
    <Box paddingHorizontal="$8">
      <Box direction="horizontal">
        <Spacer direction="horizontal" gap="$8" />
        <Typography variant="title" fontWeight="strong">
          {title}
        </Typography>
      </Box>
      <Spacer gap="$2" />
      <ProgramsRow numberOfItems={numberOfItems} />
    </Box>
  );
};
