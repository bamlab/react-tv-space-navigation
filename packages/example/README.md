# Hoppix

## Description

Hoppix is a project that aims to provide an example TVOS application built using React Native. It includes features such as navigation, state management, and integration with web development.

## Installation

To install the project, follow these steps:

1. Install the required dependencies:

   ```
   yarn install
   ```

2. Prebuild the app with expo before running:
   ```
   yarn prebuild
   ```

## Usage

### Running the TVOS Application on Apple TV or Android TV

You can run this demo application on AppleTV or AndroidTV
To start the TVOS application, use one of the following commands:

```
yarn start
yarn ios
yarn android
```

This will initiate the TVOS application using React Native's Metro bundler.

Make sure you have set up the necessary emulator/device configurations on XCode or Android Studio to run the project on AppleTV or Android TV.

### Running the Web Application

Hoppix also supports running as a web application. To run the web version of the project, use the following command:

```
yarn run start:web
```

This will start a development server using Webpack and serve the application in your default web browser.

## Handling Remote Control

In order to use Spatial Navigation in the Web Application or TVOS Application, you must configure the remoteControlManager to map your keyboard or remote keys to LRUD Directions.

See [Remote Control](./src/components/remote-control/) for how to manage Platform Specific remote controls.

## Contributing

Contributions to Hoppix are welcome! If you find any issues or want to enhance the project, please submit a pull request or open an issue on the repository.
