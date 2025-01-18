import fs from 'node:fs'
import path from 'node:path'
import type { StarlightPlugin } from '@astrojs/starlight/types'
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module'
import { visit } from 'unist-util-visit'
import type { PlaygroundProps } from '../shared/types'
import { getDemoDependencies, getPackageJsonDependencies } from './helpers/getDependencies'
import { getFilesAndImports } from './helpers/getFilesAndImports'
import { getMdxFromMarkdownString } from './helpers/getMdxFromMarkdownString'
import { getMdxJsxAttribute } from './helpers/getMdxJsxAttribute'
import { getTypeDeclarationsMap } from './helpers/getTypeDeclarationsMap'
import { getVirtualModulesCode } from './helpers/getVirtualModulesCode'
import { remarkPlugin } from './remarkPlugin'
import type { AstroIntegration, ViteUserConfig } from 'astro'

export type DemoDataByPath = Record<string, PlaygroundProps>
const demoDataByPath: DemoDataByPath = {}

export function pluginPlayground(): AstroIntegration {
  // const playgroundVirtualModule = new RspackVirtualModulePlugin({})
  // const getDemoDataByPath = () => demoDataByPath

  return {
    name: 'astro-plugin-playground',
    hooks: {
      'astro:routes:resolved': ({ routes }) => {
        console.log('routes:resolved', routes)
      },
      'astro:route:setup': ({ route }) => {
        console.log('route:setup', route)
      },
      'astro:build:setup': ({ pages, logger }) => {
        console.log('build:setup', pages, logger)
      },
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          // markdown: {
          //   remarkPlugins: [remarkPlugin],
          // },
          vite: {
            plugins: [
              {
                name: 'playground',
                resolveId: (id) => {
                  console.log('resolveId', id)
                  return id
                },
                async load(id) {
                  console.log('load', id)
                },
              },
            ],
          },
        })
      },
    },
  }
}
