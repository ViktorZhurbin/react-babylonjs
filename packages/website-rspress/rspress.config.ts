import * as path from 'node:path'
import { defineConfig } from 'rspress/config'
import { pluginPlayground } from '@rspress/plugin-playground'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  outDir: 'build',

  markdown: {
    checkDeadLinks: true,
    defaultWrapCode: true,
  },

  title: 'React Babylonjs',
  // icon: '/rspress-icon.png',

  plugins: [
    pluginPlayground({
      defaultRenderMode: 'pure',
      defaultDirection: 'vertical',
    }),
  ],

  route: {
    cleanUrls: true,
  },

  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/brianzinn/react-babylonjs',
      },
    ],
  },
})
