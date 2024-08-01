import styled from '@emotion/native';
import { Text } from 'react-native';
import { SpatialNavigationNode } from '../Node';

export type PropsTestButton = {
  onSelect?: () => void;
  title: string;
};

export const TestButton = ({ onSelect, title }: PropsTestButton) => {
  return (
    <SpatialNavigationNode onSelect={onSelect} isFocusable>
      {({ isFocused }) => (
        <TextContainer
          isFocused={isFocused}
          accessible
          accessibilityState={{ selected: isFocused }}
          accessibilityLabel={title}
          accessibilityHint={title}
          accessibilityRole="button"
        >
          <Text>{title}</Text>
        </TextContainer>
      )}
    </SpatialNavigationNode>
  );
};

const TextContainer = styled.View<{ isFocused: boolean }>(({ isFocused }) => ({
  borderRadius: 100,
  padding: 6,
  backgroundColor: isFocused ? 'red' : 'transparent',
}));
