import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  html: {
    template: './public/index.html',
  },
  plugins: [pluginVue()],
  source: {
    // Specify the entry file
    entry: {
      index: './src/main.js',
    },
  },
});
