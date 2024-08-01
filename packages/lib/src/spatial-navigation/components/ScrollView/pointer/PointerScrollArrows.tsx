import React, { ReactElement, ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

export const PointerScrollArrows = React.memo(
  ({
    ascendingArrow,
    descendingArrowProps,
    ascendingArrowContainerStyle,
    descendingArrow,
    ascendingArrowProps,
    descendingArrowContainerStyle,
  }: {
    ascendingArrow?: ReactElement;
    ascendingArrowProps?: {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    ascendingArrowContainerStyle?: ViewStyle;
    descendingArrow?: ReactNode;
    descendingArrowProps?: {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    descendingArrowContainerStyle?: ViewStyle;
  }) => {
    return (
      <>
        <View
          style={[styles.arrowContainer, descendingArrowContainerStyle]}
          {...descendingArrowProps}
        >
          {descendingArrow}
        </View>
        <View style={ascendingArrowContainerStyle} {...ascendingArrowProps}>
          {ascendingArrow}
        </View>
      </>
    );
  },
);
PointerScrollArrows.displayName = 'PointerScrollArrows';

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
  },
});
