import mitt from 'mitt';
import { SupportedKeys } from './SupportedKeys';
import KeyEvent from 'react-native-keyevent';
import { RemoteControlManagerInterface } from './RemoteControlManager.interface';

class RemoteControlManager implements RemoteControlManagerInterface {
  constructor() {
    KeyEvent.onKeyDownListener(this.handleKeyDown);
  }

  private eventEmitter = mitt<{ keyDown: SupportedKeys }>();

  private handleKeyDown = (keyEvent: { keyCode: number }) => {
    const mappedKey = {
      21: SupportedKeys.Left,
      22: SupportedKeys.Right,
      20: SupportedKeys.Down,
      19: SupportedKeys.Up,
      66: SupportedKeys.Enter,
      23: SupportedKeys.Enter,
      67: SupportedKeys.Back,
    }[keyEvent.keyCode];

    if (!mappedKey) {
      return;
    }

    this.eventEmitter.emit('keyDown', mappedKey);
  };

  addKeydownListener = (listener: (event: SupportedKeys) => void) => {
    this.eventEmitter.on('keyDown', listener);
    return listener;
  };

  removeKeydownListener = (listener: (event: SupportedKeys) => void) => {
    this.eventEmitter.off('keyDown', listener);
  };

  emitKeyDown = (key: SupportedKeys) => {
    this.eventEmitter.emit('keyDown', key);
  };
}

export default new RemoteControlManager();
