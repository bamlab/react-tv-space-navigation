import styled from '@emotion/native';
import { SpatialNavigationNode } from 'react-tv-space-navigation';
import { TextInput as RNTextInput } from 'react-native';
import { useRef } from 'react';
import { Typography } from './Typography';
import { Box } from './Box';

/**
 * It works, but it's not perfect.
 * If you press the back button on Android to dismiss the keyboard,
 * focus is in a weird state where we keep listening to remote control arrow movements.
 * Ideally, we'd like to always remove the native focus when the keyboard is dismissed.
 */
export const TextInput = ({ label }: { label: string }) => {
  const ref = useRef<RNTextInput>(null);

  return (
    <Box>
      <Typography>{label}</Typography>
      <SpatialNavigationNode
        isFocusable
        onSelect={() => {
          ref?.current?.focus();
        }}
        onFocus={() => {
          ref?.current?.focus();
        }}
        onBlur={() => {
          ref?.current?.blur();
        }}
      >
        {({ isFocused }) => <StyledTextInput ref={ref} isFocused={isFocused} />}
      </SpatialNavigationNode>
    </Box>
  );
};

const StyledTextInput = styled(RNTextInput)<{ isFocused: boolean }>(({ isFocused, theme }) => ({
  borderColor: isFocused ? 'white' : 'black',
  borderWidth: 2,
  borderRadius: 8,
  color: 'white',
  backgroundColor: theme.colors.background.mainHover,
}));
