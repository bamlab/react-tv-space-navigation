export type CustomScrollViewRef = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Already undocumented in RN https://github.com/facebook/react-native/blob/1c1c8335db2494672cf955cf4db574e23fd2198a/packages/react-native/Libraries/Components/ScrollView/ScrollView.d.ts#L861
  getInnerViewNode: () => any;
  scrollTo: (args: { x?: number; y?: number; animated: boolean }) => void;
};
