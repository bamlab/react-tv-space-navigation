import {
  FocusableNodeState,
  SpatialNavigationNode,
  SpatialNavigationNodeDefaultProps,
} from './Node';
import { Platform, View, ViewStyle, ViewProps } from 'react-native';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';
import { useSpatialNavigatorFocusableAccessibilityProps } from '../hooks/useSpatialNavigatorFocusableAccessibilityProps';

type FocusableViewProps = {
  style?: ViewStyle;
  children: React.ReactElement | ((props: FocusableNodeState) => React.ReactElement);
  viewProps?: ViewProps & {
    onMouseEnter?: () => void;
  };
};

type Props = SpatialNavigationNodeDefaultProps & FocusableViewProps;

export const SpatialNavigationFocusableView = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ children, style, viewProps, ...props }, ref) => {
    const { deviceTypeRef } = useSpatialNavigationDeviceType();
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
          if (deviceTypeRef.current === 'remotePointer') {
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
        {(nodeState) => (
          <InnerFocusableView
            viewProps={viewProps}
            webProps={webProps}
            style={style}
            nodeState={nodeState}
          >
            {children}
          </InnerFocusableView>
        )}
      </SpatialNavigationNode>
    );
  },
);
SpatialNavigationFocusableView.displayName = 'SpatialNavigationFocusableView';

type InnerFocusableViewProps = FocusableViewProps & {
  webProps:
    | {
        onMouseEnter: () => void;
        onClick: () => void;
      }
    | {
        onMouseEnter?: undefined;
        onClick?: undefined;
      };
  nodeState: FocusableNodeState;
};

const InnerFocusableView = forwardRef<View, InnerFocusableViewProps>(
  ({ viewProps, webProps, children, nodeState, style }, ref) => {
    const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();
    const accessibilityState = useMemo(
      () => ({ selected: nodeState.isFocused }),
      [nodeState.isFocused],
    );

    return (
      <View
        ref={ref}
        style={style}
        accessibilityState={accessibilityState}
        {...accessibilityProps}
        {...viewProps}
        {...webProps}
      >
        {typeof children === 'function' ? children(nodeState) : children}
      </View>
    );
  },
);
InnerFocusableView.displayName = 'InnerFocusableView';
