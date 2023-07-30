import { act } from '@testing-library/react-native';
import mitt from 'mitt';

export enum SupportedKeys {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
  Enter = 'Enter',
  Back = 'Back',
}

class TestRemoteControlManager {
  private eventEmitter = mitt<{ keyDown: SupportedKeys }>();

  public handleUp = () => {
    act(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Up);
    });
  };

  public handleDown = () => {
    act(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Down);
    });
  };

  public handleLeft = () => {
    act(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Left);
    });
  };

  public handleRight = () => {
    act(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Right);
    });
  };

  public handleEnter = () => {
    act(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Enter);
    });
  };

  public handleBackSpace = () => {
    act(() => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Back);
    });
  };

  addKeydownListener = (listener: (event: SupportedKeys) => void) => {
    this.eventEmitter.on('keyDown', listener);
    return listener;
  };

  removeKeydownListener = (listener: (event: SupportedKeys) => void) => {
    this.eventEmitter.off('keyDown', listener);
  };
}

export default new TestRemoteControlManager();
