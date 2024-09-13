export const throttle = (
  callback: { (): void; (...arg0: unknown[]): void },
  delay: number | undefined,
) => {
  let wait = false;

  return (...args: unknown[]) => {
    if (wait) {
      return;
    }

    callback(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};
