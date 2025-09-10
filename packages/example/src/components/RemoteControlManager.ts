import { Platform } from 'react-native';
import RemoteControlManagerAndroid from './remote-control/RemoteControlManager.android';
import { RemoteControlManagerInterface } from './remote-control/RemoteControlManager.interface';
import RemoteControlManagerIos from './remote-control/RemoteControlManager.ios';
import RemoteControlManagerWeb from './remote-control/RemoteControlManager';

function getRemoteControlManager(): RemoteControlManagerInterface {
  switch (Platform.OS) {
    case 'android':
      return new RemoteControlManagerAndroid();

    case 'ios':
      return new RemoteControlManagerIos();

    default:
      return new RemoteControlManagerWeb();
  }
}

export default getRemoteControlManager();
