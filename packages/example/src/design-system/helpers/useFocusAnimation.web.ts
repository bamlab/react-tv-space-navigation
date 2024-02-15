export const useFocusAnimation = (isFocused: boolean) => {
  return {
    transition: 'transform 0.4s ease-in-out',
    transform: [{ scale: isFocused ? 1.1 : 1 }],
  };
};
