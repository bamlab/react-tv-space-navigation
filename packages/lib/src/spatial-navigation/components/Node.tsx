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

type FocusableProps = {
  isFocusable: true;
  children: (props: { isFocused: boolean; isActive: boolean }) => React.ReactElement;
};
type NonFocusableProps = {
  isFocusable?: false;
  children: React.ReactElement | ((props: { isActive: boolean }) => React.ReactElement);
};
type DefaultProps = {
  onFocus?: () => void;
  onBlur?: () => void;
  onSelect?: () => void;
  orientation?: NodeOrientation;
  /** Use this for grid alignment.
   * @see LRUD docs */
  alignInGrid?: boolean;
  indexRange?: NodeIndexRange;
};
type Props = DefaultProps & (FocusableProps | NonFocusableProps);

export type SpatialNavigationNodeDefaultProps = DefaultProps;

const useScrollToNodeIfNeeded = ({
  childRef,
}: {
  childRef: React.MutableRefObject<View | null>;
}) => {
  const { scrollToNodeIfNeeded } = useSpatialNavigatorParentScroll();

  return () => scrollToNodeIfNeeded(childRef);
};

const useBindRefToChild = () => {
  const childRef = useRef<View | null>(null);

  const bindRefToChild = (child: React.ReactElement) => {
    return React.cloneElement(child, {
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
      orientation = 'vertical',
      isFocusable = false,
      alignInGrid = false,
      indexRange,
      children,
    }: Props,
    ref,
  ) => {
    const spatialNavigator = useSpatialNavigator();
    const parentId = useParentId();
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

    const scrollToNodeIfNeeded = useScrollToNodeIfNeeded({ childRef });

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

    const currentOnBlur = useRef<() => void>();
    currentOnBlur.current = onBlur;

    const shouldHaveDefaultFocus = useSpatialNavigatorDefaultFocus();

    useEffect(() => {
      spatialNavigator.registerNode(id, {
        parent: parentId,
        isFocusable,
        onBlur: () => {
          currentOnBlur.current?.();
          setIsFocused(false);
        },
        onFocus: () => {
          currentOnFocus.current?.();
          setIsFocused(true);
        },
        onSelect: () => currentOnSelect.current?.(),
        orientation,
        isIndexAlign: alignInGrid,
        indexRange,
        onActive: () => setIsActive(true),
        onInactive: () => setIsActive(false),
      });

      return () => spatialNavigator.unregisterNode(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps -- unfortunately, we can't have clean effects with lrud for now
    }, [parentId]);

    useEffect(() => {
      if (shouldHaveDefaultFocus && isFocusable && !spatialNavigator.hasOneNodeFocused()) {
        spatialNavigator.queueDefaultFocus(id);
      }
    }, [id, isFocusable, shouldHaveDefaultFocus, spatialNavigator]);

    return (
      <ParentIdContext.Provider value={id}>
        {typeof children === 'function'
          ? bindRefToChild(children({ isFocused, isActive }))
          : children}
      </ParentIdContext.Provider>
    );
  },
);
SpatialNavigationNode.displayName = 'SpatialNavigationNode';
