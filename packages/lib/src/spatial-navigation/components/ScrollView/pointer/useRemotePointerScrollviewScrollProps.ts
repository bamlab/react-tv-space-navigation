import React, { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { useSpatialNavigationDeviceType } from '../../../context/DeviceContext';
import { CustomScrollViewRef } from '../types';

export const useRemotePointerScrollviewScrollProps = ({
  pointerScrollSpeed,
  scrollY,
  scrollViewRef,
}: {
  pointerScrollSpeed: number;
  scrollY: React.MutableRefObject<number>;
  scrollViewRef: React.MutableRefObject<CustomScrollViewRef | null>;
}) => {
  const {
    deviceType,
    deviceTypeRef,
    getScrollingIntervalId: getScrollingId,
    setScrollingIntervalId: setScrollingId,
  } = useSpatialNavigationDeviceType();

  const onMouseEnterTop = useCallback(() => {
    if (deviceTypeRef.current === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        currentScrollPosition -= pointerScrollSpeed;
        scrollViewRef.current?.scrollTo({
          y: currentScrollPosition,
          animated: false,
        });
      }, 10);
      setScrollingId(id);
    }
  }, [deviceTypeRef, pointerScrollSpeed, scrollY, scrollViewRef, setScrollingId]);

  const onMouseEnterBottom = useCallback(() => {
    if (deviceTypeRef.current === 'remotePointer') {
      let currentScrollPosition = scrollY.current;
      const id = setInterval(() => {
        currentScrollPosition += pointerScrollSpeed;
        scrollViewRef.current?.scrollTo({
          y: currentScrollPosition,
          animated: false,
        });
      }, 10);
      setScrollingId(id);
    }
  }, [deviceTypeRef, pointerScrollSpeed, scrollY, scrollViewRef, setScrollingId]);

  const onMouseLeave = useCallback(() => {
    if (deviceTypeRef.current === 'remotePointer') {
      const intervalId = getScrollingId();
      if (intervalId) {
        clearInterval(intervalId);
        setScrollingId(null);
      }
    }
  }, [deviceTypeRef, getScrollingId, setScrollingId]);

  const ascendingArrowProps = useMemo(
    () =>
      Platform.select({
        web: { onMouseEnter: onMouseEnterBottom, onMouseLeave: onMouseLeave },
      }),
    [onMouseEnterBottom, onMouseLeave],
  );

  const descendingArrowProps = useMemo(
    () =>
      Platform.select({
        web: { onMouseEnter: onMouseEnterTop, onMouseLeave: onMouseLeave },
      }),
    [onMouseEnterTop, onMouseLeave],
  );

  return {
    deviceType,
    deviceTypeRef,
    ascendingArrowProps,
    descendingArrowProps,
  };
};
