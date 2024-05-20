import { RefObject } from 'react';
import { ScrollViewRef } from '../components/CustomScrollView';

export type Props = {
  newlyFocusedElementDistanceToLeftRelativeToLayout: number;
  newlyFocusedElementDistanceToTopRelativeToLayout: number;
  horizontal?: boolean;
  offsetFromStart: number;
  scrollViewRef: RefObject<ScrollViewRef>;
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
      value: newlyFocusedElementDistanceToLeftRelativeToLayout - offsetFromStart,
      // @todo make this a props of the component
      animated: true,
    });
  } else {
    scrollViewRef?.current?.scrollTo({
      value: newlyFocusedElementDistanceToTopRelativeToLayout - offsetFromStart,
      // @todo make this a props of the component
      animated: true,
    });
  }
};
