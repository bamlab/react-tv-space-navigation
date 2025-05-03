import { RefObject } from 'react';
import { CustomScrollViewRef } from '../components/ScrollView/types';

export type Props = {
  newlyFocusedElementDistanceToLeftRelativeToLayout: number;
  newlyFocusedElementDistanceToTopRelativeToLayout: number;
  horizontal?: boolean;
  offsetFromStart: number;
  scrollViewRef: RefObject<CustomScrollViewRef | null>;
};

export const scrollToNewlyFocusedElement = ({
  newlyFocusedElementDistanceToLeftRelativeToLayout,
  newlyFocusedElementDistanceToTopRelativeToLayout,
  horizontal,
  offsetFromStart,
  scrollViewRef,
}: Props) => {
  if (horizontal) {
    scrollViewRef?.current?.scrollTo({
      x: newlyFocusedElementDistanceToLeftRelativeToLayout - offsetFromStart,
      // @todo make this a props of the component
      animated: true,
    });
  } else {
    scrollViewRef?.current?.scrollTo({
      y: newlyFocusedElementDistanceToTopRelativeToLayout - offsetFromStart,
      // @todo make this a props of the component
      animated: true,
    });
  }
};
