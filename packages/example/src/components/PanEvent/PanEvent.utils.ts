import { repeat } from '../../utils/repeat';
import RemoteControlManager from '../remote-control/RemoteControlManager';
import { SupportedKeys } from '../remote-control/SupportedKeys';
import PanEvent from './PanEvent';
import { EMIT_KEY_DOWN_INTERVAL, GRID_SIZE, NUMBER_OF_COLUMNS } from './PanEvent.constants';

export const getGridCoordinates = (x: number, y: number, panEvent: PanEvent): number => {
  const gridElementSize = GRID_SIZE / NUMBER_OF_COLUMNS;

  const xIndex = Math.floor((x + gridElementSize / 2) / gridElementSize);
  const yIndex = Math.floor((y + gridElementSize / 2) / gridElementSize);

  if (!panEvent.getOrientation()) {
    // Lock orientation after significant movement to avoid sliding in two directions
    if (xIndex !== panEvent.getLastIndex()) {
      panEvent.setOrientation('x');
      return xIndex;
    }
    if (yIndex !== panEvent.getLastIndex()) {
      panEvent.setOrientation('y');
      return yIndex;
    }
    return;
  }

  if (panEvent.getOrientation() === 'x' && xIndex !== panEvent.getLastIndex()) {
    return xIndex;
  }

  if (panEvent.getOrientation() === 'y' && yIndex !== panEvent.getLastIndex()) {
    return yIndex;
  }
};

export const moveFocus = (index: number, panEvent: PanEvent) => {
  const indexDif = index - panEvent.getLastIndex();
  panEvent.setLastIndex(index);

  if (panEvent.getOrientation() === 'x') {
    repeat(
      () =>
        RemoteControlManager.emitKeyDown(indexDif > 0 ? SupportedKeys.Right : SupportedKeys.Left),
      EMIT_KEY_DOWN_INTERVAL,
      Math.abs(indexDif),
    );
  }
  if (panEvent.getOrientation() === 'y') {
    repeat(
      () => RemoteControlManager.emitKeyDown(indexDif > 0 ? SupportedKeys.Down : SupportedKeys.Up),
      EMIT_KEY_DOWN_INTERVAL,
      Math.abs(indexDif),
    );
  }
};
