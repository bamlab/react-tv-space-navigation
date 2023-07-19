import styled from '@emotion/native';
import {
  DefaultFocus,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-native-tv-spatial-navigation/src';
import { Page } from '../components/atom/Page';
import '../components/configureRemoteControl';
import { ProgramListWithTitle } from '../components/organisms/ProgramListWithTitle';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';

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
          </Box>
          <SectionTitle variant="title">Throughout the years</SectionTitle>
          <SpatialNavigationView direction="horizontal">
            <Box padding="$10" direction="horizontal">
              <ProgramListWithTitle title="70s" orientation="vertical" />
              <Spacer direction="horizontal" gap="$6" />
              <ProgramListWithTitle title="80s" orientation="vertical" />
              <Spacer direction="horizontal" gap="$6" />
              <ProgramListWithTitle title="90s" orientation="vertical" />
              <Spacer direction="horizontal" gap="$6" />
              <ProgramListWithTitle title="00s" orientation="vertical" />
            </Box>
          </SpatialNavigationView>
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary.contrastText,
}));
