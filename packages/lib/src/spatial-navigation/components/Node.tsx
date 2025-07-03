import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSpatialNavigatorDefaultFocus } from '../context/DefaultFocusContext';
import { ParentIdContext, useParentId } from '../context/ParentIdContext';
import { useSpatialNavigatorParentScroll } from '../context/ParentScrollContext';
import { useSpatialNavigator } from '../context/SpatialNavigatorContext';
import { useUniqueId } from '../hooks/useUniqueId';
import { NodeOrientation } from '../types/orientation';
import { NodeIndexRange } from '@bam.tech/lrud';
import { SpatialNavigationNodeRef } from '../types/SpatialNavigationNodeRef';
import { useIsRootActive } from '../context/IsRootActiveContext';

type NonFocusableNodeState = {
  isActive: boolean;
  isRootActive: boolean;
};

export type FocusableNodeState = NonFocusableNodeState & {
  isFocused: boolean;
};

type FocusableProps = {
  isFocusable: true;
  children: (props: FocusableNodeState) => React.ReactElement;
};
type NonFocusableProps = {
  isFocusable?: false;
  children: React.ReactElement | ((props: NonFocusableNodeState) => React.ReactElement);
};
type DefaultProps = {
  onFocus?: () => void;
  onBlur?: () => void;
  onSelect?: () => void;
  onLongSelect?: () => void;
  onActive?: () => void;
  onInactive?: () => void;
  orientation?: NodeOrientation;
  alignInGrid?: boolean;
  indexRange?: NodeIndexRange;
  additionalOffset?: number;
};
type Props = DefaultProps & (FocusableProps | NonFocusableProps);

export type SpatialNavigationNodeDefaultProps = DefaultProps;

const useScrollToNodeIfNeeded = ({
  childRef,
  additionalOffset,
}: {
  childRef: React.RefObject<View>;
  additionalOffset?: number;
}) => {
  const { scrollToNodeIfNeeded } = useSpatialNavigatorParentScroll();
  return () => scrollToNodeIfNeeded(childRef, additionalOffset);
};

const useBindRefToChild = () => {
  const childRef = useRef<View | null>(null);

  const bindRefToChild = (child: React.ReactElement) => {
    return React.cloneElement(child as React.ReactElement<any>, {
      ...((child.props as object) || {}),
      ref: (node: View) => {
        childRef.current = node;

        // @ts-expect-error This works at runtime but we couldn't find how to type it properly.
        const { ref } = child;
        if (typeof ref === 'function') {
          ref(node);
        }
        if (ref?.current !== undefined) {
          ref.current = node;
        }
      },
    });
  };

  return { bindRefToChild, childRef: childRef as React.RefObject<View> };
};

export const SpatialNavigationNode = forwardRef<SpatialNavigationNodeRef, Props>(
  (
    {
      onFocus,
      onBlur,
      onSelect,
      onLongSelect = onSelect,
      onActive,
      onInactive,
      orientation = 'vertical',
      isFocusable = false,
      alignInGrid = false,
      indexRange,
      children,
      additionalOffset = 0,
    }: Props,
    ref,
  ) => {
    const spatialNavigator = useSpatialNavigator();
    const parentId = useParentId();
    const isRootActive = useIsRootActive();
    const [isFocused, setIsFocused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const id = useUniqueId({ prefix: `${parentId}_node_` });

    useImperativeHandle(
      ref,
      () => ({
        focus: () => spatialNavigator.grabFocus(id),
      }),
      [spatialNavigator, id],
    );

    const { childRef, bindRefToChild } = useBindRefToChild();

    const scrollToNodeIfNeeded = useScrollToNodeIfNeeded({
      childRef,
      additionalOffset,
    });

    const currentOnSelect = useRef<() => void>(undefined);
    currentOnSelect.current = onSelect;

    const currentOnLongSelect = useRef<() => void>(undefined);
    currentOnLongSelect.current = onLongSelect;

    const currentOnFocus = useRef<() => void>(undefined);
    currentOnFocus.current = () => {
      onFocus?.();
      scrollToNodeIfNeeded();
    };

    const currentOnBlur = useRef<() => void>(undefined);
    currentOnBlur.current = onBlur;

    const currentOnActive = useRef<() => void>(undefined);
    currentOnActive.current = onActive;

    const currentOnInactive = useRef<() => void>(undefined);
    currentOnInactive.current = onInactive;

    const shouldHaveDefaultFocus = useSpatialNavigatorDefaultFocus();

    const accessedPropertiesRef = useRef<Set<keyof FocusableNodeState>>(new Set());

    useEffect(() => {
      spatialNavigator.registerNode(id, {
        parent: parentId,
        isFocusable,
        onBlur: () => {
          currentOnBlur.current?.();
          if (accessedPropertiesRef.current.has('isFocused')) {
            setIsFocused(false);
          }
        },
        onFocus: () => {
          currentOnFocus.current?.();
          if (accessedPropertiesRef.current.has('isFocused')) {
            setIsFocused(true);
          }
        },
        onSelect: () => currentOnSelect.current?.(),
        onLongSelect: () => currentOnLongSelect.current?.(),
        orientation,
        isIndexAlign: alignInGrid,
        indexRange,
        onActive: () => {
          currentOnActive.current?.();
          if (accessedPropertiesRef.current.has('isActive')) {
            setIsActive(true);
          }
        },
        onInactive: () => {
          currentOnInactive.current?.();
          if (accessedPropertiesRef.current.has('isActive')) {
            setIsActive(false);
          }
        },
      });

      return () => spatialNavigator.unregisterNode(id);
    }, [parentId]);

    useEffect(() => {
      if (shouldHaveDefaultFocus && isFocusable && !spatialNavigator.hasOneNodeFocused()) {
        spatialNavigator.handleOrQueueDefaultFocus(id);
      }
    }, [id, isFocusable, shouldHaveDefaultFocus, spatialNavigator]);

    const proxyObject = new Proxy(
      { isFocused, isActive, isRootActive },
      {
        get(target, prop: keyof FocusableNodeState) {
          accessedPropertiesRef.current.add(prop);
          return target[prop];
        },
      },
    );

    return (
      <ParentIdContext.Provider value={id}>
        {typeof children === 'function' ? bindRefToChild(children(proxyObject)) : children}
      </ParentIdContext.Provider>
    );
  },
);
SpatialNavigationNode.displayName = 'SpatialNavigationNode';
