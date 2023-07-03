import { DependencyList, useEffect, useRef } from 'react';

/** This works like a useEffect BUT the effect is NOT run after render.
 * It's NOT run after all DOM mutations either (like a useLayoutEffect would).
 * Instead, it's run synchronously as soon as the hook is called.
 * The cleanup/destructor is also run synchronously, before the effect on a re-render.
 * However, when the component calling the hook unmounts, the cleanup/destructor is run like a regular effect cleanup (during the effect phase).
 *
 * WHY: We want to register Nodes to the SpatialNavigator as soon as they exist. Waiting for the mount/DOM can
 * introduce race conditions and children effects being called before parent effects -> This would result in
 * children Nodes registering before Parent nodes which breaks the SpatialNavigator's tree.
 *
 * @param callback The callback you want to execute before mount. Warning: needs to return a cleanup function.
 *
 * @warning Do not use for anything that is not SpatialNavigator related. It's a bad pattern and should only be used when registering Nodes.
 */
export const useBeforeMountEffect = (
  callback: () => (() => void) | undefined | void,
  dependencies?: DependencyList,
) => {
  const prevDependencies = useRef<DependencyList>();
  const isMounted = useRef(false);
  const cleanupCallback = useRef<() => void>();

  // In case of re-render : Check if the dependencies have changed
  if (
    // The dependencies array is undefined => we need to trigger the cleanup
    !dependencies ||
    // The dependencies array has changed => we need to trigger the cleanup
    dependencies.some(
      (value, index) => value !== prevDependencies.current?.[index],
    )
  ) {
    cleanupCallback.current?.(); // Run the cleanup of the last effect.
    isMounted.current = false; // Allow to re-run the effect on the next render (with new dependencies).
    prevDependencies.current = dependencies;
  }

  if (!isMounted.current) {
    cleanupCallback.current = callback() || undefined;
    isMounted.current = true;
  }

  // We still need to trigger the cleanup effect on a unmount. This must be done inside a useEffect, since there is no other way to know that the component is unmounted
  useEffect(() => {
    return () => cleanupCallback.current?.();
  }, []);
};
