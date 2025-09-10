import { Direction } from '@bam.tech/lrud';
import config from './components/virtualizedList/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- can't know for sure what the subscriber will be...
type SubscriberType = any;

export interface RemoteControlConfiguration {
  remoteControlSubscriber: (lrudCallback: (direction: Direction | null) => void) => SubscriberType;
  remoteControlUnsubscriber: (subscriber: SubscriberType) => void;
  useRTL?: boolean
}

export let remoteControlSubscriber:
  | RemoteControlConfiguration['remoteControlSubscriber']
  | undefined = undefined;
export let remoteControlUnsubscriber:
  | RemoteControlConfiguration['remoteControlUnsubscriber']
  | undefined = undefined;

export const configureRemoteControl = (options: RemoteControlConfiguration) => {
  remoteControlSubscriber = options.remoteControlSubscriber;
  remoteControlUnsubscriber = options.remoteControlUnsubscriber;
  if (options.useRTL) config.useRTL = true;
};
