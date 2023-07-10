# API

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

In the example above, we're creating a `SpatialNavigationNode` that logs a message to the console when it gains focus or gets selected. Its orientation is set to 'horizontal', and it is focusable. When the node has focus, the color of the text inside the `div` will be red. When it doesn't, the text will be black.


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
    {({ isFocused }) => <div style={{ color: isFocused ? "red" : "black" }}>Hello World!</div>}
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
    {({ isFocused }) => <div style={{ color: isFocused ? "red" : "black" }}>Hello World!</div>}
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