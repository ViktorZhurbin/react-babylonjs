import MagicString from 'magic-string'
import type { StarlightPlugin } from '@astrojs/starlight/types'
import { virtualModules } from './virtualModules'
import { remarkPlugin } from './remarkPlugin'

export function starlightPlugin(): StarlightPlugin {
  return {
    name: '@astrojs/starlight',
    hooks: {
      setup: ({ updateConfig, addIntegration }) => {
        addIntegration({
          name: 'astro-starlight-playground',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({
                markdown: {
                  remarkPlugins: [remarkPlugin],
                },
                vite: {
                  plugins: [
                    {
                      name: 'vite-playground',
                      resolveId: (id) => {
                        if (virtualModules.has(id)) {
                          return id
                        }
                      },
                      async load(id) {
                        if (virtualModules.has(id)) {
                          const s = new MagicString(virtualModules.get(id).src)

                          return {
                            code: s.toString(),
                            map: s.generateMap({
                              source: id,
                              file: `${id}.map`,
                              includeContent: true,
                            }),
                          }
                        }
                      },
                    },
                  ],
                },
              })
            },
          },
        })
      },
    },
  }
}
