import { useParentId } from '../context/ParentIdContext';
import { useSpatialNavigator } from '../context/SpatialNavigatorContext';

export const useSpatialNavigatorFocusableAccessibilityProps = () => {
  const spatialNavigator = useSpatialNavigator();
  const id = useParentId();

  return {
    accessible: true,
    accessibilityRole: 'button' as const,
    accessibilityActions: [{ name: 'activate' }] as const,
    onAccessibilityAction: () => {
      const currentNode = spatialNavigator.getCurrentFocusNode();

      if (currentNode?.id === id) {
        spatialNavigator.getCurrentFocusNode()?.onSelect?.(currentNode);
      } else {
        spatialNavigator.grabFocus(id);
      }
    },
  };
};
