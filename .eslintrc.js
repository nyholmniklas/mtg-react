module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
    },
    "plugins": [
        "react"
    ],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['warn'],
        'no-console': 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    },
};