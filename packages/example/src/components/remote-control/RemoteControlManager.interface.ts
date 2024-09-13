import { SupportedKeys } from './SupportedKeys';

export interface RemoteControlManagerInterface {
  addKeydownListener: (listener: (event: SupportedKeys) => boolean) => void;
  removeKeydownListener: (listener: (event: SupportedKeys) => boolean) => void;
  emitKeyDown: (key: SupportedKeys) => void;
}
