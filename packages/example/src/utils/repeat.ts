export const repeat = (callback: () => void, delay: number, repetitions: number) => {
  let repeatsLeft = repetitions;

  const interval = setInterval(() => {
    if (repeatsLeft === 0) {
      clearInterval(interval);
      return;
    }
    callback();
    repeatsLeft--;
  }, delay);
};
