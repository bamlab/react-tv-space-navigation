import { SpatialNavigationNode, SpatialNavigationNodeDefaultProps } from './Node';
import { Platform, View, ViewStyle } from 'react-native';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { useDevice } from '../context/DeviceContext';

type Props = SpatialNavigationNodeDefaultProps & {
  style?: ViewStyle;
  children:
    | React.ReactElement
    | ((props: { isFocused: boolean; isActive: boolean }) => React.ReactElement);
  onMouseEnterProps?: () => void;
  onMouseLeaveProps?: () => void;
};

export const SpatialNavigationFocusableView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ children, style, onMouseEnterProps, onMouseLeaveProps, ...props }: Props, ref) => {
    const { deviceType } = useDevice();
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
          if (onMouseEnterProps) {
            onMouseEnterProps();
            return;
          }
          if (deviceType === 'remotePointer') {
            nodeRef.current?.focus();
          }
        },
        onMouseLeave: () => {
          onMouseLeaveProps?.();
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
