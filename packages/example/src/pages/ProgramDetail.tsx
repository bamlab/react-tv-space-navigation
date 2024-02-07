import styled from '@emotion/native';
import { RouteProp } from '@react-navigation/native';
import { DefaultFocus } from 'react-tv-space-navigation';
import { RootStackParamList } from '../../App';
import { Page } from '../components/Page';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import { ProgramListWithTitle } from '../modules/program/view/ProgramListWithTitle';
import { Button } from '../design-system/components/Button';
import { useState } from 'react';
import { SubtitlesModal } from '../components/modals/SubtitlesModal';

export const ProgramDetail = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'ProgramDetail'>;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subtitles, setSubtitles] = useState('No');
  const { programInfo } = route.params;

  return (
    <Page>
      <Box padding="$5">
        <Container paddingHorizontal="$15" paddingTop="$10" direction="horizontal">
          <JumbotronContainer>
            <Jumbotron source={programInfo.image} />
          </JumbotronContainer>
          <DefaultFocus>
            <Box padding="$15" flex={1}>
              <Typography variant="title" fontWeight="strong">
                {programInfo.title}
              </Typography>
              <Spacer gap="$15" />
              <Description variant="body" fontWeight="strong">
                {programInfo.description}
              </Description>
              <Spacer gap="$8" />
              {/* eslint-disable-next-line no-console */}
              <Button label="Play" onSelect={() => console.log('Playing!')} />
              <Spacer gap="$8" />
              {/* eslint-disable-next-line no-console */}
              <Button label="More info" onSelect={() => console.log('More info!')} />
              <Spacer gap="$8" />
              <Button label={`${subtitles} subtitles`} onSelect={() => setIsModalVisible(true)} />
            </Box>
          </DefaultFocus>
        </Container>
        <Spacer gap="$5" />
        <ProgramListWithTitle title="You may also like..."></ProgramListWithTitle>
      </Box>
      <SubtitlesModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setSubtitles={setSubtitles}
      />
    </Page>
  );
};

const Container = styled(Box)({
  height: '60%',
});

const JumbotronContainer = styled.View({
  width: '60%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: 20,
});

const Jumbotron = styled.Image({
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});

const Description = styled(Typography)({
  textAlign: 'justify',
});
