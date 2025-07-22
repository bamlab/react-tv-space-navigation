import { Direction } from '@bam.tech/lrud';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- can't know for sure what the subscriber will be...
type SubscriberType = any;

export interface RemoteControlConfiguration {
  remoteControlSubscriber: (lrudCallback: (direction: Direction | null) => void) => SubscriberType;
  remoteControlUnsubscriber: (subscriber: SubscriberType) => void;
}

const config: Partial<RemoteControlConfiguration> = {};

export const configureRemoteControl = (options: RemoteControlConfiguration) => {
  config.remoteControlSubscriber = options.remoteControlSubscriber;
  config.remoteControlUnsubscriber = options.remoteControlUnsubscriber;
};

export const getRemoteControlSubscriber = () => config.remoteControlSubscriber;
export const getRemoteControlUnsubscriber = () => config.remoteControlUnsubscriber;
