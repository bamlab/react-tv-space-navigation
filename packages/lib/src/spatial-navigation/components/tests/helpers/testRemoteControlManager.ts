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

  public handleUp = async () => {
    await act(async () => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Up);
      await jest.runAllTimersAsync();
    });
    await act(async () => jest.runAllTimersAsync());
  };

  public handleDown = async () => {
    await act(async () => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Down);
    });
    await act(async () => jest.runAllTimersAsync());
  };

  public handleLeft = async () => {
    await act(async () => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Left);
    });
    await act(async () => jest.runAllTimersAsync());
  };

  public handleRight = async () => {
    await act(async () => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Right);
    });
    await act(async () => jest.runAllTimersAsync());
  };

  public handleEnter = async () => {
    await act(async () => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Enter);
    });
    await act(async () => jest.runAllTimersAsync());
  };

  public handleBackSpace = async () => {
    await act(async () => {
      this.eventEmitter.emit('keyDown', SupportedKeys.Back);
    });
    await act(async () => jest.runAllTimersAsync());
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
