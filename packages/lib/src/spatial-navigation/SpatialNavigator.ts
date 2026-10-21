import { Direction, Lrud, Node } from '@bam.tech/lrud';
import { isError } from './helpers/isError';

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

  private registerMap: { [key: string]: Array<Parameters<Lrud['registerNode']>> } = {};

  public registerNode(...params: Parameters<Lrud['registerNode']>) {
    try {
      const parent = params[1]?.parent;
      const id = params[0];

      // If no parent is given, we are talking about a root node. We want to register it.
      // If a parent is given, we need the node to exist. Otherwise, we'll pass and queue the node for later registration.
      if (parent === undefined || this.lrud.getNode(parent)) {
        this.lrud.registerNode(...params);

        // After we successfully register a node, we need to check whether it needs to grab the focus or not.
        this.handleQueuedFocus();

        // OK, we successfully registered an element.
        // Now, we check if some other elements were depending on us to be registered.
        // ...and we do it recursively.
        const potentialNodesToRegister = this.registerMap[id];
        if (!potentialNodesToRegister || potentialNodesToRegister.length === 0) return;

        potentialNodesToRegister.forEach((node) => {
          this.registerNode(...node);
        });
        delete this.registerMap[id];
      } else {
        // If the parent is not registered yet, we queue the node for later registration.
        if (!this.registerMap[parent]) {
          this.registerMap[parent] = [];
        }
        this.registerMap[parent].push(params);
      }
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

  /**
   * Sometimes we need to focus an element, but it is not registered yet.
   * That's where we put this waiting element.
   */
  private focusQueue: string | null = null;

  /**
   * In the case of virtualized lists, we have some race condition issues when trying
   * to imperatively assign focus.
   * Indeed, we need the list to scroll to the element and then focus it. But the element
   * needs to exist to be focused, so we need first to scroll then wait for the element to render
   * then focus it.
   */
  private virtualNodeFocusQueue: string | null = null;

  /**
   * To handle the default focus, we want to queue the element to be focused.
   * We queue it because it might not be registered yet when it asks for focus.
   *
   * We queue it only if there is no currently focused element already (or currently queued),
   * because multiple elements might try to take the focus (DefaultFocus is a context, so all its children
   * will try to grab it). We only want the first of these element to grab it.
   */
  public handleOrQueueDefaultFocus = (id: string) => {
    if (this.getCurrentFocusNode()) return;
    if (this.focusQueue) return;
    if (this.lrud.getNode(id)) {
      this.lrud.assignFocus(id);
      return;
    }
    this.focusQueue = id;
  };

  /**
   * Sometimes we want to queue focus an element, even if one is already focused.
   * That happens with an imperative focus for example. I can force a focus to an element,
   * even though another one is already focused.
   *
   * Still, I want to queue it, because the element might not be registered yet (example: in the case of virtualized lists)
   */
  public grabFocusDeferred = (id: string) => {
    try {
      if (this.lrud.getNode(id)) {
        this.lrud.assignFocus(id);
        return;
      }
    } catch (error) {
      // If the element exists but is not focusable, it is very likely that it will
      // have a focusable child soon. This is the case for imperative focus on virtualized lists.
      if (isError(error) && error.message === 'trying to assign focus to a non focusable node') {
        this.virtualNodeFocusQueue = id;
      }
    }
  };

  /**
   * This will focus the currently queued element if it exists.
   * Otherwise, it will do nothing.
   *
   * This function will eventually be called with the proper element
   * when the element is finally registered.
   */
  private handleQueuedFocus = () => {
    // Handle focus queue
    if (this.focusQueue && this.lrud.getNode(this.focusQueue)) {
      try {
        this.lrud.assignFocus(this.focusQueue);
        this.focusQueue = null;
      } catch (e) {
        // pass
      }
    }

    // Handle virtual nodes (for virtualized lists) focus queue
    if (
      this.virtualNodeFocusQueue &&
      this.lrud.getNode(this.virtualNodeFocusQueue)?.children?.length !== 0
    ) {
      try {
        this.lrud.assignFocus(this.virtualNodeFocusQueue);
        this.virtualNodeFocusQueue = null;
      } catch (e) {
        // pass
      }
    }
  };

  public grabFocus = (id: string) => {
    return this.lrud.assignFocus(id);
  };

  public getCurrentFocusNode = () => {
    return this.lrud.currentFocusNode;
  };

  /**
   * The path of the currently focused node: the list of the indexes of its
   * children, from the root of the tree down to the node itself.
   *
   * We remember the path rather than the id of the node because the ids are
   * generated when a node is mounted. When the content of a screen is
   * re-rendered, the focused node is unregistered and registered again with a
   * new id, but it stays at the same place in the tree.
   */
  private getFocusedNodePath = (): number[] | null => {
    let node = this.lrud.getCurrentFocusNode();

    if (!node) return null;

    const path: number[] = [];

    while (node.parent) {
      const index = node.parent.children?.indexOf(node) ?? -1;

      // The node is not in the children of its parent: we can't build a path.
      if (index === -1) return null;

      path.unshift(index);
      node = node.parent;
    }

    return path;
  };

  /**
   * Returns the node sitting at the given path in the tree, if any.
   */
  private getNodeAtPath = (path: number[]): Node | undefined => {
    let node: Node | undefined;

    try {
      node = this.lrud.getRootNode();
    } catch (e) {
      return undefined;
    }

    for (const index of path) {
      node = node?.children?.[index];

      if (!node) return undefined;
    }

    return node;
  };

  /**
   * Remembers where the focus is, so that it can be given back later.
   *
   * @see restoreFocus
   */
  public saveFocus = () => {
    this.focusedNodePath = this.getFocusedNodePath();
  };

  /**
   * Gives the focus back to the node that was focused when saveFocus was
   * called.
   *
   * This is used when a screen becomes active again (after the user came back
   * to it, or after a modal was closed): the focus should go back to the
   * element the user was on, and not to the first element of the screen.
   *
   * Returns true if the focus was restored.
   */
  public restoreFocus = (): boolean => {
    const path = this.focusedNodePath;

    if (!path) return false;

    const node = this.getNodeAtPath(path);

    if (!node) return false;

    // The node is not focusable anymore: we don't want to move the focus to
    // an arbitrary element.
    if (!node.isFocusable && !this.lrud.doesNodeHaveFocusableChildren(node)) return false;

    try {
      this.lrud.assignFocus(node);
    } catch (e) {
      return false;
    }

    return true;
  };

  private focusedNodePath: number[] | null = null;

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
