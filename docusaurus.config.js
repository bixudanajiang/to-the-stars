// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const visit = require('unist-util-visit')

const clearStrongSpace = () => {
  return (root) => {
    visit(root, (item) => {
      if (item.type === 'paragraph') {
        // @ts-ignore
        const children = item.children
        children.forEach((item, i) => {
          if (item.type === 'strong') {
            const next = children[i + 1]
            const s = item.children[0].value
            if (s) {
              const last = s.slice(s.length - 1)
              if (
                next &&
                next.type === 'text' &&
                ['，', '。', '？', '！'].includes(last) &&
                next.value.startsWith(' ')
              ) {
                next.value = next.value.trim()
              }
            }
          }
        })
      }
    })
    return root
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '魔法少女小圆-飞向星空',
  tagline: `在经历了几个世纪的动荡之后，一个乌托邦式的 AI— 人类政府治理着地球，预示着后稀缺社会的来临和太空殖民的新时代。一次意外的接触却让科技更先进的敌对外星种族打破了和平，这迫使魔法少女们走出幕后，拯救人类文明。在这一切之中，志筑良子，一个普通的女孩，仰望着星空，好奇着她在宇宙中的归所。

  “丘比承诺说人类总有一天也能到达那遥远的星空。但它们很明智地没有说出来，人类将会在那里遇到什么。”—— 引言
  `,
  url: 'https://tts.liuli.moe',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'logo.png',
  trailingSlash: false,
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        target: isServer ? 'node16' : 'esnext',
      },
    }),
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'liuli-moe', // Usually your GitHub org/user name.
  projectName: 'to-the-stars', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'books',
          path: 'books',
          // sidebarItemsGenerator() {
          //   return [{ type: 'autogenerated', dirName: '.' }]
          // },
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/liuli-moe/to-the-stars/edit/master',
          remarkPlugins: [clearStrongSpace],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-F20H7RT1RM',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '魔法少女小圆-飞向星空',
        logo: {
          alt: '飞向星空',
          src: 'logo.png',
          srcDark: 'logoDark.png',
        },
        items: [
          {
            type: 'doc',
            docId: '01/readme',
            position: 'left',
            label: '阅读',
          },
          {
            href: 'https://github.com/liuli-moe/to-the-stars',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [],
          },
          {
            title: 'Community',
            items: [],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/liuli-moe/to-the-stars',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} rxliuli, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  themes: [
    // [
    //   require.resolve('@easyops-cn/docusaurus-search-local'),
    //   {
    //     // ... Your options.
    //     // `hashed` is recommended as long-term-cache of index file is possible.
    //     hashed: true,
    //     // For Docs using Chinese, The `language` is recommended to set to:
    //     // ```
    //     language: ['en', 'zh'],
    //     // ```
    //     indexDocs: true,
    //     indexBlog: false,
    //     docsRouteBasePath: 'books',
    //     docsDir: 'books',
    //   },
    // ],
  ],
}

module.exports = config
