// https://docs.expo.dev/guides/using-eslint/
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import expoPlugin from 'eslint-plugin-expo';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  plugins: {
    '@typescript-eslint': tseslint,
    import: importPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    expo: expoPlugin,
  },
});

// 共通の設定
const baseConfig = {
  plugins: {
    '@typescript-eslint': tseslint,
    import: importPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    expo: expoPlugin,
  },
};

export default [
  {
    ignores: ['babel.config.js'],
  },
  // expoの設定を変換して適用
  ...compat.extends('eslint-config-expo').map((config) => ({
    ...config,
    ...baseConfig,
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      expo: expoPlugin,
    },
    rules: {
      ...tseslint.configs['recommended-type-checked'].rules,
      ...tseslint.configs['stylistic-type-checked'].rules,
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      expo: expoPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
];
