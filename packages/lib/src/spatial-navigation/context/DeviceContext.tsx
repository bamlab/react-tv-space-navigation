import { createContext, useContext, useEffect, useRef, useState } from 'react';

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

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [deviceType, setDeviceType] = useState<Device>('remotePointer');
  const scrollingId = useRef<NodeJS.Timer | null>(null);

  const setScrollingIntervalId = (id: NodeJS.Timer | null) => {
    if (scrollingId.current) {
      clearInterval(scrollingId.current);
    }
    scrollingId.current = id;
  };

  const getScrollingIntervalId = () => scrollingId.current;

  useEffect(() => {
    const callback = () => {
      setDeviceType('remotePointer');
    };

    if (deviceType === 'remotePointer') return;

    window.addEventListener('mousemove', callback);
    return () => window.removeEventListener('mousemove', callback);
  }, [deviceType]);

  return (
    <DeviceContext.Provider
      value={{
        deviceType,
        setDeviceType,
        getScrollingIntervalId,
        setScrollingIntervalId,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
