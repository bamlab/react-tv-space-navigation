import { ForwardedRef, ReactElement, RefAttributes, forwardRef } from 'react';

/**
 * This works like React.forwardRef but for components with generics props.
 * @warning Don't use this if your component type isn't generic => `const Component = <T>() => {...}` and displayName is not supported yet
 */
export function typedForwardRef<T, P = unknown>(
  render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
): (props: P & RefAttributes<T>) => ReactElement | null {
  // @ts-ignore
  return forwardRef(render) as (props: P & RefAttributes<T>) => ReactElement | null;
}
