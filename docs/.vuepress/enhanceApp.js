import Buefy from 'buefy'
import './styles/index.sass'

import pageComponents from '@internal/page-components'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faInfoCircle)

/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // https://github.com/vuejs/vuepress/issues/1173
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }

  Vue.component('vue-fontawesome', FontAwesomeIcon);

  Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
  })
}


