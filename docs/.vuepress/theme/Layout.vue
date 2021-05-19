<template>
  <div>
    <b-navbar type="is-light">
        <template #brand>
          <b-navbar-item tag="a" href="/">
            <img src="/assets/media/logo.svg" alt="Stride3D"/>
          </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" to="/manual" :active="$page.path.startsWith('/manual')">
                Manual
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/api" :active="$page.path.startsWith('/api')">
                API
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/ReleaseNotes" :active="$page.path.startsWith('/ReleaseNotes')">
                Release Notes
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/tutorials" :active="$page.path.startsWith('/tutorials')">
                Tutorials
            </b-navbar-item>
        </template>
    </b-navbar>
    <header v-if="$frontmatter.hero" class="hero" :class="$frontmatter.hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ $site.title }}</h1>
          <h2>{{ $site.description }}</h2>
        </div>
      </div>
    </header>
    <main class="documentation">
      <div id="docs" class="bd-docs">
        <nav class="bd-docs-nav">
          <nav class="bd-categories">
            <b-menu class="is-custom-mobile">
              <b-menu-list :label="categoryKey | camelize" v-for="categoryKey in Object.keys(sidebar)">
                <b-menu-item
                    v-for="pageKey in Object.keys(sidebar[categoryKey].children).sort().reverse()"
                    :key="pageKey"
                    :label="sidebar[categoryKey].children[pageKey].name | camelize"
                    :active="$page.path.startsWith(sidebar[categoryKey].children[pageKey].path)"
                    :tag="sidebar[categoryKey].children[pageKey].path ? 'router-link' : undefined"
                    :to="sidebar[categoryKey].children[pageKey].path"
                    :expanded="$page.path.startsWith(sidebar[categoryKey].children[pageKey].path)">
                    <template #label="props" v-if="sidebar[categoryKey].children[pageKey].children">
                      {{ sidebar[categoryKey].children[pageKey].name | camelize }}
                      <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                    </template>
                  <b-menu-item
                      v-for="subPageKey in Object.keys(sidebar[categoryKey].children[pageKey].children).sort()"
                      :key="subPageKey"
                      :label="sidebar[categoryKey].children[pageKey].children[subPageKey].name | camelize"
                      :active="sidebar[categoryKey].children[pageKey].children[subPageKey].path === $page.path"
                      :tag="sidebar[categoryKey].children[pageKey].children[subPageKey].path ? 'router-link' : undefined"
                      :to="sidebar[categoryKey].children[pageKey].children[subPageKey].path">
                  </b-menu-item>
                </b-menu-item>
              </b-menu-list>
            </b-menu>
          </nav>
        </nav>
        <div class="docs-main">
          <div class="docs-main-container">
            <div class="content">
              <Content/>
            </div>
          </div>
        </div>
        <nav class="bd-docs-nav">
          <nav class="bd-categories">
            <b-menu class="is-custom-mobile">
              <nav id="anchors" class="bd-anchors is-pinned">
                <b-menu class="is-custom-mobile">
                  <b-menu-list :label="$page.title">
                    <b-menu-item
                        v-for="header in $page.headers"
                        :key="header.slug"
                        :label="header.title"
                        tag="router-link"
                        :to="`#${header.slug}`"></b-menu-item>
                  </b-menu-list>
                </b-menu>
              </nav>
            </b-menu>
          </nav>
        </nav>
      </div>
    </main>
    <footer v-if="$themeConfig.footer" class="footer">
      <div class="content has-text-centered">
        <p v-html="$themeConfig.footer"/>
        <p>{{ $page.lastUpdated }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      activePage: {},
      sidebar: {},
      category: ''
    }
  },
  beforeMount() {
    this.calculateActivePage(this.$page)
    this.calculateSidebar(this.$page.regularPath)
  },
  methods: {
    calculateSidebar (page) {
      this.category = page.replace(/^\//, '').split('/')[0]
      const sidebarPages = this.$site.pages.filter(x => x.relativePath.startsWith(this.category) && (x.regularPath.match(/\//g) || []).length >= (page.match(/\//g) || []).length)

      const tree = {}

      function addNode(obj) {
        const splitPath = obj.regularPath.replace(/^\/|\/$/g, "").split('/');
        let ptr = tree
        for (let i = 0; i < splitPath.length; i++) {
          const node = {
            name: splitPath[i].replace(/\.html$/, ''),
            path: '/' + splitPath.slice(0, i + 1).join('/')
          }
          if (i === splitPath.length - 1) {
            node.relativePath = obj.relativePath
            node.title = obj.title
            node.path = obj.path
            node.key = obj.key
          } else {
            node.path += '/'
          }
          ptr[splitPath[i]] = ptr[splitPath[i]] || node
          ptr[splitPath[i]].children = ptr[splitPath[i]].children || {}
          ptr = ptr[splitPath[i]].children
        }
      }

      sidebarPages.map(addNode);
      this.sidebar = tree
    },
    calculateActivePage(to) {
      this.activePage = this.$site.pages.find(x => x.path === to.path)
    }
  },
  filters: {
    camelize(str) {
      if (!str) return str
      return str
          .replace(/^\w|[A-Z]|\b\w/g, word => word.toUpperCase())
          .replace(/(?<=[a-z])(?=[A-Z])/g, ' ')
          .replace(/-/g, ' ')
    }
  },
  watch: {
    '$route' (to, from) {
      this.calculateActivePage(to)

      const fromCat = to.path.replace(/^\//, '').split('/')[0]
      const toCat = from.path.replace(/^\//, '').split('/')[0]
      if (fromCat !== toCat) {
        // category changed - do some heavy stuff
        this.calculateSidebar(to.path)
      }
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/derived-variables"

#docs
  display: grid
  grid-template-columns: 11.25rem 1fr 11.25rem

.bd-docs
  --docs-outer: 6rem
  --docs-inner: 3rem
  --docs-side-padding: 1rem

.bd-docs-nav, .bd-docs-side
  background-color: #fafafa
  width: 11.25rem
  z-index: 3
.bd-categories
  --height: 1.25
  padding: var(--docs-side-padding)
  position: -webkit-sticky
  position: sticky
  top: 0


.bd-anchors
  position: -webkit-sticky
  position: sticky
  top: 0

.sidebar-bg
  position: absolute
  bottom: 0
  left: 50%
  right: 50%
  top: 0
  background: $light

.documentation .docs-template-horizontal
    position: relative
    display: flex
    flex-direction: row
    flex: 1

.sidebar
  display: flex
  flex-direction: column
  flex-shrink: 0
  width: 16rem
  padding: 3rem 1rem
  background: #f5f5f5

.documentation
  position: relative

.docs-main
  position: relative
  background: #fff
  overflow: hidden
  width: 100%
  min-height: 100vh 

.docs-main-container
    padding: 3rem
</style>