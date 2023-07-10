# Tutorial

### Configure the keyboard

The keys depend on the platform.
It's up to you to add event listeners to your keyboard and map
them correctly depending on the platform.

Here's an example for the web platform. You can check out more platforms
in the repo example.

```tsx
import {
  Directions,
  SpatialNavigation,
} from 'react-native-tv-spatial-navigation';

SpatialNavigation.configureKeyboard({
  keyboardSubscriber: callback => {
    const mapping = {
      ArrowRight: Directions.RIGHT,
      ArrowLeft: Directions.LEFT,
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
      Enter: Directions.ENTER,
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

### Set-up a spatial navigation root

You can now create your page.

```tsx
const Element = () => <View><Text>Page element</Text></View>

const Page = () => {
    return (
        <SpatialNavigationRoot>
            <Element />
            <Element />
        </SpatialNavigationRoot>
    )
}
```

### Add spatial navigation nodes

```tsx
const Element = () => (
    <SpatialNavigationNode>
        <View>
            <Text>Page element</Text>
        </View>
    </SpatialNavigationNode>
)

const Page = () => {
    return (
        <SpatialNavigationRoot>
            <Element />
            <Element />
        </SpatialNavigationRoot>
    )
}
```

### Make them focusable

```tsx
const Element = () => (
    <SpatialNavigationNode isFocusable>
        {({ isFocusable }) =>  (
            <View style={isFocusable && { backgroundColor: 'green' }}>
                <Text>Page element</Text>
            </View>
        )}
    </SpatialNavigationNode>
)

const Page = () => {
    return (
        <SpatialNavigationRoot>
            <Element />
            <Element />
        </SpatialNavigationRoot>
    )
}
```

### Add behaviour when you select an element

Simply add an `onSelect` props to a node, very similarly as if you were adding a `onPress` props.

```tsx
const Element = ({ onSelect }) => (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
        {({ isFocusable }) =>  (
            <View style={isFocusable && { backgroundColor: 'green' }}>
                <Text>Page element</Text>
            </View>
        )}
    </SpatialNavigationNode>
)

const Page = () => {
    return (
        <SpatialNavigationRoot>
            <Element onSelect={() => console.log('selected first element')} />
            <Element onSelect={() => console.log('selected second element')} />
        </SpatialNavigationRoot>
    )
}
```

### Add a Default Focus

To add a default focus, wrap the group of elements that you want the default focus to be on.

```tsx
const Element = ({ onSelect }) => (
    <SpatialNavigationNode isFocusable onSelect={onSelect}>
        {({ isFocusable }) =>  (
            <View style={isFocusable && { backgroundColor: 'green' }}>
                <Text>Page element</Text>
            </View>
        )}
    </SpatialNavigationNode>
)

const Page = () => {
    return (
        <SpatialNavigationRoot>
            <Element onSelect={() => console.log('selected first element')} />
            <DefaultFocus>
                <Element onSelect={() => console.log('selected second element')} />
            </DefaultFocus>
        </SpatialNavigationRoot>
    )
}
```



## Pitfalls

- If navigation elements are conditionnally visible, it is necessary to wrap them with a node that will always be present. Otherwise the registering of the elements might change

```tsx
// DO
const MyCardElement = () => {
    return (
        <View>
            <Text>Title</Text>
            <SpatialNavigationNode>
                {isVisible && <Element />}
            </SpatialNavigationNode>
        </View>
    )
}

// DON'T
const MyCardElement = () => {
    return (
        <View>
            <Text>Title</Text>
            {isVisible && <Element />}
        </View>
    )
}
```
