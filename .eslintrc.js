module.exports = {
      settings: {
            'import/resolver': {
                  typescript: {}
            }
      },
      env: {
            browser: true,
            es2021: true,
            jest: true
      },
      extends: [
            'standard',
            'plugin:import/recommended',
            'plugin:import/typescript',
            'prettier'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
      },
      plugins: [
            '@typescript-eslint',
      ],
      rules: {
            'no-useless-constructor': 'off',
            '@typescript-eslint/no-useless-constructor': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            // indent: ['error', 6]
      }
}
