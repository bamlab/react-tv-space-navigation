import { updateVirtualNodeRegistration } from './updateVirtualNodeRegistration';

const mockAddNode = jest.fn();

describe('updateVirtualNodeRegistration', () => {
  it('should call the addNode as many time as there are new item', () => {
    const previousItems = ['a', 'b', 'c', 'd'];
    const currentItems = ['a', 'b', 'c', 'd', 'e', 'f'];

    updateVirtualNodeRegistration({
      previousItems,
      currentItems,
      addVirtualNode: mockAddNode,
      removeVirtualNode: jest.fn(),
    });

    expect(mockAddNode).toHaveBeenCalledTimes(2);
  });

  it('should not do anything if the array are the same', () => {
    const previousItems = ['a', 'b', 'c', 'd'];
    const currentItems = ['a', 'b', 'c', 'd'];

    updateVirtualNodeRegistration({
      previousItems,
      currentItems,
      addVirtualNode: mockAddNode,
      removeVirtualNode: jest.fn(),
    });

    expect(mockAddNode).not.toHaveBeenCalled();
  });
});
