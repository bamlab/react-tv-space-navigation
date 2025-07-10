## [](https://github.com/bamlab/react-tv-space-navigation/compare/v5.2.0...v) (2025-07-10)

## [5.2.0](https://github.com/bamlab/react-tv-space-navigation/compare/v5.1.2...v5.2.0) (2025-07-10)


### Features

* **VirtualizedGrid:** expose virtualized list ref in the virtualized grid (follow-up) ([#199](https://github.com/bamlab/react-tv-space-navigation/issues/199)) ([0815fb5](https://github.com/bamlab/react-tv-space-navigation/commit/0815fb567ad57de033717a585dde737108af06b7))

## [5.1.2](https://github.com/bamlab/react-tv-space-navigation/compare/v5.1.1...v5.1.2) (2025-07-10)


### Bug Fixes

* onEndReached does not fire in SpatialNavigationVirtualizedList. ([#190](https://github.com/bamlab/react-tv-space-navigation/issues/190)) ([b8344d1](https://github.com/bamlab/react-tv-space-navigation/commit/b8344d1655e7d984ec8605e7bcaf7979ac3c0a5b)), closes [#189](https://github.com/bamlab/react-tv-space-navigation/issues/189)

## [5.1.1](https://github.com/bamlab/react-tv-space-navigation/compare/v5.1.0...v5.1.1) (2025-03-06)


### Features

* **VirtualizedList:** provide a way to scroll without applying focus ([#160](https://github.com/bamlab/react-tv-space-navigation/issues/160)) ([0f49e1f](https://github.com/bamlab/react-tv-space-navigation/commit/0f49e1f917373bb1304de74a28e5400794df2e7e))


### Performance Improvements

* remove unnecessary state changes for isActive if not used ([#161](https://github.com/bamlab/react-tv-space-navigation/issues/161)) ([3c53f44](https://github.com/bamlab/react-tv-space-navigation/commit/3c53f44f0b91e06146df0b7c3a9d46f945d8a86b))

## [5.1.0](https://github.com/bamlab/react-tv-space-navigation/compare/v5.0.0...v5.1.0) (2024-10-15)


### ⚠ BREAKING CHANGES

* **lists:** make additionally rendered items less error prone (#163)

### Bug Fixes

* **lists:** make additionally rendered items less error prone ([#163](https://github.com/bamlab/react-tv-space-navigation/issues/163)) ([7b3f7ea](https://github.com/bamlab/react-tv-space-navigation/commit/7b3f7ead70f84112869d5a8e8273ff2bb3949a82))

## [5.0.0](https://github.com/bamlab/react-tv-space-navigation/compare/v4.0.1...v5.0.0) (2024-10-08)


### ⚠ BREAKING CHANGES

* **VirtualizedList:** remove numberOfElementsVisibleOnScreen and numberOfElementsRendered props (#153)

### Features

* add onLongSelect prop to Node ([7dfae9a](https://github.com/bamlab/react-tv-space-navigation/commit/7dfae9ae8e2c09c25c2d9f994506ec5c31b7be3a))
* **VirtualizedList:** remove numberOfElementsVisibleOnScreen and numberOfElementsRendered props ([#153](https://github.com/bamlab/react-tv-space-navigation/issues/153)) ([2268059](https://github.com/bamlab/react-tv-space-navigation/commit/22680599117c1e8874d7342ecfaa1f8f9e9691c8))

## [4.0.1](https://github.com/bamlab/react-tv-space-navigation/compare/v4.0.0...v4.0.1) (2024-09-13)


### Bug Fixes

* **lists:** fix imperative focus not working properly on android ([#149](https://github.com/bamlab/react-tv-space-navigation/issues/149)) ([e7a38ef](https://github.com/bamlab/react-tv-space-navigation/commit/e7a38efed930ab1f9e459307acf3466c052d6477))
* **lists:** range rendered in jump-on-scroll and stick-to-end ([#148](https://github.com/bamlab/react-tv-space-navigation/issues/148)) ([d9509dc](https://github.com/bamlab/react-tv-space-navigation/commit/d9509dc539018ff179d301615171e1d159dd2f54))

## [4.0.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.6.1...v4.0.0) (2024-08-01)


### ⚠ BREAKING CHANGES

* **scrollview:** add CSS scroll on ScrollView (#146)

### Features

* **scrollview:** add CSS scroll on ScrollView ([#146](https://github.com/bamlab/react-tv-space-navigation/issues/146)) ([cc9e4cd](https://github.com/bamlab/react-tv-space-navigation/commit/cc9e4cd35ea45be9959e0dcfbe057ecb40dae3df))

## [3.6.1](https://github.com/bamlab/react-tv-space-navigation/compare/v3.6.0...v3.6.1) (2024-05-27)


### Bug Fixes

* **lists:** fix imperative focus not always working on virtualized lists ([bec7a62](https://github.com/bamlab/react-tv-space-navigation/commit/bec7a62be5ba0d152b26a923e6cb3670fa7a3d8f))

## [3.6.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.5.0...v3.6.0) (2024-05-06)


### Features

* **core:** add isRootActive mechanism ([0d6d8f0](https://github.com/bamlab/react-tv-space-navigation/commit/0d6d8f0f44675bd19cd6886a4f7cee771c89763b))


### Bug Fixes

* remove error when recreating node ([c0f0e3d](https://github.com/bamlab/react-tv-space-navigation/commit/c0f0e3d7a1c2cb2febf2a7406281023e928216a8))

## [3.5.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.4.0...v3.5.0) (2024-04-30)


### Features

* **lists:** add index in renderItem arguments ([91e35df](https://github.com/bamlab/react-tv-space-navigation/commit/91e35dfcb24bcc6289672146ff5b421d6ec27210))


### Bug Fixes

* **lists:** fix lists not working properly with few elements with stick-to-start ([bd9d139](https://github.com/bamlab/react-tv-space-navigation/commit/bd9d1394759a399696d97041e2aee97e575aa256))

## [3.4.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.3.0...v3.4.0) (2024-04-19)


### Features

* expose ScrollView ref ([5f2bb3c](https://github.com/bamlab/react-tv-space-navigation/commit/5f2bb3c0ed616d07b80e08901f3ad11e0bfdc267))

## [3.3.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.2.0...v3.3.0) (2024-04-11)


### Bug Fixes

* **core:** fix double registering of elements ([ac64a63](https://github.com/bamlab/react-tv-space-navigation/commit/ac64a6384659dd9edebe4234c4ebd02c601c89db))
* race conditions with default focus ([656738d](https://github.com/bamlab/react-tv-space-navigation/commit/656738d00a05a739f58d560900808757e39a6cf5))

## [3.2.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.1.0...v3.2.0) (2024-04-09)


### Features

* Add onActive and onInactive props to SpatialNavigationNode ([e79c480](https://github.com/bamlab/react-tv-space-navigation/commit/e79c4804a088c47cc8060e927f52b151b658e1f8))
* nodes can take an additional scrolloffset ([b87654b](https://github.com/bamlab/react-tv-space-navigation/commit/b87654bb95137e83400204feea1cba2caef01248))

## [3.1.0](https://github.com/bamlab/react-tv-space-navigation/compare/v3.0.0...v3.1.0) (2024-03-28)


### Features

* Add imperative focus to SpatialNavigationView ([cad3e80](https://github.com/bamlab/react-tv-space-navigation/commit/cad3e80d4f31b9853bb95f3faa4439fac5c19940))

## [3.0.0](https://github.com/bamlab/react-tv-space-navigation/compare/v2.1.1...v3.0.0) (2024-03-22)


### ⚠ BREAKING CHANGES

* **core:** remove side effects from rendering cycles

### Bug Fixes

* **core:** remove side effects from rendering cycles ([d2a0ef2](https://github.com/bamlab/react-tv-space-navigation/commit/d2a0ef25f3df480aaa5818791ec7b8029d4f4d5a))
* prevent setting virtualized list size to zero ([df9d1c1](https://github.com/bamlab/react-tv-space-navigation/commit/df9d1c1a4b83c2ab49aa046b364fa08675f52e02))

## [2.1.1](https://github.com/bamlab/react-tv-space-navigation/compare/v2.1.0...v2.1.1) (2024-03-11)


### Bug Fixes

* **core:** export device type provider ([b99002c](https://github.com/bamlab/react-tv-space-navigation/commit/b99002c6bdec30b8732efae496bfdbc6b31d87f0))
* **core:** improve scroll view scrolling compatibility across platforms ([cc715e7](https://github.com/bamlab/react-tv-space-navigation/commit/cc715e73dd1aa983fbe1a77e213e8bee86968431))

## [2.1.0](https://github.com/bamlab/react-tv-space-navigation/compare/v2.0.0...v2.1.0) (2024-03-01)


### Features

* **accessibility:** add accessibility state to focusable views ([#80](https://github.com/bamlab/react-tv-space-navigation/issues/80)) ([375d01b](https://github.com/bamlab/react-tv-space-navigation/commit/375d01b0f83da245dbe7df59b4bb993e8faa5c3a))
* **lists:** add SpatialNavigationVirtualizedList ref ([75e5059](https://github.com/bamlab/react-tv-space-navigation/commit/75e5059b162982ec95fc390588ce49301fecfb2f))


### Bug Fixes

* **core:** Fix additional click on some tvs ([54d5e11](https://github.com/bamlab/react-tv-space-navigation/commit/54d5e110f0134c8ffa887cd9d15f911e66ea193d))

## [2.0.0](https://github.com/bamlab/react-tv-space-navigation/compare/v1.5.0...v2.0.0) (2024-02-28)


### Features

* add SpatialNavigationFocusableView ([fa62c33](https://github.com/bamlab/react-tv-space-navigation/commit/fa62c33fd00c36d2cbe0372e924941e1c8ee75fd))
* **core:** handle accessibility in focusable views ([#79](https://github.com/bamlab/react-tv-space-navigation/issues/79)) ([1d4bdcf](https://github.com/bamlab/react-tv-space-navigation/commit/1d4bdcfa622ca13fc7f215bf46aeb03997e26aac))
* **web:** handle TVs with web pointers ([111a375](https://github.com/bamlab/react-tv-space-navigation/commit/111a3753169f1461447826e5e8a86eeedccb546a))


### Bug Fixes

* **tests:** add default value to list size to not break list tests ([#77](https://github.com/bamlab/react-tv-space-navigation/issues/77)) ([3d02c5e](https://github.com/bamlab/react-tv-space-navigation/commit/3d02c5e9acb010681f658a530f5ea0eadf206822))

## [1.5.0](https://github.com/bamlab/react-tv-space-navigation/compare/v1.4.0...v1.5.0) (2024-02-19)


### Features

* add alignInGrid to SpatialNavigationView ([b496427](https://github.com/bamlab/react-tv-space-navigation/commit/b496427cdc11d2eae8bca169644e7db50217e1fd))
* add header handling to virtualized grids ([#64](https://github.com/bamlab/react-tv-space-navigation/issues/64)) ([c033b17](https://github.com/bamlab/react-tv-space-navigation/commit/c033b179cec5f8d9255b3e72512f09d8793296ed))
* expose SpatialNavigationNode ref ([0fce024](https://github.com/bamlab/react-tv-space-navigation/commit/0fce0249564dd28e38b484017bc93a7aa0a9e405))


### Bug Fixes

* add missing display name to list components ([#71](https://github.com/bamlab/react-tv-space-navigation/issues/71)) ([681488b](https://github.com/bamlab/react-tv-space-navigation/commit/681488b0db7dd30c8b2cc054341d53eb6d2acd28))

## [1.4.0](https://github.com/bamlab/react-tv-space-navigation/compare/v1.3.1...v1.4.0) (2024-02-15)


### Features

* add isActive props ([8549bed](https://github.com/bamlab/react-tv-space-navigation/commit/8549bede14010abdced6c32335d0c923949ed3ac))
* **lists:** handle different item sizes in virtualized list ([47775e3](https://github.com/bamlab/react-tv-space-navigation/commit/47775e3a54633db747adc727bb559016c5669698))
* **lists:** remove height and width props from virtualized list ([96e13b1](https://github.com/bamlab/react-tv-space-navigation/commit/96e13b1c4b329b0242198587a5c0dcdd3e7a7167))


### Bug Fixes

* **performance:** add missing useMemo on useSpatialNavigatorFocusableAccessibilityProps ([6b759c7](https://github.com/bamlab/react-tv-space-navigation/commit/6b759c7f648e9fdd86d9a82b75b7dce21fe26572))

## [1.3.1](https://github.com/bamlab/react-tv-space-navigation/compare/v1.3.0...v1.3.1) (2024-02-07)


### Features

* adding testId for virtualized list and grid ([53a8814](https://github.com/bamlab/react-tv-space-navigation/commit/53a8814070465ebdd5308131da735ece3d20ae7a))
* **core:** add indexRange props to SpatialNavigationNode ([bb5ee0d](https://github.com/bamlab/react-tv-space-navigation/commit/bb5ee0dcb7422a14c0191998da88b8e951e85c90))

## [1.3.0](https://github.com/bamlab/react-tv-space-navigation/compare/v1.1.1...v1.3.0) (2023-11-24)


### Features

* **core:** add lock mechanism ([941c296](https://github.com/bamlab/react-tv-space-navigation/commit/941c29609d433e8ad72d15fc8344e0b08419344c))
* **core:** add onBlur props to SpatialNavigationNode ([2d73227](https://github.com/bamlab/react-tv-space-navigation/commit/2d73227094c19a338f5c935631389437d2050a9b))
* **spatial-navigation:** add callback when key pressed but no movement ([c9a171c](https://github.com/bamlab/react-tv-space-navigation/commit/c9a171c50845b8356a35d018f19703029e333399))


### Bug Fixes

* **remote:** better lifecycles for remote control subscription ([#33](https://github.com/bamlab/react-tv-space-navigation/issues/33)) ([5c56ef0](https://github.com/bamlab/react-tv-space-navigation/commit/5c56ef06560467ee314be8b4e7cc9bca75b1c9bd))

## [1.1.1](https://github.com/bamlab/react-tv-space-navigation/compare/v1.1.0...v1.1.1) (2023-11-02)


### Bug Fixes

* **build:** do not minimize output ([402e24e](https://github.com/bamlab/react-tv-space-navigation/commit/402e24e734e2850575478ea56a854c1ca9040eb4))

## [1.1.0](https://github.com/bamlab/react-tv-space-navigation/compare/v1.0.4...v1.1.0) (2023-11-01)


### Features

* **accessibility:** add an experimental way to handle talkback accessibility ([e579ab7](https://github.com/bamlab/react-tv-space-navigation/commit/e579ab7285abbc65a2d5f740f3bd2ec15c89457f))

## [1.0.4](https://github.com/bamlab/react-tv-space-navigation/compare/v1.0.3...v1.0.4) (2023-10-25)


### Bug Fixes

* **dependencies:** put dependencies in the proper workspace ([d07afa2](https://github.com/bamlab/react-tv-space-navigation/commit/d07afa21a77ed0cdac47e16845f7ad2cedb67857))
* **typescript:** fix all strict errors ([74c3f88](https://github.com/bamlab/react-tv-space-navigation/commit/74c3f88e6fdb00c40956dd6e0d25ddcaeda34842))

## [1.0.3](https://github.com/bamlab/react-tv-space-navigation/compare/v1.0.2...v1.0.3) (2023-10-24)

## [1.0.2](https://github.com/bamlab/react-tv-space-navigation/compare/d2de3137f5d5085824eace46ed290fdeef473166...v1.0.2) (2023-07-27)


### Features

* add Box component ([7eac091](https://github.com/bamlab/react-tv-space-navigation/commit/7eac091ab6ee91cea1518b2129b680d0d49de16a))
* add component for Spacer ([fad666a](https://github.com/bamlab/react-tv-space-navigation/commit/fad666a32548bbec3a6893a9d45c2c512b308e1f))
* add empty native package ([7f432fe](https://github.com/bamlab/react-tv-space-navigation/commit/7f432fe7169ea3443740bd65d41f6214141477c6))
* add first navigation component in native package ([6b40840](https://github.com/bamlab/react-tv-space-navigation/commit/6b408403010d3ebd12a16311355627cb52866ff7))
* add infos for program and add function to find progrem by id ([e4da2bf](https://github.com/bamlab/react-tv-space-navigation/commit/e4da2bf3d310d7665d6eab5487c579fef638c728))
* add isLocked property to SN root and possibility to lock&unlock ([50cb834](https://github.com/bamlab/react-tv-space-navigation/commit/50cb834f157dd174bd2677e2555c368b07f8d552))
* add more nested rabbits ([1cdc267](https://github.com/bamlab/react-tv-space-navigation/commit/1cdc267d4607ac67dbfc19bf98eb40d5333e781d))
* add new Page component ([4eabd4a](https://github.com/bamlab/react-tv-space-navigation/commit/4eabd4a01a7fd047a0e3f2b9539782a0de508236))
* add page title to home page ([92750f2](https://github.com/bamlab/react-tv-space-navigation/commit/92750f2f561cbe13236f80ee8079a442d1029492))
* add prettier example ([5d5181a](https://github.com/bamlab/react-tv-space-navigation/commit/5d5181a47552eb293332f9d27bb428ca38282eeb))
* add react spatial navigation example ([dd99a4f](https://github.com/bamlab/react-tv-space-navigation/commit/dd99a4f0cfdb8bae9e0ea56143916f3b7afb5984))
* add Typography ([bd67262](https://github.com/bamlab/react-tv-space-navigation/commit/bd67262b645751e1dc71dfff5e57eeb02c40280f))
* adjust program list visible nodes number ([ee7afa7](https://github.com/bamlab/react-tv-space-navigation/commit/ee7afa7ea905091bdbf41f116649ffa970001e84))
* clean up home page design ([ad47c54](https://github.com/bamlab/react-tv-space-navigation/commit/ad47c545c1c132f219d8a22c53186af904d2fe36))
* create default focus context and apply to node ([6e137d4](https://github.com/bamlab/react-tv-space-navigation/commit/6e137d430c60426ebe016776222f1416ac779842))
* declare basic consts for theme ([9fb0c37](https://github.com/bamlab/react-tv-space-navigation/commit/9fb0c37cb9ee8abbbee49aaabe3236751a2ba5b9))
* embed the demo page in a navigator ([91ad353](https://github.com/bamlab/react-tv-space-navigation/commit/91ad35382154dea1c8f2e1f525157fd84652d2c5))
* **example:** add goBack key on web ([ba62428](https://github.com/bamlab/react-tv-space-navigation/commit/ba62428ae83217ef4d1df66745ccb84a4d7bfd5d))
* **example:** add react native keyevent ([d096f88](https://github.com/bamlab/react-tv-space-navigation/commit/d096f88537fbdad08da1848a82d5c6c964d1f2cb))
* improve UI of ProgramDetail page ([bee2c7a](https://github.com/bamlab/react-tv-space-navigation/commit/bee2c7a4793b606b026d6a9229e6290931c34e7d))
* navigate to another page on press enter ([c6a5a87](https://github.com/bamlab/react-tv-space-navigation/commit/c6a5a87e38272e6102bcecc78e927331962f8656))
* navigate to another page on press enter ([183b6c4](https://github.com/bamlab/react-tv-space-navigation/commit/183b6c4a2ecaa4c0963b9d2d1019170722dc14f7))
* **navigation:** add initial code and example ([d2de313](https://github.com/bamlab/react-tv-space-navigation/commit/d2de3137f5d5085824eace46ed290fdeef473166))
* **package:** add script for jest tests ([083794e](https://github.com/bamlab/react-tv-space-navigation/commit/083794ebf980eb2c438647b987095b1c6d9e45ac))
* pass program info to program detail page ([799cae6](https://github.com/bamlab/react-tv-space-navigation/commit/799cae6165455a58344d25f3d25cee93560be1ee))
* push new screen on the stack on each click of program node ([4fc43a5](https://github.com/bamlab/react-tv-space-navigation/commit/4fc43a59ff95a54895d15a498e453cfccf10e59e))
* **spatial-navigation:** add definition files ([d567490](https://github.com/bamlab/react-tv-space-navigation/commit/d567490dea6b5585b0a0e14b7eea69b84d030fbf))
* **spatial-navigation:** add spatial navigation scroll view ([2a21ac7](https://github.com/bamlab/react-tv-space-navigation/commit/2a21ac77fc4615dee752a711104aa77c138d0b24))
* **spatial-navigation:** add spatial navigation with custom virtualized list ([8647057](https://github.com/bamlab/react-tv-space-navigation/commit/8647057a153d88c5acfc52304f351f1c7a261bb4))
* **spatial-navigation:** change repo name ([66d9eba](https://github.com/bamlab/react-tv-space-navigation/commit/66d9ebae1cba30a3430dcd3eb369aa64f9892d9f))
* **spatial-navigator:** add ability to configure keypresses ([c3d31c9](https://github.com/bamlab/react-tv-space-navigation/commit/c3d31c9b7cea2bfe929b5b6ee3e2135bbb947e2d))
* use sample data for program nodes ([af926f7](https://github.com/bamlab/react-tv-space-navigation/commit/af926f7b54f28602494929caa521f1a9a56746c2))
* **virtualizedGrid:** add virtualizedGrid with spatial navigation ([aa2466b](https://github.com/bamlab/react-tv-space-navigation/commit/aa2466b4c79b46ddf71b16362ced02c3a3378336))
* **VirtualizedGrid:** allow scroll configuration for grids ([c1c2aee](https://github.com/bamlab/react-tv-space-navigation/commit/c1c2aeef93802789a79602ef356ada0aeaeaebe6))
* **VirtualizedGrid:** modify row container style with props ([0721dae](https://github.com/bamlab/react-tv-space-navigation/commit/0721dae240b78aea86ba428f2db2810f4ad7ba10))
* **VirtualizedList:** add index to unindexed data ([394a77f](https://github.com/bamlab/react-tv-space-navigation/commit/394a77fd31495833595e2a2c62645ba4eb1a1e75))
* **VirtualizedList:** allow different scroll behaviors ([00f6141](https://github.com/bamlab/react-tv-space-navigation/commit/00f6141990cf523f277ab6af1d41f5a43b6345da))
* **Web:** add web animation for virtualized list ([fb01696](https://github.com/bamlab/react-tv-space-navigation/commit/fb01696803e4ab9ca5262c31ef047216c27a34c3))
* wrap demo app with theme provider ([bd3c1bd](https://github.com/bamlab/react-tv-space-navigation/commit/bd3c1bdb6d483b17bfced079f33eb32d1a084156))


### Bug Fixes

* **eslint:** fix ts+eslint warnings on web example ([093e8fd](https://github.com/bamlab/react-tv-space-navigation/commit/093e8fd2600fabcd1ac19b945174d162a92b642e))
* **eslint:** remove unused directive ([c200ef0](https://github.com/bamlab/react-tv-space-navigation/commit/c200ef0e45741c6c19a37df61663a6d546eddf2c))
* **eslint:** solve eslint warning by forcing new estree version ([8becda3](https://github.com/bamlab/react-tv-space-navigation/commit/8becda380ba369b7b6838d1ea94561c813040b75))
* **example:** fix background color ([b2ad8a6](https://github.com/bamlab/react-tv-space-navigation/commit/b2ad8a640abe2ad210e5eb5209a55a19d36ce664))
* **example:** fix eslint and typescript setup ([e37b6b2](https://github.com/bamlab/react-tv-space-navigation/commit/e37b6b2d2d40840710b6e33936a638a885aa9ced))
* **example:** fix imports with new package name ([3bd2c6d](https://github.com/bamlab/react-tv-space-navigation/commit/3bd2c6dae6447f136d5b2a035653429ae1b86c57))
* **example:** fix ios build ([cd999d5](https://github.com/bamlab/react-tv-space-navigation/commit/cd999d519c4015c8675f58ae6945872169484c11))
* **example:** fix keyboard subscription for web ([cd2e789](https://github.com/bamlab/react-tv-space-navigation/commit/cd2e789ff97d78193e9bfdee69f7a309c1362ad0))
* **example:** fix tsconfig and metro config ([c0c31fb](https://github.com/bamlab/react-tv-space-navigation/commit/c0c31fb5e095055d6bd641f1ca0639eaa27b2ed2))
* **example:** fix web example not working ([62af1a7](https://github.com/bamlab/react-tv-space-navigation/commit/62af1a762ffdf9e5f68df28ce026f583250e0272))
* **example:** make cli work with yarn better ([7f0ace1](https://github.com/bamlab/react-tv-space-navigation/commit/7f0ace1c640aaa651898c6a662ddaba6d4e6c705))
* **example:** make ios work ([73adcf5](https://github.com/bamlab/react-tv-space-navigation/commit/73adcf52bccd3545ff2dc76ffb390d4883aa69c3))
* **lib:** fix React ref in bundle, as well as bundle size ([ed6cf5e](https://github.com/bamlab/react-tv-space-navigation/commit/ed6cf5ec696dc2d875832d733ba3cd9b17c12d7b))
* make react jsx transform work properly ([c4574b7](https://github.com/bamlab/react-tv-space-navigation/commit/c4574b743b4abb2f2a0ba5126ba7f024b986404a))
* **monorepo:** fix example ([2b56bbd](https://github.com/bamlab/react-tv-space-navigation/commit/2b56bbd79310b9860dd365d29e6714e112ebb674))
* **monorepo:** fix ts import ([912e2f9](https://github.com/bamlab/react-tv-space-navigation/commit/912e2f922b57fbb4299ee673c028e72a62ee07c3))
* **remote-control:** fix ts-ignore ([f02b801](https://github.com/bamlab/react-tv-space-navigation/commit/f02b80192f148cb010a43bde5701e1e8bea97f0a))
* rename tsconfig for monorepo root ([1302293](https://github.com/bamlab/react-tv-space-navigation/commit/13022938f87f68be255733dca6193be2e8a8c09b))
* **spatial-navigator:** take out style from spatial navigation view ([af98346](https://github.com/bamlab/react-tv-space-navigation/commit/af9834660fc39a86eec9cfc0cf53d6fa43bd4b9f))
* temporary fix for Grid ([e74a8ba](https://github.com/bamlab/react-tv-space-navigation/commit/e74a8ba5a0de2315711258b2cd6f1e2f0496c378))
* **typescript:** fix error on navigation.navigate() ([86007aa](https://github.com/bamlab/react-tv-space-navigation/commit/86007aabdcb33d1299a018c6d0ffe231b4344b1c))
* **typescript:** fix props that should be optional ([2d0c579](https://github.com/bamlab/react-tv-space-navigation/commit/2d0c5791d5d3d041d0d579a9773a5b5af2a6eef4))
* use View instead of div in native package ([0476e95](https://github.com/bamlab/react-tv-space-navigation/commit/0476e95d1c04a24f7305eb0b0049487b9065b886))
* **web:** fix web webpack config ([8956d46](https://github.com/bamlab/react-tv-space-navigation/commit/8956d46bbd331fb437fe0a6f3ce013d95d8732eb))

