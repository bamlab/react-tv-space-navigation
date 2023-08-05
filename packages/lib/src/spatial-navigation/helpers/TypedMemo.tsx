import { ComponentType, memo, ComponentProps } from 'react';

type PropsComparator<C extends ComponentType> = (
  prevProps: Readonly<ComponentProps<C>>,
  nextProps: Readonly<ComponentProps<C>>,
) => boolean;

/**
 * This works like React.memo but for components with generics props.
 * See issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
 * @warning Don't use this if your component type isn't generic => `const Component = <T>() => {...}`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function typedMemo<C extends ComponentType<any>>(
  Component: C,
  propsAreEqual?: PropsComparator<C>,
) {
  return memo(Component, propsAreEqual) as unknown as C & { displayName?: string };
}
