import { SupportedKeys } from './SupportedKeys';
import { HWEvent, TVEventHandler } from 'react-native';
import { RemoteControlManagerInterface } from './RemoteControlManager.interface';
import CustomEventEmitter from './CustomEventEmitter';
import { BackHandler } from 'react-native';

class RemoteControlManager implements RemoteControlManagerInterface {
  constructor() {
    TVEventHandler.addListener(this.handleKeyDown);
    /**
     * TVEventHandler does not catch native back button presses on Native side
     * 1) Catch native back button presses
     * 2) Emit a custom 'Back' key event to be handled by useKey
     * 3) Prevent default back button behavior
     */
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.emitKeyDown(SupportedKeys.Back);
      return true;
    });
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
      longSelect: SupportedKeys.LongEnter,
      back: SupportedKeys.Back,
    }[evt.eventType];

    if (!mappedKey) {
      return;
    }

    // We only want to handle keydown for long select to avoid triggering the event twice
    if (mappedKey === SupportedKeys.LongEnter && evt.eventKeyAction === 1) {
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
