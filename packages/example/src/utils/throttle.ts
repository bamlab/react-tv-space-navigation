export const throttle = (callback, delay) => {
  let wait = false;

  return (...args) => {
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
