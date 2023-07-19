import { Box } from '../../design-system/components/Box';
import { Spacer } from '../../design-system/components/Spacer';
import { Typography } from '../../design-system/components/Typography';
import { ProgramsColumn, ProgramsRow } from '../molecules/ProgramList';

type Props = {
  title: string;
  orientation?: 'vertical' | 'horizontal';
};

export const ProgramListWithTitle = ({ title, orientation = 'horizontal' }: Props) => {
  return (
    <Box direction="vertical">
      <Typography variant="body" fontWeight="strong">
        {title}
      </Typography>
      <Spacer direction="vertical" gap="$2" />
      {orientation === 'horizontal' ? <ProgramsRow /> : <ProgramsColumn />}
    </Box>
  );
};
