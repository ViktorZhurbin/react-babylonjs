// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'React Babylonjs',
      social: {
        github: 'https://github.com/brianzinn/react-babylonjs',
      },
      sidebar: [
        { label: 'Playground', link: '/playground' },
        // {
        //   label: 'Playground',
        //   slug: 'playground/playground',
        // },
        {
          label: 'Guide',
          autogenerate: { directory: 'guide' },
        },
        {
          label: 'Examples',
          collapsed: true,
          autogenerate: { directory: 'examples' },
        },
      ],
    }),
  ],
})
