import React from 'react';
import { ViewStyle, ScrollView } from 'react-native';
import { CustomScrollView } from './CustomScrollView/CustomScrollView';
import { CustomScrollViewRef } from './types';

type Props = {
  useCssScroll: boolean;

  horizontal?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollDuration?: number;
  onScroll?: (event: { nativeEvent: { contentOffset: { y: number; x: number } } }) => void;
};

export const AnyScrollView = React.forwardRef<CustomScrollViewRef, Props>(
  ({ useCssScroll, ...props }: Props, ref) => {
    if (useCssScroll) {
      return <CustomScrollView ref={ref} {...props} />;
    }

    return (
      <ScrollView
        ref={ref as React.RefObject<ScrollView>}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        scrollEventThrottle={16}
        {...props}
      />
    );
  },
);

AnyScrollView.displayName = 'AnyScrollView';
