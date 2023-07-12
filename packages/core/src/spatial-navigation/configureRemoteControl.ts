import { Direction } from 'lrud';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- can't know for sure what the subscriber will be...
type SubscriberType = any;

export interface RemoteControlConfiguration {
  remoteControlSubscriber: (lrudCallback: (direction: Direction) => void) => SubscriberType;
  remoteControlUnsubscriber: (subscriber: SubscriberType) => void;
}

export let remoteControlSubscriber: RemoteControlConfiguration['remoteControlSubscriber'] =
  undefined;
export let remoteControlUnsubscriber: RemoteControlConfiguration['remoteControlUnsubscriber'] =
  undefined;

export const configureRemoteControl = (options: RemoteControlConfiguration) => {
  remoteControlSubscriber = options.remoteControlSubscriber;
  remoteControlUnsubscriber = options.remoteControlUnsubscriber;
};
