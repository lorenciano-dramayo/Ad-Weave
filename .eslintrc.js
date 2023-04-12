module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // to enable jsx and features such as async/await
    },
    ecmaVersion: 9,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  ignorePatterns: ['node_modules/*', 'build/*', 'public/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ['eslint:recommended'],
  overrides: [
    // This configuration will apply only to Javascript files
    {
      files: ['**/*.js', '**/*.jsx'],
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules
        // 'prettier', // Prettier plugin - turn all rules off that might conflict with Prettier
        // 'plugin:prettier/recommended', // Prettier recommended rules
      ],
      rules: {
        'react/boolean-prop-naming': [
          'error',
          {
            propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
            rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
            message:
              'It is better if your prop ({{ propName }}) matches this pattern: ({{ pattern }})',
          },
        ],
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 'warn',
        'padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: [
              'block',
              'block-like',
              'cjs-export',
              'class',
              'export',
              'import',
            ],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['export', 'import'],
            next: ['export', 'import'],
          },
        ],
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': 'off',
        // Includes .prettierrc.js rules
        // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },
  ],
};
