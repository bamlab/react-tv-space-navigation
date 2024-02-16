import { SupportedKeys } from './SupportedKeys';

export interface RemoteControlManagerInterface {
  addKeydownListener: (listener: (event: SupportedKeys) => void) => void;
  removeKeydownListener: (listener: (event: SupportedKeys) => void) => void;
  emitKeyDown: (key: SupportedKeys) => void;
}
