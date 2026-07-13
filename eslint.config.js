import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default [
  {
    // Базовые настройки
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        extraFileExtensions: ['.vue'],
        parser: {
          vue: eslintPluginVue
        }
      }
    },
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': typescriptEslint,
      prettier: eslintPluginPrettier
    },
    rules: {
      // Общие правила
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/html-self-closing': 'off',
      'vue/require-default-prop': 'off',

      // Специфичные правила Vue
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ]
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 },
          multiline: { max: 1 }
        }
      ]
    }
  },

  // Переопределения для конкретных файлов
  {
    files: ['**/*.vue'],
    processor: eslintPluginVue.processors['.vue']
  },
  // {
  //   files: ['vue.config.js'],
  //   rules: {
  //     '@typescript-eslint/no-var-requires': 'off'
  //   }
  // }
];