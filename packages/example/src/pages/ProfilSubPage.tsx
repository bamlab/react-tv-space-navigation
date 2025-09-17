import React from 'react';
import { Box } from '../design-system/components/Box';
import { Spacer } from '../design-system/components/Spacer';
import {
  ProgramListWithTitle,
  ProgramListWithTitleAndVariableSizes,
} from '../modules/program/view/ProgramListWithTitle';
import { BottomArrow, TopArrow } from '../design-system/components/Arrows';
import { StyleSheet } from 'react-native';
import { SpatialNavigationScrollView, SpatialNavigationView } from 'react-tv-space-navigation';
import { Button } from '../design-system/components/Button';

export const ProfileSubPage = () => (
  <SpatialNavigationView direction="vertical">
    <Box padding="$10">
      <Button label="Blablabla some actions" />
      <Button label="Blablabla some actions" />
      <Button label="Log-out" />
    </Box>
  </SpatialNavigationView>
);

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
