import { createContext, useContext, useState } from 'react';

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
  return (
    <DeviceContext.Provider value={{ deviceType, setDeviceType }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => useContext(DeviceContext);
