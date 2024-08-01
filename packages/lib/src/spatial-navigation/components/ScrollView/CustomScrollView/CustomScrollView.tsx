/* eslint-disable react-native/no-inline-styles */
import { Animated, LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { CustomScrollViewRef } from '../types';
import { useStyle } from './CustomScrollView.hooks';

type Props = {
  horizontal?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollDuration?: number;
  onScroll?: (event: { nativeEvent: { contentOffset: { y: number; x: number } } }) => void;
  testID?: string;
};

export const CustomScrollView = forwardRef<CustomScrollViewRef, Props>(
  (
    {
      style,
      contentContainerStyle,
      children,
      onScroll,
      horizontal = false,
      scrollDuration = 200,
      testID,
    },
    ref,
  ) => {
    const [scroll, setScroll] = useState(0);
    const contentSize = useRef(0);
    const parentSize = useRef(0);

    const animationStyle = useStyle(horizontal, scroll, scrollDuration);

    const onContentContainerLayout = useCallback(
      (event: LayoutChangeEvent) => {
        contentSize.current = event.nativeEvent.layout[horizontal ? 'width' : 'height'];
      },
      [horizontal],
    );

    const onParentLayout = useCallback(
      (event: LayoutChangeEvent): void => {
        parentSize.current = event.nativeEvent.layout[horizontal ? 'width' : 'height'];
      },
      [horizontal],
    );

    const updateRef = (currentRef: View | null) => {
      if (!currentRef) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- couldn't find another way than a mutation... copying the ref makes it not work with measureLayout anymore
      const newRef = currentRef as any as CustomScrollViewRef;
      newRef.getInnerViewNode = () => currentRef;
      newRef.scrollTo = ({ x, y }) => {
        let scrollValue = 0;
        if (parentSize.current < contentSize.current) {
          if (x !== undefined) {
            scrollValue = Math.min(Math.max(0, x), contentSize.current);
          } else if (y !== undefined) {
            scrollValue = Math.min(Math.max(0, y), contentSize.current);
          }
          // Prevent from scrolling too far when reaching the end
          scrollValue = Math.min(scrollValue, contentSize.current - parentSize.current);
        }
        setScroll(scrollValue);
        const event = { nativeEvent: { contentOffset: { y: scrollValue, x: scrollValue } } };
        onScroll?.(event);
      };

      if (typeof ref === 'function') ref?.(newRef);
      else if (ref) ref.current = newRef;
    };

    return (
      <View
        style={[
          { flex: 1, overflow: 'hidden', flexDirection: horizontal ? 'row' : 'column' },
          style,
        ]}
        onLayout={onParentLayout}
        testID={testID}
      >
        <Animated.View
          onLayout={onContentContainerLayout}
          style={[contentContainerStyle, animationStyle]}
          ref={updateRef}
          testID={testID ? `${testID}-content` : undefined}
        >
          {children}
        </Animated.View>
      </View>
    );
  },
);
CustomScrollView.displayName = 'CustomScrollView';
