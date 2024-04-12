import { SpatialNavigationNode, SpatialNavigationNodeDefaultProps } from './Node';
import { Platform, View, ViewStyle, ViewProps } from 'react-native';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { useSpatialNavigationDeviceType } from '../context/DeviceContext';
import { useSpatialNavigatorFocusableAccessibilityProps } from '../hooks/useSpatialNavigatorFocusableAccessibilityProps';

type FocusableViewProps = {
  style?: ViewStyle;
  children:
    | React.ReactElement
    | ((props: { isFocused: boolean; isActive: boolean }) => React.ReactElement);
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
        triggerScroll: () => nodeRef.current?.triggerScroll(),
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
        {({ isFocused, isActive }) => (
          <InnerFocusableView
            viewProps={viewProps}
            webProps={webProps}
            style={style}
            isActive={isActive}
            isFocused={isFocused}
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
  isActive: boolean;
  isFocused: boolean;
};

const InnerFocusableView = forwardRef<View, InnerFocusableViewProps>(
  ({ viewProps, webProps, children, isActive, isFocused, style }, ref) => {
    const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();
    const accessibilityState = useMemo(() => ({ selected: isFocused }), [isFocused]);

    return (
      <View
        ref={ref}
        style={style}
        accessibilityState={accessibilityState}
        {...accessibilityProps}
        {...viewProps}
        {...webProps}
      >
        {typeof children === 'function' ? children({ isFocused, isActive }) : children}
      </View>
    );
  },
);
InnerFocusableView.displayName = 'InnerFocusableView';
