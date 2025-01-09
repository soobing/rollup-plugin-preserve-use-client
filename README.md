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


## Component-Based Bundling

If you need to bundle components individually while ensuring the `'use client'` directive is preserved only where necessary, you can configure your Rollup (or Vite) build process as shown below:

### Example Configuration

```
# Folder Structure Example

packages/
├── components/          
│   ├── atoms/           
│   │   ├── Component1
│   │   │  ├── index.tsx
│   │   │  ├── component1.module.css
│   │   │  ├── component1.stories.tsx
│   │   ├── Component2
│   │   │  ├── index.tsx
│   │   │  ├── component2.module.css
│   │   │  ├── component2.stories.tsx
│   ├── molecules/       
│   ├── organisms/       
│   ├── templates/       
├── main.ts              # Root entry point for the library
```

```ts
import { defineConfig } from 'vite';
import { glob } from 'glob';
import { extname, relative } from 'path';
import { fileURLToPath } from 'url';
import preserveUseClientDirective from 'rollup-plugin-preserve-use-client';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('packages/**/*.{ts,tsx}', {
            ignore: ['packages/**/*.stories.tsx'],
          })
          .map((file) => [
            relative(
              'packages',
              file.slice(0, file.length - extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [preserveUseClientDirective()],
});
```

### How It Works
1. **File Discovery with `glob`:** Searches for all `.ts` and `.tsx` files in the `packages` directory and sets each file as an individual entry point for bundling. Excludes unnecessary files like `stories`.

2. **Mapping Entries with `Object.fromEntries`:** Maps each discovered file as a separate entry point for Rollup, allowing fine-grained control over the bundling process.

3. **Custom Output Naming:** Configures `entryFileNames` and `assetFileNames` to generate unique file names for each component, creating distinct output files.

By applying this configuration, you can generate separate bundles for each component. This ensures that the `'use client'` directive is applied only to the appropriate components without affecting others.


## Contributing

Contributions are welcome! Please feel free to submit a bug report or feature request via GitHub issues.

## License

Released under the MIT License.
