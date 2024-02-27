import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';

type Device = 'remoteKeys' | 'remotePointer';

interface DeviceContextProps {
  deviceType: Device;
  setDeviceType: (deviceType: Device) => void;
  getScrollingIntervalId: () => NodeJS.Timer | null;
  setScrollingIntervalId: (scrollingId: NodeJS.Timer | null) => void;
}

export const DeviceContext = createContext<DeviceContextProps>({
  deviceType: 'remoteKeys',
  setDeviceType: () => {},
  getScrollingIntervalId: () => null,
  setScrollingIntervalId: () => {},
});

interface DeviceProviderProps {
  children: React.ReactNode;
}

export const SpatialNavigationDeviceTypeProvider = ({ children }: DeviceProviderProps) => {
  const [deviceType, setDeviceType] = useState<Device>('remoteKeys');
  const scrollingId = useRef<NodeJS.Timer | null>(null);

  const setScrollingIntervalId = useCallback((id: NodeJS.Timer | null) => {
    if (scrollingId.current) {
      clearInterval(scrollingId.current);
    }
    scrollingId.current = id;
  }, []);

  const getScrollingIntervalId = useCallback(() => scrollingId.current, []);

  useEffect(() => {
    if (deviceType === 'remotePointer' || Platform.OS !== 'web') return;

    const callback = () => {
      setDeviceType('remotePointer');
    };

    window.addEventListener('mousemove', callback);
    return () => window.removeEventListener('mousemove', callback);
  }, [deviceType]);

  const value = useMemo(
    () => ({
      deviceType,
      setDeviceType,
      getScrollingIntervalId,
      setScrollingIntervalId,
    }),
    [deviceType, setDeviceType, getScrollingIntervalId, setScrollingIntervalId],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};

export const useSpatialNavigationDeviceType = () => useContext(DeviceContext);
