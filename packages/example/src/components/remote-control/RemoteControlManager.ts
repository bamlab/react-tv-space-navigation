import { SupportedKeys } from './SupportedKeys';
import { RemoteControlManagerInterface } from './RemoteControlManager.interface';
import CustomEventEmitter from './CustomEventEmitter';

class RemoteControlManager implements RemoteControlManagerInterface {
  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private eventEmitter = new CustomEventEmitter<{ keyDown: SupportedKeys }>();

  private handleKeyDown = (event: KeyboardEvent) => {
    const mappedKey = {
      ArrowRight: SupportedKeys.Right,
      ArrowLeft: SupportedKeys.Left,
      ArrowUp: SupportedKeys.Up,
      ArrowDown: SupportedKeys.Down,
      Enter: SupportedKeys.Enter,
      Backspace: SupportedKeys.Back,
    }[event.code];

    //For LG WebOs Magic Remote
    if (event.key === 'GoBack') {
      this.eventEmitter.emit('keyDown', SupportedKeys.Back);
    } else {
      if (!mappedKey) {
        return;
      }
      this.eventEmitter.emit('keyDown', mappedKey);
    }
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
