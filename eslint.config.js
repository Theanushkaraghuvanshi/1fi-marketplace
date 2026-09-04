// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      // Standard async data-fetch in useEffect sets loading state on mount.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
