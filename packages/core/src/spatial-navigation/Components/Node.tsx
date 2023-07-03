import { useSpatialNavigator } from '../Context/SpatialNavigatorContext';
import { ParentIdContext, useParentId } from '../Context/ParentIdContext';
import { useBeforeMountEffect } from '../hooks/useBeforeMountEffect';
import { useUniqueId } from '../hooks/useUniqueId';
import { NodeOrientation } from '../types/orientation';
import React, { useRef, useState } from 'react';

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

export const Node = ({
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

  // @todo: Simplify for demo
  const currentOnFocus = useRef<() => void>();
  currentOnFocus.current = onFocus;
  const currentOnSelect = useRef<() => void>();
  currentOnSelect.current = onSelect;

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

  return (
    <ParentIdContext.Provider value={id}>
      {typeof children === 'function' ? children({ isFocused }) : children}
    </ParentIdContext.Provider>
  );
};
