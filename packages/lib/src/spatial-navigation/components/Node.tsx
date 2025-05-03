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
  /** Returns whether the root is active or not. An active node is active if one of its children is focused. */
  isActive: boolean;
  /** Returns whether the root is active or not.
   * This is very handy if you want to hide the focus on your page elements when
   * the side-menu is focused (since it is a different root navigator) */
  isRootActive: boolean;
};

export type FocusableNodeState = NonFocusableNodeState & {
  /** Returns whether the root is focused or not. */
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
  /** Use this for grid alignment.
   * @see LRUD docs */
  alignInGrid?: boolean;
  indexRange?: NodeIndexRange;
  /**
   * This is an additional offset useful only for the scrollview. It adds up to the offsetFromStart of the scrollview.
   */
  additionalOffset?: number;
};
type Props = DefaultProps & (FocusableProps | NonFocusableProps);

export type SpatialNavigationNodeDefaultProps = DefaultProps;

const useScrollToNodeIfNeeded = ({
  childRef,
  additionalOffset,
}: {
  childRef: React.MutableRefObject<View | null>;
  additionalOffset?: number;
}) => {
  const { scrollToNodeIfNeeded } = useSpatialNavigatorParentScroll();
  // @ts-ignore
  return () => scrollToNodeIfNeeded(childRef, additionalOffset);
};

const useBindRefToChild = () => {
  const childRef = useRef<View | null>(null);

  const bindRefToChild = (child: React.ReactElement) => {
    return React.cloneElement(child, {
      // @ts-ignore
      ...child.props,
      ref: (node: View) => {
        // We need the reference for our scroll handling
        childRef.current = node;

        // @ts-expect-error @fixme This works at runtime but we couldn't find how to type it properly.
        // Let's check if a ref was given (not by us)
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

  return { bindRefToChild, childRef };
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
    // If parent changes, we have to re-register the Node + all children -> adding the parentId to the nodeId makes the children re-register.
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

    /*
     * We don't re-register in LRUD on each render, because LRUD does not allow updating the nodes.
     * Therefore, the SpatialNavigator Node callbacks are registered at 1st render but can change (ie. if props change) afterwards.
     * Since we want the functions to always be up to date, we use a reference to them.
     */

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
      // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
    }, [parentId]);

    useEffect(() => {
      if (shouldHaveDefaultFocus && isFocusable && !spatialNavigator.hasOneNodeFocused()) {
        spatialNavigator.handleOrQueueDefaultFocus(id);
      }
    }, [id, isFocusable, shouldHaveDefaultFocus, spatialNavigator]);

    // This proxy allows to track whether a property is used or not
    // hence allowing to ignore re-renders for unused properties
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
