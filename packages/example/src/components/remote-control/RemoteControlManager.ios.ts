import { SupportedKeys } from './SupportedKeys';
import { HWEvent, TVEventHandler } from 'react-native';
import { RemoteControlManagerInterface } from './RemoteControlManager.interface';
import CustomEventEmitter from './CustomEventEmitter';

class RemoteControlManager implements RemoteControlManagerInterface {
  constructor() {
    TVEventHandler.addListener(this.handleKeyDown);
  }

  private eventEmitter = new CustomEventEmitter<{ keyDown: SupportedKeys }>();

  private handleKeyDown = (evt: HWEvent) => {
    if (!evt) return;

    const mappedKey = {
      right: SupportedKeys.Right,
      left: SupportedKeys.Left,
      up: SupportedKeys.Up,
      down: SupportedKeys.Down,
      select: SupportedKeys.Enter,
    }[evt.eventType];

    if (!mappedKey) {
      return;
    }

    this.eventEmitter.emit('keyDown', mappedKey);
  };

  addKeydownListener = (listener: (event: SupportedKeys) => boolean) => {
    this.eventEmitter.on('keyDown', listener);
    return listener;
  };

  removeKeydownListener = (listener: (event: SupportedKeys) => boolean) => {
    this.eventEmitter.off('keyDown', listener);
  };

  emitKeyDown = (key: SupportedKeys) => {
    this.eventEmitter.emit('keyDown', key);
  };
}

export default new RemoteControlManager();
