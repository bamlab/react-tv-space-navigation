export interface PanEventInterface {
  orientation: 'x' | 'y';
  lastIndex: number;
  reset: () => void;
  handlePanEvent: (event: { x: number; y: number }) => void;
}
