import styled from '@emotion/native';
import { DefaultFocus, SpatialNavigationScrollView } from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import '../components/configureRemoteControl';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import {
  ProgramListWithTitle,
  ProgramListWithTitleAndVariableSizes,
} from '../modules/program/view/ProgramListWithTitle';

export const Home = () => {
  return (
    <Page>
      <TitleContainer>
        <Title variant="title">Hoppix</Title>
      </TitleContainer>
      <DefaultFocus>
        <SpatialNavigationScrollView offsetFromStart={140}>
          <Box padding="$10">
            <ProgramListWithTitle title="Popular" />
            <Spacer gap="$6" />
            <ProgramListWithTitle title="Classics" />
            <Spacer gap="$6" />
            <ProgramListWithTitle title="Watch again" />
            <Spacer gap="$6" />
            <ProgramListWithTitle title="You may also like..." />
            <Spacer gap="$6" />
            <ProgramListWithTitleAndVariableSizes title="Our selection"></ProgramListWithTitleAndVariableSizes>
          </Box>
        </SpatialNavigationScrollView>
      </DefaultFocus>
    </Page>
  );
};

const TitleContainer = styled.View(({ theme }) => ({ padding: theme.spacings.$4 }));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.main,
}));
