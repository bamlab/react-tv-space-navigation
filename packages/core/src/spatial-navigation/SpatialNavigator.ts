import { mapKeyCode } from './helpers/mapKeyCode';
import { Lrud } from 'lrud';

export default class SpatialNavigator {
  private lrud: Lrud;

  constructor() {
    this.lrud = new Lrud();
  }

  public registerNode(...params: Parameters<Lrud['registerNode']>) {
    try {
      this.lrud.registerNode(...params);
    } catch (e) {
      console.error(e);
    }
  }

  public unregisterNode(...params: Parameters<Lrud['unregisterNode']>) {
    this.lrud.unregisterNode(...params);
  }

  public async handleKeyDown(keycode: string) {
    if (!this.lrud.getRootNode()) return;

    const direction = mapKeyCode(keycode);
    if (direction)
      this.lrud.handleKeyEvent({ direction }, { forceFocus: true });
  }
}
