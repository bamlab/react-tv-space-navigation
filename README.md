# react-spatial-navigation

# What you can achieve

One of the goals of the lib is to have a simple and declarative API.
No need for hooks or dark shenanigans. You just simply declare components.

Here's the kind of code you'll be able to achieve:

```tsx
/**
 * A simple component that shows a rabbit program
 * We plug it to the Spatial Navigation easily using a Node
 */
const Rabbit = ({ onSelect }) => (
    <SpatialNavigationNode onSelect={onSelect}>
        {({ isFocused }) => <RabbitLayout isFocused={isFocused} />}
    </SpatialNavigationNode>
)

/**
 * We can as many nodes as we want. We group our rabbits in a horizontal spatial navigation view
 * to spatially describe a row layout
 * (it includes a spatial navigation node AND the horizontal styling for it)
 * 
 * We also want to scroll horizontally, so we add a horizontal scrollview.
 */
const RabbitRow = () => (
    <SpatialNavigationScrollView horizontal>
        <SpatialNavigationView direction="horizontal">
            {/* assuming you have rabbits data */}
            {rabbits.map((_, index) => <Rabbit onSelect={() => console.log('selected rabbit ', index)} />)}
        </SpatialNavigationView>
    </SpatialNavigationScrollView>
)

/**
 * Now I simply add a page with a Root node and a vertical scroll view to scroll through my rows.
 */
const Page = () => (
    <SpatialNavigationRoot>
        <SpatialNavigationScrollView>
            <RabbitRow />
            <RabbitRow />
            <RabbitRow />
            <RabbitRow />
            <RabbitRow />
            <RabbitRow />
        </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
)
```

# How to use

You should [follow the tutorial](./docs/tutorial.md).

# API documentation

You can have a look at [the documentation](./docs/api.md).

# Pitfalls

You should have a look at [the pitfalls](./docs/pitfalls.md).