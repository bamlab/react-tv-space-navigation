import { ForwardedRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { VirtualizedListProps } from './VirtualizedList';

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
import { typedForwardRef } from '../../helpers/TypedForwardRef';
import { SpatialNavigationVirtualizedListRef } from '../../types/SpatialNavigationVirtualizedListRef';

const ItemWrapperWithScrollContext = typedMemo(
  <T,>({
    setCurrentlyFocusedItemIndex,
    item,
    index,
    renderItem,
  }: {
    setCurrentlyFocusedItemIndex: (i: number) => void;
    item: T;
    index: number;
    renderItem: VirtualizedListProps<T>['renderItem'];
  }) => {
    const { scrollToNodeIfNeeded: makeParentsScrollToNodeIfNeeded } =
      useSpatialNavigatorParentScroll();

    const scrollToItem: ScrollToNodeCallback = useCallback(
      (newlyFocusedElementRef, additionalOffset) => {
        setCurrentlyFocusedItemIndex(index);
        // We need to propagate the scroll event for parents if we have nested ScrollViews/VirtualizedLists.
        makeParentsScrollToNodeIfNeeded(newlyFocusedElementRef, additionalOffset);
      },
      [makeParentsScrollToNodeIfNeeded, setCurrentlyFocusedItemIndex, index],
    );

    return (
      <SpatialNavigatorParentScrollContext.Provider value={scrollToItem}>
        {renderItem({ item, index })}
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

const useRemotePointerVirtualizedListScrollProps = <T,>({
  setCurrentlyFocusedItemIndex,
  scrollInterval,
  data,
}: {
  setCurrentlyFocusedItemIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollInterval: number;
  data: T[];
}) => {
  const {
    deviceType,
    deviceTypeRef,
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
    deviceTypeRef,
  };
};

/**
 * This component wraps every item of a virtualizedList in a scroll handling context.
 */
export const SpatialNavigationVirtualizedListWithScroll = typedMemo(
  typedForwardRef(
    <T,>(
      props: SpatialNavigationVirtualizedListWithScrollProps<T> & PointerScrollProps,
      ref: ForwardedRef<SpatialNavigationVirtualizedListRef>,
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
      const spatialNavigator = useSpatialNavigator();
      const { deviceType, deviceTypeRef, descendingArrowProps, ascendingArrowProps, idRef } =
        useRemotePointerVirtualizedListScrollProps({
          setCurrentlyFocusedItemIndex,
          scrollInterval,
          data,
        });

      const setCurrentlyFocusedItemIndexCallback = useCallback(
        (index: number) => {
          deviceTypeRef.current === 'remoteKeys' ? setCurrentlyFocusedItemIndex(index) : null;
        },
        [deviceTypeRef],
      );

      const scrollTo = useCallback((index: number) => {
        if (idRef.current) {
          const newId = idRef.current.getNthVirtualNodeID(index);
          spatialNavigator.grabFocusDeferred(newId);
        }
      }, [idRef, spatialNavigator]);

      useImperativeHandle(
        ref,
        () => ({
          focus: (index: number) => {
            setCurrentlyFocusedItemIndex(index);
            scrollTo(index);
          },
          scrollTo,
          currentlyFocusedItemIndex,
        }),
        [currentlyFocusedItemIndex, scrollTo],
      );

      const renderWrappedItem: typeof props.renderItem = useCallback(
        ({ item, index }) => (
          <ItemWrapperWithScrollContext
            setCurrentlyFocusedItemIndex={setCurrentlyFocusedItemIndexCallback}
            renderItem={renderItem}
            item={item}
            index={index}
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
  ),
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
