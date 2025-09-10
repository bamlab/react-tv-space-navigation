import { SpatialNavigationNode, SpatialNavigationView } from 'react-tv-space-navigation-rtl';
import { Page } from '../components/Page';
import { Button } from '../design-system/components/Button';
import { Typography } from '../design-system/components/Typography';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AsynchronousContent = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await sleep(1000);
    setIsLoading(false);

    setShouldShow((prev) => !prev);
  };

  return (
    <Page>
      <Box padding={'$8'}>
        <Typography>
          {
            'Here are some details about a common pitfall with this library: how do I show/hide focusable elements properly?'
          }
        </Typography>
        <Typography>{'Use this button to trigger an asynchronous show/hide'}</Typography>
        <SpatialNavigationView direction="horizontal">
          <Button label={shouldShow ? 'Hide' : 'Show'} onSelect={toggle} />
          <Spacer gap="$8" direction="horizontal" />
          {isLoading && <ActivityIndicator color="white" size={'large'} />}
        </SpatialNavigationView>
        <Spacer gap="$8" />
        <Typography>
          {
            'Then, try out the focus below. Focus should not be messed up after asynchronous modifications :)'
          }
        </Typography>
        <StyledNavigationRow direction="horizontal">
          <Button label="First button" />
          <SpatialNavigationNode>
            {shouldShow ? <Button label="Second button (asynchronously showed)" /> : <></>}
          </SpatialNavigationNode>
          <Button label="Third button" />
        </StyledNavigationRow>

        <Typography>Check out the code to understand how it is done.</Typography>
      </Box>
    </Page>
  );
};

const StyledNavigationRow = styled(SpatialNavigationView)({
  gap: 40,
});
