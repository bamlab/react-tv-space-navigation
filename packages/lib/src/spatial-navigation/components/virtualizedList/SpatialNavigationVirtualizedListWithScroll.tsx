import { useCallback, useMemo, useRef, useState } from 'react';
import { VirtualizedListProps, ItemWithIndex } from './VirtualizedList';

import {
  SpatialNavigationVirtualizedListWithVirtualNodes,
  SpatialNavigationVirtualizedListWithVirtualNodesProps,
  SpatialNavigationVirtualizedListWithVirtualNodesRef,
} from './SpatialNavigationVirtualizedListWithVirtualNodes';
import {
  ScrollToNodeCallback,
  SpatialNavigatorParentScrollContext,
  useSpatialNavigatorParentScroll,
} from '../../context/ParentScrollContext';
import { typedMemo } from '../../helpers/TypedMemo';
import { useSpatialNavigationDeviceType } from '../../context/DeviceContext';
import { View, Platform, ViewStyle } from 'react-native';
import { useSpatialNavigator } from '../../context/SpatialNavigatorContext';
import React from 'react';

const ItemWrapperWithScrollContext = typedMemo(
  <T extends ItemWithIndex>({
    setCurrentlyFocusedItemIndex,
    item,
    renderItem,
  }: {
    setCurrentlyFocusedItemIndex: (i: number) => void;
    item: T;
    renderItem: VirtualizedListProps<T>['renderItem'];
  }) => {
    const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
      useSpatialNavigatorParentScroll();

    const scrollToItem: ScrollToNodeCallback = useCallback(
      (newlyFocusedElementRef) => {
        setCurrentlyFocusedItemIndex(item.index);
        // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
        makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef);
      },
      [makeParentsScrollToNodeIfNeeded, setCurrentlyFocusedItemIndex, item.index],
    );

    return (
      <SpatialNavigatorParentScrollContext.Provider value={scrollToItem}>
        {renderItem({ item })}
      </SpatialNavigatorParentScrollContext.Provider>
    );
  },
);
ItemWrapperWithScrollContext.displayName = 'ItemWrapperWithScrollContext';

export type SpatialNavigationVirtualizedListWithScrollProps<T> = Omit<
  SpatialNavigationVirtualizedListWithVirtualNodesProps<T>,
  'currentlyFocusedItemIndex'
>;

export type PointerScrollProps = {
  descendingArrow?: React.ReactElement;
  descendingArrowContainerStyle?: ViewStyle;
  ascendingArrow?: React.ReactElement;
  ascendingArrowContainerStyle?: ViewStyle;
  scrollInterval?: number;
};

const useRemotePointerVirtualizedListScrollProps = ({
  setCurrentlyFocusedItemIndex,
  scrollInterval,
  data,
}: {
  setCurrentlyFocusedItemIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollInterval: number;
  data: ItemWithIndex[];
}) => {
  const {
    deviceType,
    getScrollingIntervalId: getScrollingId,
    setScrollingIntervalId: setScrollingId,
  } = useSpatialNavigationDeviceType();

  const navigator = useSpatialNavigator();

  const idRef = useRef<SpatialNavigationVirtualizedListWithVirtualNodesRef>(null);

  const grabFocus = navigator.grabFocus;

  const onMouseEnterDescending = useCallback(() => {
    const callback = () => {
      setCurrentlyFocusedItemIndex((index) => {
        if (index > 0) {
          if (idRef.current) grabFocus(idRef.current.getNthVirtualNodeID(index - 1));
          return index - 1;
        } else {
          return index;
        }
      });
    };

    const id = setInterval(() => {
      callback();
    }, scrollInterval);
    setScrollingId(id);
  }, [grabFocus, scrollInterval, setCurrentlyFocusedItemIndex, setScrollingId]);

  const onMouseLeave = useCallback(() => {
    const intervalId = getScrollingId();
    if (intervalId) {
      clearInterval(intervalId);
      setScrollingId(null);
    }
  }, [getScrollingId, setScrollingId]);

  const onMouseEnterAscending = useCallback(() => {
    const callback = () => {
      setCurrentlyFocusedItemIndex((index) => {
        if (index < data.length - 1) {
          if (idRef.current) {
            grabFocus(idRef.current.getNthVirtualNodeID(index + 1));
          }
          return index + 1;
        } else {
          return index;
        }
      });
    };
    const id = setInterval(() => {
      callback();
    }, scrollInterval);
    setScrollingId(id);
  }, [data.length, grabFocus, scrollInterval, setCurrentlyFocusedItemIndex, setScrollingId]);

  const descendingArrowProps = useMemo(
    () =>
      Platform.select({
        web: {
          onMouseEnter: onMouseEnterDescending,
          onMouseLeave: onMouseLeave,
        },
      }),
    [onMouseEnterDescending, onMouseLeave],
  );

  const ascendingArrowProps = useMemo(
    () =>
      Platform.select({
        web: {
          onMouseEnter: onMouseEnterAscending,
          onMouseLeave: onMouseLeave,
        },
      }),
    [onMouseEnterAscending, onMouseLeave],
  );

  return {
    descendingArrowProps,
    ascendingArrowProps,
    idRef,
    deviceType,
  };
};

