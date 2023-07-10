# API

- [SpatialNavigationRoot](#spatialnavigationroot)
- [SpatialNavigationNode](#spatialnavigationnode)
- [SpatialNavigationScrollView](#spatialnavigationscrollview)
- [SpatialNavigationView](#spatialnavigationview)
- [DefaultFocus](#defaultfocus)
- [configureKeyboard](#configurekeyboard)

# SpatialNavigationRoot

The `SpatialNavigationRoot` is the root component that contains all the spatial navigation nodes. It manages the context providers and handles the registration and unregistration of the root node. This component is also responsible for locking or unlocking the root spatial navigator based on its activity state.

## Props

The `SpatialNavigationRoot` component receives the following props:

| Name       | Type        | Default | Description                                                                                                                                                                                                                                 |
| ---------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isActive` | `boolean`   | `true`  | Determines if the spatial navigation is active. If `false`, the spatial navigation will be locked, and no nodes can be focused. This is useful to handle a multi page app: you can disable the non-focused pages' spatial navigation roots. |
| `children` | `ReactNode` | `null`  | Child elements of the component. They are expected to be one or multiple `SpatialNavigationNode` elements.                                                                                                                                  |

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
| `onSelect`    | `function`                  | `undefined`  | Callback function to be called when the node is selected.                                                                                                                                                                                                     |
| `orientation` | `'vertical' \| 'horizontal` | `'vertical'` | Determines the orientation of the node.                                                                                                                                                                                                                       |
| `isFocusable` | `boolean`                   | `false`      | Determines if the node is focusable or not. If it's `true`, the `children` prop must be a function that returns a React element and accepts a parameter with a `isFocused` property. If it's `false` or not provided, `children` can be any valid React node. |
| `children`    | `function` or `ReactNode`   | `null`       | Child elements of the component. It can be a function that returns a React element and accepts a parameter with a `isFocused` property when `isFocusable` is `true`. If `isFocusable` is `false` or not provided, it can be any valid React node.             |

## Usage

```jsx
<SpatialNavigationNode
  onFocus={() => console.log("Node gained focus")}
  onSelect={() => console.log("Node was selected")}
  orientation="horizontal"
  isFocusable={true}
>
  {({ isFocused }) => <Text style={{ color: isFocused ? "red" : "black" }}>Hello World!</Text>}
</SpatialNavigationNode>
```

## Important note

The SpatialNavigationNode will use the ref of your component to handle the scrolling.
You might need to forward the ref to the closest inner view of your component.

```tsx
export const MyFocusableComponent = React.forwardRef<View, MyFocusableComponentProps>(({ isFocused  }, ref) => {
  // ...

  return (
    // pass the ref to the relevant View in your component.
    <View ref={ref}>
      <YourOtherElements />
    </View>
  );
});
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
    {({ isFocused }) => <Text style={{ color: isFocused ? "red" : "black" }}>Hello World!</Text>}
  </SpatialNavigationNode>
);

<SpatialNavigationScrollView horizontal={true} style={{ padding: 20 }} offsetFromStart={10}>
  <FocusableNode />
  <FocusableNode />
  <FocusableNode />
  <FocusableNode />
</SpatialNavigationScrollView>
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
    {({ isFocused }) => <Text style={{ color: isFocused ? "red" : "black" }}>Hello World!</Text>}
  </SpatialNavigationNode>
);

<SpatialNavigationView direction="horizontal">
  {/* Nodes will be horizontal, and flex view will be row */}
  <FocusableNode />
  <FocusableNode />
  <FocusableNode />
</SpatialNavigationView>
```

In this example, a `SpatialNavigationView` is created with vertical direction and a padding of 20 pixels provided by the style prop. It contains a single `SpatialNavigationNode`. When the node gains focus, the navigation adjusts according to the orientation.

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
    {({ isFocused }) => <Text style={{ color: isFocused ? "red" : "black" }}>Hello World!</Text>}
  </SpatialNavigationNode>
);

<SpatialNavigationRoot>
  <FocusableNode />
  <FocusableNode />
  <DefaultFocus enable={true}>
    <FocusableNode />
  </DefaultFocus>
  <FocusableNode />
</SpatialNavigationRoot>
```

In the example above, the third node will get the default focus when mounting our page.

# configureKeyboard

The Keyboard Configuration API is used to configure the remote control interaction for the `SpatialNavigation` components.

## Parameters

This object has two methods:

- `keyboardSubscriber: (direction: Direction) => TSubscriber`: A function that takes a callback as an argument. This callback is meant to be invoked with a `Direction` enum value whenever a keyboard event that should change the focus occurs. The function should return a subscriber identifier that can be used to unsubscribe the event listener.
- `keyboardUnsubscriber: (subscriber: TSubscriber) => void`: A function that takes the subscriber identifier returned by `keyboardSubscriber` as an argument. This function is meant to remove the keyboard event listener associated with the given identifier.

The `TSubscriber` type can be any type, it is meant to be determined by the implementation of `keyboardSubscriber` and `keyboardUnsubscriber`.

## Usage

Here is an example for the web. You will have to configure it differently for AndroidTV or tvOS.

```jsx
SpatialNavigation.configureKeyboard({
  keyboardSubscriber: callback => {
    const mapping = {
      ArrowRight: Directions.RIGHT,
      ArrowLeft: Directions.LEFT,
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
    };

    const eventId = window.addEventListener('keydown', keyEvent => {
      callback(mapping[keyEvent.code]);
    });

    return eventId;
  },

  keyboardUnsubscriber: eventId => {
    window.removeEventListener('keydown', eventId);
  },
});
```

In this example, the arrow keys are used to navigate.
The 'keydown' event listener invokes the callback with a mapped `Direction` corresponding to the key that was pressed.
It returns an event identifier that can be used to remove the event listener later,
ensuring that the component will clean up after itself when it is no longer needed.