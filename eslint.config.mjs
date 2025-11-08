// eslint.config.mjs
import js from '@eslint/js';
import pluginAstro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist', '.astro', 'node_modules', '.vercel', '.netlify'] },
  js.configs.recommended,
  pluginAstro.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { window: 'readonly', document: 'readonly', navigator: 'readonly' }
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
];
