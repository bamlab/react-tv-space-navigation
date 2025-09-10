import React from 'react';
import { ViewStyle, ScrollView, ScrollViewProps } from 'react-native';
import { CustomScrollView } from './CustomScrollView/CustomScrollView';
import { CustomScrollViewRef } from './types';

type Props = {
  useNativeScroll: boolean;
  horizontal?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollDuration?: number;
  onScroll?: (event: { nativeEvent: { contentOffset: { y: number; x: number } } }) => void;
  testID?: string;
} & ScrollViewProps;

export const AnyScrollView = React.forwardRef<CustomScrollViewRef, Props>(
  ({ useNativeScroll, ...props }: Props, ref) => {
    if (useNativeScroll) {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          scrollEventThrottle={16}
          {...props}
          ref={ref as React.RefObject<ScrollView>}
        />
      );
    }

    return <CustomScrollView ref={ref} {...props} />;
  },
);

AnyScrollView.displayName = 'AnyScrollView';
