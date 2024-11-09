# rollup-plugin-preserve-use-client

## Introduction
`rollup-plugin-preserve-use-client` is a Rollup plugin designed to preserve the `'use client'` directive when bundling React 18 components. This plugin ensures that React 18 server and client components are clearly distinguished by maintaining the `'use client'` directive where needed.

### Background
This plugin was created to solve an issue I faced while developing an npm module that provides both server and client component UIs using React 18. Rollup, by default, removes all directives, which led to the removal of the `'use client'` directive from my components. Initially, I tried using `rollup-plugin-preserve-directives` to solve this, but that plugin required setting `preserveModules: true` in Vite's output configuration. This caused conflicts with CSS injection plugins, breaking all `module.css` imports. Thus, I created this plugin to preserve the `'use client'` directive without needing to enable `preserveModules`, ensuring better compatibility with existing CSS solutions.

## Installation
```bash
npm install rollup-plugin-preserve-use-client --save-dev
```
## Usage

Add the plugin to your Rollup configuration file:
```ts
import preserveUseClientDirective from 'rollup-plugin-preserve-use-client';

export default {
  plugins: [preserveUseClientDirective()],
};
```
## Key Features

**No Need for `preserveModules: true`** Unlike other plugins, `rollup-plugin-preserve-use-client` does not require you to set `preserveModules: true`. This helps avoid issues with CSS module imports and ensures seamless bundling.

React 18 Compatibility: Ensures that `'use client'` directives are maintained, making it easier to differentiate between server and client components in your React 18 projects.

## Contributing

Contributions are welcome! Please feel free to submit a bug report or feature request via GitHub issues.

## License

Released under the MIT License.