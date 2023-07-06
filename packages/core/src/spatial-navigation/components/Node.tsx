import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSpatialNavigatorDefaultFocus } from '../context/DefaultFocusContext';
import { ParentIdContext, useParentId } from '../context/ParentIdContext';
import { useSpatialNavigatorParentScroll } from '../context/ParentScrollContext';
import { useSpatialNavigator } from '../context/SpatialNavigatorContext';
import { useBeforeMountEffect } from '../hooks/useBeforeMountEffect';
import { useUniqueId } from '../hooks/useUniqueId';
import { NodeOrientation } from '../types/orientation';

type FocusableProps = {
  isFocusable: true;
  children: (props: { isFocused: boolean }) => React.ReactElement;
};
type NonFocusableProps = {
  isFocusable?: false;
  children: React.ReactNode;
};
type DefaultProps = {
  onFocus?: () => void;
  onSelect?: () => void;
  orientation?: NodeOrientation;
};
type Props = DefaultProps & (FocusableProps | NonFocusableProps);

const useScrollIfNeeded = (): {
  scrollToNodeIfNeeded: () => void;
  bindRefToChild: (child: React.ReactElement) => React.ReactElement;
} => {
  const innerReactNodeRef = useRef<View | null>(null);
  const { scrollToNodeIfNeeded } = useSpatialNavigatorParentScroll();

  const bindRefToChild = (child: React.ReactElement) => {
    return React.cloneElement(child, {
      ...child.props,
      ref: (node: View) => {
        // We need the reference for our scroll handling
        innerReactNodeRef.current = node;

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

  return { scrollToNodeIfNeeded: () => scrollToNodeIfNeeded(innerReactNodeRef), bindRefToChild };
};

export const SpatialNavigationNode = ({
  onFocus,
  onSelect,
  orientation = 'vertical',
  isFocusable = false,
  children,
}: Props) => {
  const spatialNavigator = useSpatialNavigator();
  const parentId = useParentId();
  const [isFocused, setIsFocused] = useState(false);
  const id = useUniqueId({ prefix: `${parentId}_node_` });

  const { scrollToNodeIfNeeded, bindRefToChild } = useScrollIfNeeded();

  /*
   * We don't re-register in LRUD on each render, because LRUD does not allow updating the nodes.
   * Therefore, the SpatialNavigator Node callbacks are registered at 1st render but can change (ie. if props change) afterwards.
   * Since we want the functions to always be up to date, we use a reference to them.
   */

  const currentOnSelect = useRef<() => void>();
  currentOnSelect.current = onSelect;

  const currentOnFocus = useRef<() => void>();
  currentOnFocus.current = () => {
    onFocus?.();
    scrollToNodeIfNeeded();
  };

  const shouldHaveDefaultFocus = useSpatialNavigatorDefaultFocus();

  useBeforeMountEffect(() => {
    spatialNavigator.registerNode(id, {
      parent: parentId,
      isFocusable,
      onBlur: () => {
        setIsFocused(false);
      },
      onFocus: () => {
        currentOnFocus.current?.();
        setIsFocused(true);
      },
      onSelect: () => currentOnSelect.current?.(),
      orientation,
    });

    return () => spatialNavigator.unregisterNode(id);
  }, [parentId]);

  useEffect(() => {
    if (shouldHaveDefaultFocus && isFocusable && !spatialNavigator.hasOneNodeFocused()) {
      spatialNavigator.grabFocus(id);
    }
  }, [id, isFocusable, shouldHaveDefaultFocus, spatialNavigator]);

  return (
    <ParentIdContext.Provider value={id}>
      {typeof children === 'function' ? bindRefToChild(children({ isFocused })) : children}
    </ParentIdContext.Provider>
  );
};
