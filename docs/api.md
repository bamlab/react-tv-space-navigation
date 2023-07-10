# API

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
