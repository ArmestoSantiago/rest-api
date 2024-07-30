import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
  pluginJs.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      semi: 'error',
    },
    languageOptions: { globals: globals.browser }
  },
];