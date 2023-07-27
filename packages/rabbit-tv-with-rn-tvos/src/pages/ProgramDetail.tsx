import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { DefaultFocus, SpatialNavigationNode } from 'react-tv-space-navigation/src';
import { RootStackParamList } from '../../App';
import { Page } from '../components/Page';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import { ProgramListWithTitle } from '../modules/program/view/ProgramListWithTitle';

export const ProgramDetail = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'ProgramDetail'>;
}) => {
  const { programInfo } = route.params;

  return (
    <Page>
      <Box padding="$5">
        <Container paddingHorizontal="$15" paddingTop="$10" direction="horizontal">
          <DefaultFocus>
            <SpatialNavigationNode isFocusable>
              {({ isFocused }) => (
                <JumbotronContainer isFocused={isFocused}>
                  <Jumbotron source={programInfo.image} />
                </JumbotronContainer>
              )}
            </SpatialNavigationNode>
          </DefaultFocus>
          <Box padding="$15" flex={1}>
            <Typography variant="title" fontWeight="strong">
              {programInfo.title}
            </Typography>
            <Spacer gap="$15" />
            <Description variant="body" fontWeight="strong">
              {programInfo.description}
            </Description>
          </Box>
        </Container>
        <Spacer gap="$5" />
        <ProgramListWithTitle title="You may also like..."></ProgramListWithTitle>
      </Box>
    </Page>
  );
};

const Container = styled(Box)({
  height: '60%',
});

const JumbotronContainer = styled.View<{ isFocused: boolean }>(({ isFocused }) => ({
  width: '60%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: 20,
  borderWidth: 3,
  borderColor: isFocused ? 'white' : 'transparent',
}));

const Jumbotron = styled.Image({
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});

const Description = styled(Typography)({
  textAlign: 'justify',
});
