/* eslint-disable react-native/no-inline-styles */
import { Animated, LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { forwardRef, useCallback, useRef, useState } from 'react';

type Props = {
  horizontal?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  scrollDuration?: number;
  onScroll?: (value: number) => void;
};

export type ScrollViewRef = Omit<View, 'setState' | 'forceUpdate' | 'render'> & {
  getInnerViewNode: () => any;
  scrollTo: (args: { value: number; animated: boolean }) => void;
};

export const CustomScrollView = forwardRef<ScrollViewRef, Props>(
  (
    { style, containerStyle, children, onScroll, horizontal = false, scrollDuration = 200 },
    ref,
  ) => {
    const [scroll, setScroll] = useState({ value: 0, animated: false });
    const contentSize = useRef(0);

    return (
      <View
        style={[style, { overflow: 'hidden' }]}
        ref={(currentRef) => {
          if (!currentRef) return;

          const newRef: ScrollViewRef = {
            ...currentRef,
            getInnerViewNode: () => currentRef,
            scrollTo: ({ value, animated }) => {
              const scrollValue = Math.min(Math.max(0, value), contentSize.current);
              // const scrollValue = Math.max(0, value);
              setScroll({ value: scrollValue, animated });
              onScroll?.(scrollValue);
            },
          };

          if (typeof ref === 'function') ref?.(newRef);
          else if (ref) ref.current = newRef;
        }}
      >
        <Animated.View
          onLayout={useCallback(
            (event: LayoutChangeEvent) => {
              contentSize.current = event.nativeEvent.layout[horizontal ? 'height' : 'width'];
            },
            [horizontal],
          )}
          style={[
            {
              transform: [
                horizontal ? { translateX: -scroll.value } : { translateY: -scroll.value },
                { translateZ: 0 },
              ],
            },
            scroll.animated
              ? {
                  transitionDuration: `${scrollDuration}ms`,
                  transitionProperty: 'transform',
                  transitionTimingFunction: 'ease-out',
                  transform: [
                    horizontal ? { translateX: -scroll.value } : { translateY: -scroll.value },
                    { translateZ: 0 },
                  ],
                  willChange: 'transform',
                }
              : undefined,
            containerStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    );
  },
);
CustomScrollView.displayName = 'CustomScrollView';
