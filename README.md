# snapshot-build-hash-webpack-plugin
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/snapshot-build-hash-webpack-plugin.png)](https://www.npmjs.com/package/snapshot-build-hash-webpack-plugin)

This plugin is heavily inspired by [build-hash-webpack-plugin](https://github.com/Cosium/build-hash-webpack-plugin). 

Webpack plugin that append build hash with SNAPSHOT prefix on package.json and package-lock.json

## Why Is This Useful?

For each build, Webpack generates an in-memory hash allowing to know if two build outputs are the same or not.

This plug-in change the version of package.json and package-lock.json appending this described build hash with a SNAPSHOT prefix.

## Install

```sh
npm i --save-dev snapshot-build-hash-webpack-plugin
```

## Configuration

In your webpack config include the plug-in. And add it to your config:

```js
import SnapshotBuildHashPlugin from 'snapshot-build-hash-webpack-plugin';
// ...
module.exports = {
    // ....
    plugins: [new SnapshotBuildHashPlugin()]
}
```