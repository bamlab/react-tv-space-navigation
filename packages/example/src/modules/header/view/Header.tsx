/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Button } from '../../../design-system/components/Button';
import { Typography } from '../../../design-system/components/Typography';
import { SpatialNavigationNode } from 'react-tv-space-navigation';
import { Spacer } from '../../../design-system/components/Spacer';
import { Image } from 'react-native';
import styled from '@emotion/native';

interface HeaderProps {
  title: string;
  description: string;
  verticalSize: number;
}

const imageSource = require('../assets/rabbitLarge.png');

export const Header = ({ title, description, verticalSize }: HeaderProps) => {
  return (
    <SpatialNavigationNode orientation="horizontal">
      <Container height={verticalSize}>
        <InformationContainer>
          <Typography variant="title">{title}</Typography>
          <Spacer gap={'$6'} />
          <Descritption variant="body">{description}</Descritption>
          <ButtonContainer>
            <Button label="Play random" onSelect={() => console.log('Randomed!')} />
            <Button label="Add to favorites" onSelect={() => console.log('Favorited!')} />
          </ButtonContainer>
        </InformationContainer>
        <ImageContainer>
          <ProgramImage source={imageSource} />
        </ImageContainer>
      </Container>
    </SpatialNavigationNode>
  );
};

const InformationContainer = styled.View({
  width: '48%',
});

const ButtonContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacings.$6,
}));

const ImageContainer = styled.View({
  width: '48%',
});

const Descritption = styled(Typography)({
  flex: 1,
});

const Container = styled.View<{ height: number }>(({ height, theme }) => ({
  height: height,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacings.$6,
}));

const ProgramImage = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 20,
});
