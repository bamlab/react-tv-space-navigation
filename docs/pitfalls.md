# Pitfalls

If navigation elements are conditionnally visible, it is necessary to wrap them with a node that will always be present. Otherwise the registering of the elements might change

```tsx
// DO
const MyCardElement = () => {
  return (
    <View>
      <Text>Title</Text>
      <SpatialNavigationNode>{isVisible && <Element />}</SpatialNavigationNode>
    </View>
  );
};

// DON'T
const MyCardElement = () => {
  return (
    <View>
      <Text>Title</Text>
      {isVisible && <Element />}
    </View>
  );
};
```