/**
 * This component wraps every item of a virtualizedList in a scroll handling context.
 */
export const SpatialNavigationVirtualizedListWithScroll = typedMemo(
  <T extends ItemWithIndex>(
    props: SpatialNavigationVirtualizedListWithScrollProps<T> & PointerScrollProps,
  ) => {
    const {
      data,
      renderItem,
      descendingArrow: descendingArrow,
      ascendingArrow: ascendingArrow,
      descendingArrowContainerStyle,
      ascendingArrowContainerStyle,
      scrollInterval = 100,
    } = props;
    const [currentlyFocusedItemIndex, setCurrentlyFocusedItemIndex] = useState(0);
    const { deviceType, descendingArrowProps, ascendingArrowProps, idRef } =
      useRemotePointerVirtualizedListScrollProps({
        setCurrentlyFocusedItemIndex,
        scrollInterval,
        data,
      });

    const setCurrentlyFocusedItemIndexCallback = useCallback(
      (index: number) => {
        deviceType === 'remoteKeys' ? setCurrentlyFocusedItemIndex(index) : null;
      },
      [deviceType],
    );

    const renderWrappedItem: typeof props.renderItem = useCallback(
      ({ item }) => (
        <ItemWrapperWithScrollContext
          setCurrentlyFocusedItemIndex={setCurrentlyFocusedItemIndexCallback}
          renderItem={renderItem}
          item={item}
        />
      ),
      [setCurrentlyFocusedItemIndexCallback, renderItem],
    );

    return (
      <>
        <SpatialNavigationVirtualizedListWithVirtualNodes
          {...props}
          getNodeIdRef={idRef}
          currentlyFocusedItemIndex={currentlyFocusedItemIndex}
          renderItem={renderWrappedItem}
        />
        {deviceType === 'remotePointer' ? (
          <PointerScrollArrows
            descendingArrowContainerStyle={descendingArrowContainerStyle}
            descendingArrowProps={descendingArrowProps}
            descendingArrow={descendingArrow}
            ascendingArrowContainerStyle={ascendingArrowContainerStyle}
            ascendingArrowProps={ascendingArrowProps}
            ascendingArrow={ascendingArrow}
          />
        ) : undefined}
      </>
    );
  },
);
SpatialNavigationVirtualizedListWithScroll.displayName =
  'SpatialNavigationVirtualizedListWithScroll';

const PointerScrollArrows = React.memo(
  ({
    ascendingArrow,
    ascendingArrowProps,
    ascendingArrowContainerStyle,
    descendingArrow,
    descendingArrowProps,
    descendingArrowContainerStyle,
  }: PointerScrollProps & {
    descendingArrowProps?: { onMouseEnter: () => void; onMouseLeave: () => void };
    ascendingArrowProps?: { onMouseEnter: () => void; onMouseLeave: () => void };
  }) => {
    return (
      <>
        <View style={descendingArrowContainerStyle} {...descendingArrowProps}>
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
