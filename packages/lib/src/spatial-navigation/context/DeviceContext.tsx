import { createContext, useContext, useEffect, useState } from 'react';

type Device = 'remoteKeys' | 'remotePointer';

interface DeviceContextProps {
  deviceType: Device;
  setDeviceType: (deviceType: Device) => void;
}

export const DeviceContext = createContext<DeviceContextProps>({
  deviceType: 'remoteKeys',
  setDeviceType: () => {},
});

interface DeviceProviderProps {
  children: React.ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [deviceType, setDeviceType] = useState<Device>('remotePointer');

  useEffect(() => {
    const callback = () => {
      setDeviceType('remotePointer');
    };

    if (deviceType === 'remotePointer') return;

    window.addEventListener('mousemove', callback);
    return () => window.removeEventListener('mousemove', callback);
  }, [deviceType]);

  return (
    <DeviceContext.Provider value={{ deviceType, setDeviceType }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
