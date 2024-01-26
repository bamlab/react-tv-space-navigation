import mitt from 'mitt';
import { SupportedKeys } from './SupportedKeys';
import { RemoteControlManagerInterface } from './RemoteControlManager.interface';

class RemoteControlManager implements RemoteControlManagerInterface {
  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private eventEmitter = mitt<{ keyDown: SupportedKeys }>();

  private handleKeyDown = (event: KeyboardEvent) => {
    const mappedKey = {
      ArrowRight: SupportedKeys.Right,
      ArrowLeft: SupportedKeys.Left,
      ArrowUp: SupportedKeys.Up,
      ArrowDown: SupportedKeys.Down,
      Enter: SupportedKeys.Enter,
      Backspace: SupportedKeys.Back,
    }[event.code];

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
}

export default new RemoteControlManager();
