module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:eslint-plugin-react/recommended',
        'eslint-config-prettier'
    ],
    ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'eslint-plugin-react'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
      ],
      'react/react-in-jsx-scope': 0,
      'no-unused-vars': 1,
      '@typescript-eslint/no-unused-vars': 1
    }
};
