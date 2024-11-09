import type { Plugin } from 'rollup';

export default function preserveUseClientDirective(): Plugin {
  const useClientFiles = new Set<string>();

  return {
    name: 'preserve-use-client-directive',
    transform(code, id) {
      const firstLine = code.split('\n')[0].trim();
      if (firstLine === "'use client';" || firstLine === '"use client";') {
        useClientFiles.add(id);
      }
      return null;
    },
    generateBundle(options, bundle) {
      for (const [, fileData] of Object.entries(bundle)) {
        if (
          fileData.type === 'chunk' &&
          fileData.moduleIds.some((id) => useClientFiles.has(id))
        ) {
          fileData.code = `'use client';\n${fileData.code}`;
        }
      }
    },
  };
}