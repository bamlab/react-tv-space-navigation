# Accessibility

For now, accessibility support is experimental with the library.
Here's a video of what we could achieve.

![talkback](./talkback.gif)

Since we bypass the native focus, and the screen readers rely on the native elements, it's a difficult topic.

The `SpatialNavigatioNFocusableView` that you can use integrate basic accessibility props relevant to make the library work with TalkBack (Android only).

The two main caveats are :

- Your elements will still be focusable, but the user will need to press
  enter to grab focus on an element, which is not standard at all.
- You might need to add the props `accessible` on `SpatialNavigationFocusableView` children. For example, focusable images won't work without it. You can check it out in the example, in the `Program.tsx` component.

We could not find a way to properly intercept the accessibility focus event, even with a React Native patch.

Help is welcome 🙂
