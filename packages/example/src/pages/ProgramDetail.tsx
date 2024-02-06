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
import { GenericModal } from '../components/GenericModal';

export const ProgramDetail = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'ProgramDetail'>;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
              {/* eslint-disable-next-line no-console */}
              <Button label="Choose subtitles" onSelect={() => setIsModalVisible(true)} />
              <GenericModal isVisible={isModalVisible}>
                <Button label="English" onSelect={() => setIsModalVisible(false)} />
                <Spacer direction="horizontal" gap="$8" />
                <Button label="Spanish" onSelect={() => setIsModalVisible(false)} />
                <Spacer direction="horizontal" gap="$8" />
                <Button label="French" onSelect={() => setIsModalVisible(false)} />
              </GenericModal>
            </Box>
          </DefaultFocus>
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
