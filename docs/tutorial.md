# Tutorial

First, you should install the npm package. There should be no other dependencies.

```
npm install react-tv-space-navigation
# or
yarn add react-tv-space-navigation
```

### Configure the remote control

The keys depend on the platform.
It's up to you to add event listeners to your remote control and map
them correctly depending on the platform.

Here's an example for the web platform. You can check out more platforms
in the repo example.

```tsx
import { Directions, SpatialNavigation } from 'react-tv-space-navigation';

SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    const mapping = {
      ArrowRight: Directions.RIGHT,
      ArrowLeft: Directions.LEFT,
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
      Enter: Directions.ENTER,
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

### Set-up a spatial navigation root

You can now create your page.

```diff
const Element = () => (
  <View>
    <Text>Page element</Text>
  </View>
);

const Page = () => {
  return (
+    <SpatialNavigationRoot>
      <Element />
      <Element />
+    </SpatialNavigationRoot>
  );
};
```

### Add spatial navigation nodes

```diff
const Element = () => (
+  <SpatialNavigationNode>
    <View>
      <Text>Page element</Text>
    </View>
+  </SpatialNavigationNode>
);

const Page = () => {
  return (
    <SpatialNavigationRoot>
      <Element />
      <Element />
    </SpatialNavigationRoot>
  );
};
```

### Make them focusable

```diff
const Element = () => (
-  <SpatialNavigationNode>
+  <SpatialNavigationNode isFocusable>
+    {({ isFocused }) => (
-      <View>
+      <View style={isFocused && { backgroundColor: 'green' }}>
        <Text>Page element</Text>
      </View>
+    )}
  </SpatialNavigationNode>
);

const Page = () => {
  return (
    <SpatialNavigationRoot>
      <Element />
      <Element />
    </SpatialNavigationRoot>
  );
};
```

### Add behaviour when you select an element

Simply add an `onSelect` props to a node, very similarly as if you were adding a `onPress` props.

```diff
const Element = ({ onSelect }) => (
-  <SpatialNavigationNode isFocusable>
+  <SpatialNavigationNode isFocusable onSelect={onSelect}>
    {({ isFocused }) => (
      <View style={isFocused && { backgroundColor: 'green' }}>
        <Text>Page element</Text>
      </View>
    )}
  </SpatialNavigationNode>
);

const Page = () => {
  return (
    <SpatialNavigationRoot>
-      <Element />
-      <Element />
+      <Element onSelect={() => console.log('selected first element')} />
+      <Element onSelect={() => console.log('selected second element')} />
    </SpatialNavigationRoot>
  );
};
```

### Add a Default Focus

To add a default focus, wrap the group of elements that you want the default focus to be on.

```diff
const Element = ({ onSelect }) => (
  <SpatialNavigationNode isFocusable onSelect={onSelect}>
    {({ isFocused }) => (
      <View style={isFocused && { backgroundColor: 'green' }}>
        <Text>Page element</Text>
      </View>
    )}
  </SpatialNavigationNode>
);

const Page = () => {
  return (
    <SpatialNavigationRoot>
      <Element onSelect={() => console.log('selected first element')} />
+      <DefaultFocus>
        <Element onSelect={() => console.log('selected second element')} />
+      </DefaultFocus>
    </SpatialNavigationRoot>
  );
};
```

### Add a ScrollView

You will probably need an app where your content is larger than your screen. You can use the spatial scroll view to handle this.
Check out the [ScrollView API docs](https://github.com/bamlab/react-tv-space-navigation/blob/main/docs/api.md#spatialnavigationscrollview)

### Add a VirtualizedList

See the [API documentation for VirtualizedLists](./api.md#spatialnavigationvirtualizedlist).

### Handling a side menu

You can check out the example app for this.

Usually, when we integrate a side menu in a TV app, it should be persisted across pages.
It is an element on the border of the screen that is above the root view.

It would be super hard to handle it this way:
- integrate the nodes of this menu into the existing Spatial Navigator instance of a given page
- the user goes to another page
- keep the menu mounted on the left, but move its nodes to the Spatial Navigator instance of the new page ❌

To solve this, here's a solution:
- create a spatial navigator dedicated to the menu itself
- don't touch each page's spatial navigator
- add an event that detects when we're going off-screen with the remote controller
- add a wrapper above the app that detects that if we're going off-screen to the left on a screen, we should disable our page's navigator and enable our menu's navigator (and vice-versa)

> You can use `onDirectionHandledWithoutMovement` and `isActive` of `SpatialNavigationRoot` to do so

And tada 🎉

![handling the menu](./menu-handling.png)
