# Right-to-left layouts

A TV app translated into Arabic, Hebrew, Farsi or Urdu runs with a mirrored layout
(`I18nManager.isRTL === true`): Yoga lays every row out from the right, and React Native
rewrites `left` as `right` in the whole tree.

Two things have to follow that direction in a spatially navigated app: the **layout** of the
horizontal virtualized lists, which this library owns, and the **remote control mapping**, which
your app owns.

## What the library does

A horizontal `SpatialNavigationVirtualizedList` lays its items out from the right edge and scrolls
leftwards when the layout is mirrored. This is automatic on native, where the list reads
`I18nManager.isRTL`.

Nothing else in the library needs to know about the reading direction:

- **vertical lists** translate on the Y axis and are never mirrored;
- the **rows of a grid** are flex rows, so Yoga mirrors them on its own;
- the **default focus** stays on index 0, which a mirrored layout draws at the right edge, the
  first item in reading order.

### On the web

`I18nManager` carries no direction on react-native-web (the layout direction comes from the DOM),
so a list defaults to a left-to-right layout there. Pass the `rtl` prop explicitly if your web app
renders in a right-to-left direction.

## What your app has to do: the remote control mapping

LRUD, the engine under the library, navigates by **logical index**, and never measures a layout:

```js
// @bam.tech/lrud
var offset = direction === Directions.LEFT || direction === Directions.UP ? -1 : 1;
```

`RIGHT` therefore means "next sibling in the tree", which a mirrored layout draws on the **left** of
the screen. Left as is, pressing right on the remote moves the focus to the left.

Swap the two horizontal directions in your `configureRemoteControl` mapping, which is the single
place where a key becomes a direction:

```jsx
const mapping = {
  ArrowRight: I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT,
  ArrowLeft: I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT,
  ArrowUp: Directions.UP,
  ArrowDown: Directions.DOWN,
};
```

`UP` and `DOWN` are never swapped: the mirror is horizontal.

## Lists that must stay left-to-right in a mirrored app

Some surfaces are not mirrored even in Arabic, and are usually pinned with `direction: 'ltr'` on an
ancestor view:

- **playback controls**, which follow the direction of the tape rather than the reading direction;
- a **time axis** (an EPG grid, a timeline), since time flows to the right in every culture.

React Native decides the `left`/`right` rewriting **once, at the root of the surface**, so inside
such a subtree the items of a list keep their `left: 0` anchor on the left. The library cannot see
the resolved direction of a subtree from JavaScript: tell it with `rtl={false}`, otherwise its
items are pushed off screen.

```jsx
<View style={{ direction: 'ltr' }}>
  <SpatialNavigationVirtualizedList
    data={dates}
    renderItem={renderDate}
    itemSize={120}
    orientation="horizontal"
    // This strip is a time axis: it is not mirrored, so neither is its layout.
    rtl={false}
  />
</View>
```

The same prop takes a `true` if you mirror a subtree of an otherwise left-to-right app.

## Scope

The mirrored layout covers the horizontal virtualized lists, on the three scroll behaviours.
Everything else is either direction-agnostic (vertical lists, the rows of a grid, which Yoga
mirrors on its own) or up to your app: the remote control mapping above, and the subtrees you
choose to pin left-to-right.
