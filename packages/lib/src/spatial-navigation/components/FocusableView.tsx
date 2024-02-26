import { SpatialNavigationNode, SpatialNavigationNodeDefaultProps } from './Node';
import { Platform, View, ViewStyle } from 'react-native';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';

type Props = SpatialNavigationNodeDefaultProps & {
  style?: ViewStyle;
  children:
    | React.ReactElement
    | ((props: { isFocused: boolean; isActive: boolean }) => React.ReactElement);
  /** return true if you want to ignore the focus */
  onMouseEnter?: () => void | boolean;
  onMouseLeave?: () => void;
};

export const SpatialNavigationFocusableView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ children, style, onMouseEnter, onMouseLeave, ...props }: Props, ref) => {
    const { deviceType } = useSpatialNavigationDeviceType();
    const nodeRef = useRef<SpatialNavigationNodeRef>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => nodeRef.current?.focus(),
      }),
      [nodeRef],
    );

    const webProps = Platform.select({
      web: {
        onMouseEnter: () => {
          if (onMouseEnter) {
            onMouseEnter();
            if (onMouseEnter() === true) return;
          }
          if (deviceType === 'remotePointer') {
            nodeRef.current?.focus();
          }
        },
        onMouseLeave: () => {
          onMouseLeave?.();
        },
      },
      default: {},
    });

    return (
      <SpatialNavigationNode isFocusable {...props} ref={nodeRef}>
        {({ isFocused, isActive }) => (
          <View style={style} {...webProps}>
            {typeof children === 'function' ? children({ isFocused, isActive }) : children}
          </View>
        )}
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationFocusableView.displayName = 'SpatialNavigationFocusableView';
