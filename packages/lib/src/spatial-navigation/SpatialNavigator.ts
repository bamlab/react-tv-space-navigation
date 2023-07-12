import { Direction, Lrud } from '@bam.tech/lrud';

export type OnDirectionHandledWithMovement = (direction: Direction) => void;
type OnDirectionHandledWithMovementRef = { current: OnDirectionHandledWithMovement };

type SpatialNavigatorParams = {
  onDirectionHandledWithoutMovementRef: OnDirectionHandledWithMovementRef;
};

export default class SpatialNavigator {
  private lrud: Lrud;
  private isLocked = false;
  private onDirectionHandledWithoutMovementRef: OnDirectionHandledWithMovementRef;

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
    if (this.isLocked) return;
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

  public grabFocus(id: string) {
    return this.lrud.assignFocus(id);
  }

  public getCurrentFocusNode() {
    return this.lrud.currentFocusNode;
  }

  public lock() {
    this.isLocked = true;
  }

  public unlock() {
    this.isLocked = false;
  }

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
