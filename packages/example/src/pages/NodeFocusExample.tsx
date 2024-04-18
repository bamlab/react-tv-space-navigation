import styled from '@emotion/native';
import {
  DefaultFocus,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import { Page } from '../components/Page';
import '../components/configureRemoteControl';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { Typography } from '../design-system/components/Typography';
import { BottomArrow, TopArrow } from '../design-system/components/Arrows';
import { Button } from '../design-system/components/Button';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export const NodeFocusExample = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Page>
      <TitleContainer>
        <Title variant="title">Hoppix</Title>
      </TitleContainer>
      <DefaultFocus>
        <SpatialNavigationScrollView
          offsetFromStart={140}
          ascendingArrow={<BottomArrow />}
          ascendingArrowContainerStyle={styles.bottomArrowContainer}
          descendingArrow={<TopArrow />}
          descendingArrowContainerStyle={styles.topArrowContainer}
        >
          <Box padding="$10" alignItems="center">
            <Typography variant="title" fontWeight="strong">
              Without Focus Assign
            </Typography>
            <Spacer gap="$15" />
            <SpatialNavigationScrollView>
              <ButtonsContainer direction="horizontal">
                {!isLoading && <Button label="First" />}
                <Spacer gap="$8" direction="horizontal" />
                <Button label="Second" />
                <Spacer gap="$8" direction="horizontal" />
                <Button label="Third" />
              </ButtonsContainer>
            </SpatialNavigationScrollView>
            <Typography variant="body" fontWeight="regular">
              The first button has the wrong focus. It is accessible as the last right element,
              which isn&apos;t correct.
            </Typography>
          </Box>

          <Box padding="$10" alignItems="center">
            <Typography variant="title" fontWeight="strong">
              With Focus Assign
            </Typography>
            <Spacer gap="$15" />
            <SpatialNavigationScrollView>
              <ButtonsContainer direction="horizontal">
                {!isLoading && <Button index={0} label="First" />}
                <Spacer gap="$8" direction="horizontal" />
                <Button index={1} label="Second" />
                <Spacer gap="$8" direction="horizontal" />
                <Button index={2} label="Third" />
              </ButtonsContainer>
            </SpatialNavigationScrollView>
            <Typography variant="body" fontWeight="regular">
              The first button has the correct focus. It is accessible as the first left element,
              which is correct.
            </Typography>
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

const ButtonsContainer = styled(SpatialNavigationView)(() => ({
  padding: 20,
}));

const styles = StyleSheet.create({
  topArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 0,
  },
  bottomArrowContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -15,
    left: 0,
  },
});
