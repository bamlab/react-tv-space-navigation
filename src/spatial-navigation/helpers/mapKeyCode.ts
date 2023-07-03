import { Directions } from 'lrud';

const KeyMapping: Record<string, Directions> = {
  ArrowLeft: Directions.LEFT,
  ArrowRight: Directions.RIGHT,
  ArrowUp: Directions.UP,
  ArrowDown: Directions.DOWN,
  Enter: Directions.ENTER,
};

export const mapKeyCode = (keycode: string) => KeyMapping[keycode];
