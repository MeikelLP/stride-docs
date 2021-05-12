const { description } = require('../package')
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@media': path.resolve(__dirname, '../assets/media')
      }
    }
  },
  theme: '.',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vuepress Docs Boilerplate',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Manual',
        link: '/manual/index.html',
      },
      {
        text: 'API',
        link: '/api/index.html'
      },
      {
        text: 'Release Notes',
        link: 'ReleaseNotes/index.html'
      },
      {
        text: 'Tutorials',
        link: 'tutorials/index.html'
      }
    ]
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'))
      md.use(require('markdown-it-container'), 'message', {
        validate: function(params) {
          return params.trim().match(/^message( [\S]+)?(.*)$/);
        },

        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(/^message( [\S]+)?(.*)$/);

          if (tokens[idx].nesting === 1) {
            // opening tag
            return '<b-message type="' + md.utils.escapeHtml(m[1].trim()) + '">' + md.utils.escapeHtml(m[2]) + '\n';

          } else {
            // closing tag
            return '</b-message>\n';
          }
        }
      })
    }
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  chainWebpack(config, isServer) {
    for (const lang of ["sass", "scss"]) {
      for (const name of ["modules", "normal"]) {
        const rule = config.module.rule(lang).oneOf(name);
        rule.uses.delete("sass-loader");

        rule
            .use("sass-loader")
            .loader("sass-loader")
            .options({
              implementation: require("node-sass"),
              sassOptions: {
                indentedSyntax: lang === "sass"
              }
            });
      }
    }
  }
}
