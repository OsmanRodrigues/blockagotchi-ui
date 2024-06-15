module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:eslint-plugin-react/recommended',
        'eslint-config-prettier'
    ],
    ignorePatterns: [
        'dist',
        'node_modules',
        '.eslintrc.cjs',
        'src/**/generated/**/*'
    ],
    plugins: ['react-refresh', 'eslint-plugin-react'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
        'react/react-in-jsx-scope': 0,
        'no-unused-vars': 1,
        'react/prop-types': 0
    }
};
