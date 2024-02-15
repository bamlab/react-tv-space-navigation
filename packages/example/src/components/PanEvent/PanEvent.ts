import { getGridCoordinates, moveFocus } from './PanEvent.utils';

class PanEvent {
  private orientation = undefined;
  private lastIndex = 0;

  reset = () => {
    this.orientation = undefined;
    this.lastIndex = 0;
  };
  handlePanEvent = ({ x, y }: { x: number; y: number }) => {
    const newIndex = getGridCoordinates(x, y, this);
    if (!newIndex) return;
    moveFocus(newIndex, this);
  };

  getOrientation = () => {
    return this.orientation;
  };
  setOrientation = (orientation: string) => {
    this.orientation = orientation;
  };
  getLastIndex = () => {
    return this.lastIndex;
  };
  setLastIndex = (lastIndex: number) => {
    this.lastIndex = lastIndex;
  };
}

export default PanEvent;
