import { RenderResult, fireEvent } from '@testing-library/react-native';

export const setComponentLayoutSize = (
  listTestId: string,
  component: RenderResult,
  size: { width: number; height: number },
) => {
  const listElementSizeGiver = component.getByTestId(listTestId + '-size-giver');

  fireEvent(listElementSizeGiver, 'layout', {
    nativeEvent: { layout: { width: size.width, height: size.height } },
  });
};
