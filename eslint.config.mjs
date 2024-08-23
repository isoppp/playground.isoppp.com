import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwind from 'eslint-plugin-tailwindcss'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'tv', 'cva'],
      },
    },
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:storybook/recommended',
      'prettier',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: { react: { version: 'detect' } },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'script',
    },

    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/ban-types': 'off',
      'no-empty-pattern': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/.eslintrc.{js,cjs}'],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: 'commonjs',
    },
  },
]
