import * as path from 'node:path'
import { defineConfig } from 'rspress/config'
import { remarkPluginPlayground } from './src/plugins/remarkPluginPlayground'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  outDir: 'build',

  markdown: {
    // checkDeadLinks: true,
    defaultWrapCode: true,
    mdxRs: false,
    remarkPlugins: [
      // @ts-expect-error: VFile package versions mismatch
      remarkPluginPlayground,
    ],
  },

  title: 'React Babylonjs',
  // icon: '/rspress-icon.png',

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
