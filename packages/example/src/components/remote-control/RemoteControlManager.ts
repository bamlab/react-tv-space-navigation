import { SupportedKeys } from './SupportedKeys';
import { RemoteControlManagerInterface } from './RemoteControlManager.interface';
import CustomEventEmitter from './CustomEventEmitter';

const LONG_PRESS_DURATION = 500;

class RemoteControlManager implements RemoteControlManagerInterface {
  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private eventEmitter = new CustomEventEmitter<{ keyDown: SupportedKeys }>();

  private isEnterKeyDown = false;
  private longEnterTimeout: NodeJS.Timeout | null = null;

  private handleLongEnter = () => {
    this.longEnterTimeout = setTimeout(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.LongEnter);
      this.longEnterTimeout = null;
    }, LONG_PRESS_DURATION);
  };

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

    if (mappedKey === SupportedKeys.Enter) {
      if (!this.isEnterKeyDown) {
        this.isEnterKeyDown = true;
        this.handleLongEnter();
      }
      return;
    }

    this.eventEmitter.emit('keyDown', mappedKey);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const mappedKey = {
      Enter: SupportedKeys.Enter,
    }[event.code];

    if (!mappedKey) {
      return;
    }

    if (mappedKey === SupportedKeys.Enter) {
      this.isEnterKeyDown = false;
      if (this.longEnterTimeout) {
        clearTimeout(this.longEnterTimeout);
        this.eventEmitter.emit('keyDown', mappedKey);
      }
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
