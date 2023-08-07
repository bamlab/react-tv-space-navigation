import { useCallback, useRef } from 'react';

/**
 * Basically a useMemo for an array that creates elements on the go (not all at the beginning).
 *
 * The input & output might seem similar -> the difference is that
 * - input `nthElementConstructor` always returns a new instance of the Nth element
 * - output`getNthMemoizedElement` always return the same instance of the Nth element (memoized).
 *
 * @warning nthElementConstructor should never change
 *
 * @param nthElementConstructor a callback that returns what we want the Nth element to be.
 * @returns a callback to get the Nth memoized element.
 */
export const useCachedValues = <T>(nthElementConstructor: (n: number) => T): ((n: number) => T) => {
  const memoizedElements = useRef<{ [n: number]: T }>({});

  return useCallback((n: number) => {
    if (memoizedElements.current[n]) return memoizedElements.current[n] as T;

    const newElement = nthElementConstructor(n);
    memoizedElements.current[n] = newElement;
    return newElement;
    /** We purposefully dont put `nthElementConstructor` as a dependency because, if it changed,
     *  we would have to re-construct the whole cache. This use-case is not supported yet. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
