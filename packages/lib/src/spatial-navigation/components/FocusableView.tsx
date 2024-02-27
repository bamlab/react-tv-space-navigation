import { SpatialNavigationNode, SpatialNavigationNodeDefaultProps } from './Node';
import { Platform, View, ViewStyle, ViewProps } from 'react-native';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';

type Props = SpatialNavigationNodeDefaultProps & {
  style?: ViewStyle;
  children:
    | React.ReactElement
    | ((props: { isFocused: boolean; isActive: boolean }) => React.ReactElement);
  viewProps?: ViewProps & { onMouseEnter?: () => void };
};

export const SpatialNavigationFocusableView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ children, style, viewProps, ...props }: Props, ref) => {
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
          if (viewProps?.onMouseEnter) {
            viewProps?.onMouseEnter();
          }
          if (deviceType === 'remotePointer') {
            nodeRef.current?.focus();
          }
        },
        onClick: () => {
          props.onSelect?.();
        },
      },
      default: {},
    });

    return (
      <SpatialNavigationNode isFocusable {...props} ref={nodeRef}>
        {({ isFocused, isActive }) => (
          <View style={style} {...viewProps} {...webProps}>
            {typeof children === 'function' ? children({ isFocused, isActive }) : children}
          </View>
        )}
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationFocusableView.displayName = 'SpatialNavigationFocusableView';
