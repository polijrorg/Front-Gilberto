<p align="center">
  Template to quickly start a new React native project with typescript. Comes with most common packages and a default folder structure.
</p>

<h1 align="center">Expo Managed TypeScript</h1>
<br>

Using [Expo 46](https://blog.expo.dev/expo-sdk-46-c2a1655f63f7). 

Please read [Starting React Native Project in 2022](https://dev.to/vladimirvovk/starting-a-react-native-project-in-2022-31m7) article for details. 

## Quick start

1. Install [Expo CLI](https://docs.expo.dev/get-started/installation/) with `npm install --location=global expo-cli` or `yarn global add expo-cli`.
2. Create new React Native project with this template.
3. Change directory to your project's folder with `cd <your-project-name>`.
4. Run Metro Bundler with `expo start`.
5. Build and run the project with `yarn ios` or `yarn android`.

Good Luck!!

## Features

- [TypeScript](https://www.typescriptlang.org/).
- Absolute path imports (e.g. `import { ComponentA } from 'src/components/A'`).
- [Prettier](https://prettier.io/).
- [Remove React imports](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).
- Check code for errors with [TypeScript compiler](https://www.typescriptlang.org/tsconfig#noEmit) and [ESLint](https://eslint.org/).
- Generate changelog with [standard-version](https://github.com/conventional-changelog/standard-version).
- Lint commits with [Husky](https://github.com/typicode/husky).

## Available commands

- `expo start` - start Metro Bundler.
- `yarn ios` - build and run iOS.
- `yarn android` - build and run Android.
- `yarn web` - run on web.
- `yarn lint` - check code for errors.
- `yarn release` - generate a changelog, bump the version of app and create a new tag.
