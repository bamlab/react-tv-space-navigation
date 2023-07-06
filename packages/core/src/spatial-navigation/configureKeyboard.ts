import { Direction } from 'lrud';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- can't know for sure what the subscriber will be...
type SubscriberType = any;

interface KeyboardConfiguration {
  keyboardSubscriber: (lrudCallback: (direction: Direction) => void) => SubscriberType;
  keyboardUnsubscriber: (subscriber: SubscriberType) => void;
}

export let keyboardSubscriber: KeyboardConfiguration['keyboardSubscriber'] = undefined;
export let keyboardUnsubscriber: KeyboardConfiguration['keyboardUnsubscriber'] = undefined;

export const configureKeyboard = (options: KeyboardConfiguration) => {
  keyboardSubscriber = options.keyboardSubscriber;
  keyboardUnsubscriber = options.keyboardUnsubscriber;
};
