/**
 * This event emitter is a minimal reimplementation of `mitt` with the support of stoppable event propagation
 */

export type EventType = string | symbol;

// An event handler can take an optional event argument
// and should return a boolean indicating whether or not to stop event propagation
export type Handler<T = unknown> = (event: T) => boolean;

// An array of all currently registered event handlers for a type
export type EventHandlerList<T = unknown> = Array<Handler<T>>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]>
>;

export default class CustomEventEmitter<Events extends Record<EventType, unknown>> {
  private handlers: EventHandlerMap<Events> = new Map();

  on = <Key extends keyof Events>(eventType: Key, handler: Handler<Events[keyof Events]>) => {
    const eventTypeHandlers = this.handlers.get(eventType);
    if (!Array.isArray(eventTypeHandlers)) this.handlers.set(eventType, [handler]);
    else eventTypeHandlers.push(handler);
  };

  off = <Key extends keyof Events>(eventType: Key, handler?: Handler<Events[keyof Events]>) => {
    this.handlers.set(
      eventType,
      // @ts-expect-error TODO fix the type error
      this.handlers.get(eventType).filter((h) => h !== handler),
    );
  };

  emit = <Key extends keyof Events>(eventType: Key, evt?: Events[Key]) => {
    const eventTypeHandlers = this.handlers.get(eventType);
    // @ts-expect-error TODO fix the type error
    for (let index = eventTypeHandlers.length - 1; index >= 0; index--) {
      // @ts-expect-error TODO fix the type error
      const handler = eventTypeHandlers[index];
      // @ts-expect-error TODO fix the type error
      if (handler(evt)) {
        return;
      }
    }
  };
}
