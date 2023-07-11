import uniqueId from 'lodash.uniqueid';
import { useCallback, useRef } from 'react';
import { VirtualizedList, VirtualizedListProps, ItemWithIndex } from './VirtualizedList';
import { useSpatialNavigator } from '../../context/SpatialNavigatorContext';
import { ParentIdContext, useParentId } from '../../context/ParentIdContext';
import { updateVirtualNodeRegistration } from './helpers/updateVirtualNodeRegistration';
import { useBeforeMountEffect } from '../../hooks/useBeforeMountEffect';
import { typedMemo } from '../../helpers/TypedMemo';
import { useCachedValues } from './hooks/useCachedValues';

const useCreateVirtualParentsIds = (parentId: string) =>
  useCachedValues(() => uniqueId(`${parentId}_virtual_`));

/**
 * Hook which will :
 * - register the initial virtualNodes
 * - unregister the final virtualNodes
 * Do it each time the parentId is changing
 */
const useRegisterInitialAndUnregisterFinalVirtualNodes = <T,>({
  allItems,
  parentId,
  registerNthVirtualNode,
  unregisterNthVirtualNode,
}: {
  allItems: Array<T>;
  parentId: string;
  registerNthVirtualNode: (index: number) => void;
  unregisterNthVirtualNode: (index: number) => void;
}) => {
  /** We don't unregister the nodes on each render because we want to update them instead (add new ones, move existing ones...).
   * We register each item in allItems at 1st render, and unregister all the registered nodes on unmount.
   * If data was added to allItems in the meantime (ex: onEndReached), the cleanup function needs to have "access" to this additional data in order to unregister the additional nodes.
   * This means the cleanup function needs to have access to up-to-date data, so we use a reference to the list of data. */
  const currentAllItems = useRef<Array<T>>(allItems);
  currentAllItems.current = allItems;

  useBeforeMountEffect(() => {
    currentAllItems.current.forEach((_, n) => registerNthVirtualNode(n));

    return () => currentAllItems.current.forEach((_, n) => unregisterNthVirtualNode(n));
  }, [parentId]);
};

const useUpdateRegistration = <T,>({
  allItems,
  registerNthVirtualNode,
}: {
  allItems: Array<T>;
  registerNthVirtualNode: (index: number) => void;
}) => {
  const previousAllItems = useRef<Array<T>>();

  // useBeforeMountEffect done every time allItems is changing to change the way the allItems is register in the spatialNavigator
  useBeforeMountEffect(() => {
    const previousAllItemsList = previousAllItems.current;
    const isFirstRender = previousAllItemsList === undefined;
    if (!isFirstRender) {
      updateVirtualNodeRegistration({
        currentItems: allItems,
        previousItems: previousAllItemsList,
        addVirtualNode: registerNthVirtualNode,
      });
    }
    previousAllItems.current = allItems;
  }, [allItems]);
};

const useRegisterVirtualNodes = <T extends ItemWithIndex>({ allItems }: { allItems: Array<T> }) => {
  const spatialNavigator = useSpatialNavigator();
  const parentId = useParentId();
  const getNthVirtualNodeID = useCreateVirtualParentsIds(parentId);

  const registerNthVirtualNode = useCallback(
    (index: number) => {
      return spatialNavigator.registerNode(getNthVirtualNodeID(index), {
        parent: parentId,
        orientation: 'vertical', // default orientation used to register with lrud
        isFocusable: false,
      });
    },
    [getNthVirtualNodeID, parentId, spatialNavigator],
  );

  const unregisterNthVirtualNode = useCallback(
    (index: number) => spatialNavigator.unregisterNode(getNthVirtualNodeID(index)),
    [getNthVirtualNodeID, spatialNavigator],
  );

  useRegisterInitialAndUnregisterFinalVirtualNodes({
    allItems,
    parentId,
    registerNthVirtualNode,
    unregisterNthVirtualNode,
  });

  useUpdateRegistration({ allItems, registerNthVirtualNode });

  return { getNthVirtualNodeID };
};

const ItemWrapperWithVirtualParentContext = typedMemo(
  <T extends ItemWithIndex>({
    virtualParentID,
    item,
    renderItem,
  }: {
    virtualParentID: string;
    item: T;
    renderItem: VirtualizedListProps<T>['renderItem'];
  }) => (
    <ParentIdContext.Provider value={virtualParentID}>
      {renderItem({ item })}
    </ParentIdContext.Provider>
  ),
);

export type SpatialNavigationVirtualizedListWithVirtualNodesProps<T> = VirtualizedListProps<T>;

/**
 * This component wraps every item of the VirtualizedList inside a Virtual Node.
 *
 * Virtual Nodes make the list more resilient to data changes.
 *
 *  If the data changes, virtual nodes always wrap each elements for the spatial navigator to never lose track of the elements.
 *  The strategy is to have as many virtual LRUD nodes as the amount data. For a N length array, we have N virtualized nodes. Even after pagination.
 * These virtual nodes are really helpful to never lose track of the navigation, especially if there is a refresh of the data and the array is shuffled.
 * ```
 *                       ┌───────────────────────────────────────┐
 *                       │                Screen                 │
 *                       │                                       │
 *                       │                                       │
 * ┌─────┐  ┌─────┐  ┌───┼─┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐ ├┬─────┐  ┌─────┐
 * │  1  │  │  2  │  │  3│ │  │  4  │  │  5  │  │  6  │  │  7  │ ││  8  │  │  9  │
 * │     │  │┌───┐│  │┌──┼┐│  │┌───┐│  │┌───┐│  │┌───┐│  │┌───┐│ ││┌───┐│  │     │
 * │     │  ││ A ││  ││ B│││  ││ C ││  ││ D ││  ││ E ││  ││ F ││ │││ G ││  │  H  │
 * │     │  │└───┘│  │└──┼┘│  │└───┘│  │└───┘│  │└───┘│  │└───┘│ ││└───┘│  │     │
 * └─────┘  └─────┘  └───┼─┘  └─────┘  └─────┘  └─────┘  └─────┘ │└─────┘  └─────┘
 *                       │                                       │
 *                       └───────────────────────────────────────┘
 * ```
 */
export const SpatialNavigationVirtualizedListWithVirtualNodes = typedMemo(
  <T extends ItemWithIndex>(props: SpatialNavigationVirtualizedListWithVirtualNodesProps<T>) => {
    const { getNthVirtualNodeID } = useRegisterVirtualNodes({
      allItems: props.data,
    });

    const { renderItem } = props;
    const renderWrappedItem: typeof props.renderItem = useCallback(
      ({ item }) => (
        <ItemWrapperWithVirtualParentContext
          virtualParentID={getNthVirtualNodeID(item.index)}
          renderItem={renderItem}
          item={item}
        />
      ),
      [getNthVirtualNodeID, renderItem],
    );

    return <VirtualizedList {...props} renderItem={renderWrappedItem} />;
  },
);
