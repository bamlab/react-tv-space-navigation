import { Direction, Lrud } from '@bam.tech/lrud';

export type OnDirectionHandledWithoutMovement = (direction: Direction) => void;
type OnDirectionHandledWithoutMovementRef = { current: OnDirectionHandledWithoutMovement };

type SpatialNavigatorParams = {
  onDirectionHandledWithoutMovementRef: OnDirectionHandledWithoutMovementRef;
};

export default class SpatialNavigator {
  private lrud: Lrud;
  private onDirectionHandledWithoutMovementRef: OnDirectionHandledWithoutMovementRef;

  constructor({
    onDirectionHandledWithoutMovementRef = { current: () => undefined },
  }: SpatialNavigatorParams) {
    this.lrud = new Lrud();
    this.onDirectionHandledWithoutMovementRef = onDirectionHandledWithoutMovementRef;
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

  public async handleKeyDown(direction: Direction | null) {
    if (!direction) return;
    if (!this.hasRootNode) return;
    if (!this.lrud.getRootNode()) return;

    if (direction) {
      const nodeBeforeMovement = this.lrud.getCurrentFocusNode();
      this.lrud.handleKeyEvent({ direction }, { forceFocus: true });
      const nodeAfterMovement = this.lrud.getCurrentFocusNode();

      if (nodeBeforeMovement === nodeAfterMovement) {
        this.onDirectionHandledWithoutMovementRef.current(direction);
      }
    }
  }

  public hasOneNodeFocused() {
    return this.lrud.getCurrentFocusNode() !== undefined;
  }

  public grabFocus = (id: string) => {
    return this.lrud.assignFocus(id);
  };

  public getCurrentFocusNode = () => {
    return this.lrud.currentFocusNode;
  };

  private get hasRootNode(): boolean {
    try {
      this.lrud.getRootNode();
      return true;
    } catch (e) {
      console.warn('[React Spatial Navigation] No registered node on this page.');
      return false;
    }
  }
}
