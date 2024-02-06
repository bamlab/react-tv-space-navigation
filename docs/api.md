# API

- [SpatialNavigationRoot](#spatialnavigationroot)
- [SpatialNavigationNode](#spatialnavigationnode)
- [SpatialNavigationScrollView](#spatialnavigationscrollview)
- [SpatialNavigationView](#spatialnavigationview)
- [SpatialNavigationVirtualizedList](#spatialnavigationvirtualizedlist)
- [SpatialNavigationVirtualizedGrid](#spatialnavigationvirtualizedgrid)
- [DefaultFocus](#defaultfocus)
- [configureRemoteControl](#configureremotecontrol)
- [useSpatialNavigatorFocusableAccessibilityProps](#usespatialnavigatorfocusableaccessibilityprops)
- [useLockSpatialNavigation](#uselockspatialnavigation)

# SpatialNavigationRoot

The `SpatialNavigationRoot` is the root component that contains all the spatial navigation nodes. It manages the context providers and handles the registration and unregistration of the root node. This component is also responsible for locking or unlocking the root spatial navigator based on its activity state.

## Props

The `SpatialNavigationRoot` component receives the following props:

| Name       | Type        | Default | Description                                                                                                                                                                                                                                 |
| ---------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isActive` | `boolean`   | `true`  | Determines if the spatial navigation is active. If `false`, the spatial navigation will be locked, and no nodes can be focused. This is useful to handle a multi page app: you can disable the non-focused pages' spatial navigation roots. |
| `onDirectionHandledWithoutMovement` | `(direction: Direction) => void` | `undefined`  | Called when you're reaching a border of the navigator. A use case for this would be the implementation of a side menu that's shared between pages. You can have a separate navigator for your side menu, which would be common across pages, and you'd make this menu active when you reach the left side of your page navigator. |
| `children` | `ReactNode` | `null`  | |

## Usage

```jsx
<SpatialNavigationRoot>
  <SpatialNavigationNode>
    <Text>Hello World!</Text>
  </SpatialNavigationNode>
</SpatialNavigationRoot>
```

# SpatialNavigationNode

The SpatialNavigationNode is a component that can be used to handle spatial navigation in a React application.
It helps with describing the spatial layout of the components, and what to do when they are focused or selected.

## Props

The `SpatialNavigationNode` component receives the following props:

| Name          | Type                        | Default      | Description                                                                                                                                                                                                                                                   |
| ------------- | --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onFocus`     | `function`                  | `undefined`  | Callback function to be called when the node gains focus.                                                                                                                                                                                                     |
| `onBlur`      | `function`                  | `undefined`  | Callback function to be called when the node loses focus.                                                                                                                                                                                                     |
| `onSelect`    | `function`                  | `undefined`  | Callback function to be called when the node is selected.                                                                                                                                                                                                     |
| `orientation` | `'vertical' \| 'horizontal` | `'vertical'` | Determines the orientation of the node.                                                                                                                                                                                                                       |
| `isFocusable` | `boolean`                   | `false`      | Determines if the node is focusable or not. If it's `true`, the `children` prop must be a function that returns a React element and accepts a parameter with a `isFocused` property. If it's `false` or not provided, `children` can be any valid React node. |

| `alignInGrid` | `boolean`                   | `false`      | Determines whether child lists should behave like a grid.

| `indexRange`  | `number[]`                  | `undefined`  | Determines the indexes when using long nodes in a grid. If a grid row has one `indexRange`, you should specify each element's `indexRange`. You can check for more details in [`GridWithLongNodesPage`](https://github.com/bamlab/react-tv-space-navigation/blob/31bfe1def4a7e18e9e41f26a520090d1b7a5b149/packages/example/src/pages/GridWithLongNodesPage.tsx) example or in [lrud documentation](https://github.com/bbc/lrud/blob/master/docs/usage.md#indexrange). 

| `children`    | `function` or `ReactNode`   | `null`       | Child elements of the component. It can be a function that returns a React element and accepts a parameter with a `isFocused` property when `isFocusable` is `true`. If `isFocusable` is `false` or not provided, it can be any valid React node.             |

## Usage

```jsx
<SpatialNavigationNode
  onFocus={() => console.log('Node gained focus')}
  onSelect={() => console.log('Node was selected')}
  orientation="horizontal"
  isFocusable={true}
>
  {({ isFocused }) => <Text style={{ color: isFocused ? 'red' : 'black' }}>Hello World!</Text>}
</SpatialNavigationNode>
```

## Important note

The SpatialNavigationNode will use the ref of your component to handle the scrolling.
You might need to forward the ref to the closest inner view of your component.

```tsx
export const MyFocusableComponent = React.forwardRef<View, MyFocusableComponentProps>(
  ({ isFocused }, ref) => {
    // ...

    return (
      // pass the ref to the relevant View in your component.
      <View ref={ref}>
        <YourOtherElements />
      </View>
    );
  },
);
```

# SpatialNavigationScrollView

The `SpatialNavigationScrollView` is a component that wraps a ScrollView to manage spatial navigation.
It scrolls the ScrollView so that the currently focused element is visible on the screen.
It also ensures that the scroll event is propagated properly for parent ScrollViews when nested scrolling is required.

## Props

The `SpatialNavigationScrollView` component receives the following props:

| Name              | Type        | Default | Description                                                                                                                                   |
| ----------------- | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontal`      | `boolean`   | `false` | Determines if the scrolling orientation is horizontal. If `false`, the scrolling orientation will be vertical.                                |
| `offsetFromStart` | `number`    | `0`     | This offset is used to prevent the element from sticking too closely to the edges of the screen during scrolling. This is a margin in pixels. |
| `style`           | `ViewStyle` | `null`  | Style for the ScrollView. This can be any valid React Native style object.                                                                    |
| `children`        | `ReactNode` | `null`  | Child elements of the component. They are expected to be one or multiple `SpatialNavigationNode` elements.                                    |

## Usage

```jsx
const FocusableNode = () => (
  <SpatialNavigationNode isFocusable={true}>
    {({ isFocused }) => <Text style={{ color: isFocused ? 'red' : 'black' }}>Hello World!</Text>}
  </SpatialNavigationNode>
);

<SpatialNavigationScrollView horizontal={true} style={{ padding: 20 }} offsetFromStart={10}>
  <FocusableNode />
  <FocusableNode />
  <FocusableNode />
  <FocusableNode />
</SpatialNavigationScrollView>;
```

# SpatialNavigationView

The `SpatialNavigationView` component is a simple wrapper component that contains a `SpatialNavigationNode`.
This component allows you to describe the orientation along with the style of the `SpatialNavigationNode` and its children.

## Props

The `SpatialNavigationView` component receives the following props:

| Name        | Type                         | Default        | Description                                                                                                |
| ----------- | ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | The orientation of the `SpatialNavigationNode`.                                                            |
| `style`     | `ViewStyle`                  | `null`         | Style for the View. This can be any valid React Native style object.                                       |
| `children`  | `ReactNode`                  | `null`         | Child elements of the component. They are expected to be one or multiple `SpatialNavigationNode` elements. |

## Usage

```jsx
const FocusableNode = () => (
  <SpatialNavigationNode isFocusable={true}>
    {({ isFocused }) => <Text style={{ color: isFocused ? 'red' : 'black' }}>Hello World!</Text>}
  </SpatialNavigationNode>
);

<SpatialNavigationView direction="horizontal">
  {/* Nodes will be horizontal, and flex view will be row */}
  <FocusableNode />
  <FocusableNode />
  <FocusableNode />
</SpatialNavigationView>;
```

In this example, a `SpatialNavigationView` is created with vertical direction and a padding of 20 pixels provided by the style prop. It contains a single `SpatialNavigationNode`. When the node gains focus, the navigation adjusts according to the orientation.

# SpatialNavigationVirtualizedList

The `SpatialNavigationVirtualizedList` component is a custom implementation of a Virtulized List with spatial navigation.
It is based on an Animated View that grows with newly rendered elements and translates horizontally or vertically to scroll.
It also ensures that the scroll event is propagated properly to parent ScrollViews or VirtualizedLists when nested scrolling is required.

## Props

| Name                               | Type                                                     | Description                                                                                                                                                                                                                                                               |
| ---------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                             | `Array<T>`                                               | The array of data items to render.                                                                                                                                                                                                                                        |
| `renderItem`                       | `(args: { item: T }) => JSX.Element`                     | A function that returns the JSX element to render for each item in the data array. The function receives an object with the item as a parameter.                                                                                                                          |
| `itemSize`                         | `number`                                                 | If vertical, the height of an item; otherwise, the width.                                                                                                                                                                                                                 |
| `numberOfRenderedItems`            | `number`                                                 | The number of items to be rendered (virtualization size).                                                                                                                                                                                                                 |
| `numberOfItemsVisibleOnScreen`     | `number`                                                 | The number of items visible on the screen. This helps determine how to slice the data and when to stop the scroll at the end of the list.                                                                                                                                 |
| `onEndReached`                     | `() => void`                                             | An optional callback function that is called when the user reaches the end of the list.                                                                                                                                                                                   |
| `onEndReachedThresholdItemsNumber` | `number`                                                 | The number of items left to display before triggering the `onEndReached` callback. Defaults to 3.                                                                                                                                                                         |
| `style`                            | `ViewStyle`                                              | Custom style to be applied to the VirtualizedList container.                                                                                                                                                                                                              |
| `orientation`                      | `'horizontal' \| 'vertical'`                             | The orientation of the list. Defaults to `'horizontal'`.                                                                                                                                                                                                                  |
| `nbMaxOfItems`                     | `number`                                                 | The total number of expected items for infinite scroll. This helps with aligning items and is used for pagination. If not provided, it defaults to the length of the data array.                                                                                          |
| `scrollDuration`                   | `number`                                                 | The duration of a scrolling animation inside the VirtualizedList. Defaults to 200ms.                                                                                                                                                                                      |
| `scrollBehavior`                   | `'stick-to-start' \| 'stick-to-end' \| 'jump-on-scroll'` | Determines the scrolling behavior. Defaults to `'stick-to-start'`. `'stick-to-start'` and `'stick-to-end'` fix the focused item at the beginning or the end of the visible items on screen. `jump-on-scroll` jumps from `numberOfItemsVisibleOnScreen` items when needed. |
| `height`                           | `number`                                                 | Custom height for the VirtualizedList container. Defaults to the screen height.                                                                                                                                                                                           |
| `width`                            | `number`                                                 | Custom width for the VirtualizedList container. Defaults to the screen width.                                                                                                                                                                                             |

## Usage

```jsx
import { VirtualizedList } from 'path/to/VirtualizedList';

// Example data
const data = [
  { index: 0, name: 'Item 1' },
  { index: 1, name: 'Item 2' },
  { index: 2, name: 'Item 3' },
  // ...
];

const renderItem = ({ item }) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

const MyComponent = () => {
  return (
    <VirtualizedList
      data={data}
      renderItem={renderItem}
      itemSize={50}
      numberOfRenderedItems={10}
      numberOfItemsVisibleOnScreen={5}
      onEndReached={() => {
        // Handle reaching the end of the list
        // you might trigger your backend pagination for example
      }}
      style={styles.container}
      orientation="horizontal"
    />
  );
};
```

# SpatialNavigationVirtualizedGrid

The `SpatialNavigationVirtualizedGrid` component is a specific case of a Virtulized List with spatial navigation,
that renders rows of items instead of simple items.
A grid is a series of horizontal rows rendering 'numberOfColumns' items.
VirtualizedGrids only support vertical orientation (vertically scrollable), but you can navigate between elements in any direction.

## Props

| Name                              | Type                                                     | Description                                                                                                                                                                                                                                                             |
| --------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                            | `Array<T>`                                               | The array of items to render in the grid.                                                                                                                                                                                                                               |
| `renderItem`                      | `(args: { item: T }) => JSX.Element`                     | A function that returns the JSX element to render for each item in the data array. The function receives an object with the item as a parameter.                                                                                                                        |
| `numberOfColumns`                 | `Number`                                                 | The number of columns in the grid or the number of items per row.                                                                                                                                                                                                       |
| `itemHeight`                      | `Number`                                                 | The height of each item in the grid.                                                                                                                                                                                                                                    |
| `numberOfRenderedRows`            | `Number`                                                 | How many rows are rendered (virtualization size).                                                                                                                                                                                                                       |
| `numberOfRowsVisibleOnScreen`     | `Number`                                                 | How many rows are visible on the screen (helps with knowing how to slice the data and stop the scroll at the end of the list).                                                                                                                                          |
| `onEndReachedThresholdRowsNumber` | `Number`                                                 | Number of rows left to display before triggering the onEndReached event.                                                                                                                                                                                                |
| `style`                           | `Object`                                                 | Used to modify the style of the grid.                                                                                                                                                                                                                                   |
| `nbMaxOfItems`                    | `Number`                                                 | The maximum number of items to render : used to compute the number of rows to render.                                                                                                                                                                                   |
| `rowContainerStyle`               | `Object`                                                 | Used to modify the style of each row in the grid.                                                                                                                                                                                                                       |
| `scrollDuration`                  | `number`                                                 | The duration of a scrolling animation inside the VirtualizedList. Defaults to `200` (ms).                                                                                                                                                                               |
| `scrollBehavior`                  | `'stick-to-start' \| 'stick-to-end' \| 'jump-on-scroll'` | Determines the scrolling behavior. Defaults to `'stick-to-start'`. `'stick-to-start'` and `'stick-to-end'` fix the focused row at the beginning or the end of the visible items on screen. `jump-on-scroll` jumps from `numberOfItemsVisibleOnScreen` rows when needed. |

## Example Usage

```jsx
import { SpatialNavigationVirtualizedGrid } from 'path/to/component';

// Define your data array and renderItem function
const data = [...];
const renderItem = ({ item }) => {
  return <ItemComponent item={item} />;
};

// Render the SpatialNavigationVirtualizedGrid component
<SpatialNavigationVirtualizedGrid
  data={data}
  renderItem={renderItem}
  numberOfColumns={3}
  itemHeight={100}
  numberOfRenderedRows={7}
  numberOfRowsVisibleOnScreen={3}
  onEndReachedThresholdRowsNumber={2}
  rowContainerStyle={{gap: 15}}
/>
```

# DefaultFocus

This allows to set a default focus state for the first spatial navigation node of a group of nodes.
The first node to be rendered in this sub-tree will grab the focus by default.

## Props

The `DefaultFocus` component receives the following props:

| Name       | Type        | Default | Description                                                                           |
| ---------- | ----------- | ------- | ------------------------------------------------------------------------------------- |
| `enable`   | `boolean`   | `true`  | If `true`, sets the default focus state to `true` for the children of this component. |
| `children` | `ReactNode` | `null`  | The child elements of the component.                                                  |

## Usage

```jsx
const FocusableNode = () => (
  <SpatialNavigationNode isFocusable={true}>
    {({ isFocused }) => <Text style={{ color: isFocused ? 'red' : 'black' }}>Hello World!</Text>}
  </SpatialNavigationNode>
);

<SpatialNavigationRoot>
  <FocusableNode />
  <FocusableNode />
  <DefaultFocus enable={true}>
    <FocusableNode />
  </DefaultFocus>
  <FocusableNode />
</SpatialNavigationRoot>;
```

In the example above, the third node will get the default focus when mounting our page.

# configureRemoteControl

The Remote Control Configuration API is used to configure the remote control interaction for the `SpatialNavigation` components.

## Parameters

This object has two methods:

- `remoteControlSubscriber: (direction: Direction) => TSubscriber`: A function that takes a callback as an argument. This callback is meant to be invoked with a `Direction` enum value whenever a remoteControl event that should change the focus occurs. The function should return a subscriber identifier that can be used to unsubscribe the event listener.
- `remoteControlUnsubscriber: (subscriber: TSubscriber) => void`: A function that takes the subscriber identifier returned by `remoteControlSubscriber` as an argument. This function is meant to remove the remoteControl event listener associated with the given identifier.

The `TSubscriber` type can be any type, it is meant to be determined by the implementation of `remoteControlSubscriber` and `remoteControlUnsubscriber`.

## Usage

Here is an example for the web. You will have to configure it differently for AndroidTV or tvOS.
You can check out how we've done it in the example project.

```jsx
SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    const mapping = {
      ArrowRight: Directions.RIGHT,
      ArrowLeft: Directions.LEFT,
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
    };

    const eventId = window.addEventListener('keydown', (keyEvent) => {
      callback(mapping[keyEvent.code]);
    });

    return eventId;
  },

  remoteControlUnsubscriber: (eventId) => {
    window.removeEventListener('keydown', eventId);
  },
});
```

In this example, the arrow keys are used to navigate.
The 'keydown' event listener invokes the callback with a mapped `Direction` corresponding to the key that was pressed.
It returns an event identifier that can be used to remove the event listener later,
ensuring that the component will clean up after itself when it is no longer needed.


# useSpatialNavigatorFocusableAccessibilityProps

> Check out the [accessibility state of the lib](./accessibility.md) for more info and a little demo.

This is a custom React hook that is used to provide suggested accessibility properties for a focusable component.
It contains the following workaround (which is not standard at all, but the best we could achieve with TalkBack...):
- if I focus an element using accessibility focus, nothing happens (unfortunately)
- to get our custom focus, I need to press enter first
- once our custom focus is on, if I press enter again then my element is selected

## Usage

```tsx
const Button = () => {
  // You can't use the hook directly in `FocusableButton` since it needs to access
  // the current SpatialNavigationNode's context
  const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();

  return <Button {...accessibilityProps}>My Button</Button>;
};

const FocusableButton = () => {
  // Do not put the hook here!
  return <SpatialNavigationNode isFocusable>{({isFocused}) => <Button isFocused={isFocused} />}</Button>
}
```

# useLockSpatialNavigation

This hook allows to control the lock of the remote control.
For example, it helps with workarounds regarding the native focus system
(I may want to disable the remote while the focus system has taken over)

## Usage

```tsx
const MyComponent = () => {
  const { lock, unlock } = useLockSpatialNavigation();

  // Doesn't really make sense to lock after selecting a button, but you get the idea
  return <Button onSelect={() => lock()} />
}
```
