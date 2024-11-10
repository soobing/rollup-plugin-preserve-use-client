import type { Plugin } from 'rollup';

export default function preserveUseClientDirective(): Plugin {
  const useClientFiles = new Set<string>();

  return {
    name: 'preserve-use-client-directive',
    moduleParsed({ ast, id }) {
      if (ast && ast.body && ast.body[0]?.type === 'ExpressionStatement') {
        const expression = ast.body[0].expression;
        if (
          expression.type === 'Literal' &&
          expression.value === 'use client'
        ) {
          useClientFiles.add(id);
        }
      }
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