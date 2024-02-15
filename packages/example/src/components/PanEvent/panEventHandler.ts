import { HWEvent } from 'react-native';
import RemoteControlManager from '../remote-control/RemoteControlManager';
import { SupportedKeys } from '../remote-control/SupportedKeys';
import { PanEventInterface } from './PanEvent.interface';
import { throttle } from '../../utils/throttle';
import { repeat } from '../../utils/repeat';

const GRID_SIZE = 1920;
const NUMBER_OF_COLUMNS = 5;

const PanEvent: PanEventInterface = {
  orientation: undefined,
  lastIndex: 0,
  reset: () => {
    PanEvent.orientation = undefined;
    PanEvent.lastIndex = 0;
  },
  handlePanEvent: ({ x, y }: { x: number; y: number }) => {
    const newIndex = getGridCoordinates(x, y);
    if (!newIndex) return;
    moveFocus(newIndex);
  },
};

export const panEventHandler = (event: HWEvent) => {
  throttle(() => {
    if (event.eventType === 'pan') {
      if (!event.body) return;
      if (event.body.state === 'Began') {
        PanEvent.reset();
      }
      if (event.body.state === 'Changed') {
        PanEvent.handlePanEvent({ x: event.body.x, y: event.body.y });
      }
    }
  }, 30)();
};

const getGridCoordinates = (x: number, y: number): number => {
  const gridElementSize = GRID_SIZE / NUMBER_OF_COLUMNS;

  const xIndex = Math.floor((x + gridElementSize / 2) / gridElementSize);
  const yIndex = Math.floor((y + gridElementSize / 2) / gridElementSize);

  if (!PanEvent.orientation) {
    // Lock orientation after significant movement to avoid sliding in two directions
    if (xIndex !== PanEvent.lastIndex) {
      PanEvent.orientation = 'x';
      return xIndex;
    }
    if (yIndex !== PanEvent.lastIndex) {
      PanEvent.orientation = 'y';
      return yIndex;
    }
    return;
  }

  if (PanEvent.orientation === 'x' && xIndex !== PanEvent.lastIndex) {
    return xIndex;
  }

  if (PanEvent.orientation === 'y' && yIndex !== PanEvent.lastIndex) {
    return yIndex;
  }
};

const moveFocus = (index: number) => {
  const indexDif = index - PanEvent.lastIndex;
  PanEvent.lastIndex = index;

  if (PanEvent.orientation === 'x') {
    repeat(
      () =>
        RemoteControlManager.emitKeyDown(indexDif > 0 ? SupportedKeys.Right : SupportedKeys.Left),
      30,
      Math.abs(indexDif),
    );
  }
  if (PanEvent.orientation === 'y') {
    repeat(
      () => RemoteControlManager.emitKeyDown(indexDif > 0 ? SupportedKeys.Down : SupportedKeys.Up),
      30,
      Math.abs(indexDif),
    );
  }
};
