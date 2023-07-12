import mitt from 'mitt';
import { SupportedKeys } from './SupportedKeys';

class RemoteControlManager {
  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  eventEmitter = mitt();

  handleKeyDown = (event: KeyboardEvent) => {
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
