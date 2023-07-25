import { renderHook } from '@testing-library/react-hooks';
import { useBeforeMountEffect } from './useBeforeMountEffect';

const mockCallbackOnRender = jest.fn();
const mockCallbackCleanup = jest.fn();

/**
 * This function is used to check that the callback passed to useBeforeMountEffect
 * is called during rendering and unmounting.
 */
const mockCallbackFactory = (id?: number) => {
  return () => {
    // This effect function will be executed during rendering phase.
    mockCallbackOnRender(id);
    return () => {
      // This cleanup function is called during unmounting.
      mockCallbackCleanup(id);
    };
  };
};

describe('useBeforeMountEffect', () => {
  it('should call the cleanup/destructor when the component calling the hook unmounts', () => {
    // Renders a test component that will call the provided callback including its hooks.
    const { unmount, rerender } = renderHook(() => {
      useBeforeMountEffect(mockCallbackFactory(), []);
    });

    expect(mockCallbackOnRender).toHaveBeenCalledTimes(1);
    mockCallbackOnRender.mockClear();

    // For a simple re-render with no props changed, the callbacks should not be called
    rerender();
    expect(mockCallbackOnRender).toHaveBeenCalledTimes(0);
    expect(mockCallbackCleanup).toHaveBeenCalledTimes(0);

    unmount();
    expect(mockCallbackCleanup).toHaveBeenCalledTimes(1);
  });

  it('should call the cleanup of the 1st render and the effect of the 2nd render if the array of dependencies changes', () => {
    const { unmount, rerender } = renderHook(
      ({ callback, dependencies }) => {
        useBeforeMountEffect(callback, dependencies);
      },
      {
        initialProps: { callback: mockCallbackFactory(1), dependencies: [1] },
      },
    );

    expect(mockCallbackOnRender).toHaveBeenCalledWith(1);
    expect(mockCallbackCleanup).toHaveBeenCalledTimes(0);
    mockCallbackOnRender.mockClear();

    rerender({ callback: mockCallbackFactory(2), dependencies: [2] });
    expect(mockCallbackCleanup).toHaveBeenCalledWith(1);
    expect(mockCallbackOnRender).toHaveBeenCalledWith(2);

    expect(mockCallbackCleanup).not.toHaveBeenCalledWith(2);

    unmount();
    expect(mockCallbackCleanup).toHaveBeenCalledWith(2);
  });

  it('should not call the cleanup of the 1st render and the effect of the 2nd render if unchanged dependencies', () => {
    const { unmount, rerender } = renderHook(
      ({ callback, dependencies }) => {
        useBeforeMountEffect(callback, dependencies);
      },
      {
        initialProps: { callback: mockCallbackFactory(1), dependencies: [1] },
      },
    );

    // Check First render
    expect(mockCallbackOnRender).toHaveBeenCalledWith(1);
    expect(mockCallbackCleanup).toHaveBeenCalledTimes(0);
    mockCallbackOnRender.mockClear();

    // Check no re-render with same dependencies
    rerender({ callback: mockCallbackFactory(1), dependencies: [1] });
    expect(mockCallbackCleanup).not.toHaveBeenCalled();
    expect(mockCallbackOnRender).not.toHaveBeenCalled();

    unmount();
    expect(mockCallbackCleanup).toHaveBeenCalledWith(1);
  });

  it('should trigger the callback if the array of dependencies is undefined', () => {
    const { unmount, rerender } = renderHook(
      ({ callback, dependencies }) => {
        useBeforeMountEffect(callback, dependencies);
      },
      {
        initialProps: { callback: mockCallbackFactory(1), dependencies: undefined },
      },
    );

    expect(mockCallbackOnRender).toHaveBeenCalledWith(1);
    mockCallbackOnRender.mockClear();

    rerender({ callback: mockCallbackFactory(2), dependencies: undefined });
    expect(mockCallbackCleanup).toHaveBeenCalledTimes(1);
    expect(mockCallbackOnRender).toHaveBeenCalledWith(2);

    unmount();
    expect(mockCallbackCleanup).toHaveBeenCalledWith(2);
  });
});
