<template>
  <div>
    <b-navbar wrapper-class="container" type="is-light">
        <template #brand>
          <b-navbar-item tag="a" href="//stride3d.net">
            <img src="/assets/media/logo.svg" alt="Stride3D"/>
          </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" to="/manual">
                Manual
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/api">
                API
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/ReleaseNotes">
                Release Notes
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/tutorials">
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
      <div class="sidebar-bg"></div>
      <div class="container is-fullhd docs-template-horizontal">
        <aside class="sidebar">
          <b-sidebar
              position="static"
              mobile="fullwidth"
              type="is-light"
              :fullheight="true"
              open
          >
            <b-menu class="is-custom-mobile">
              <b-menu-list :label="item.title" v-for="item in $themeConfig.sidebar" :key="item.title">
                <b-menu-item 
                  v-for="subItem in item.items" 
                  :key="subItem.title"
                  :icon="subItem.icon" 
                  :label="subItem.title"
                  :tag="subItem.link ? 'router-link' : undefined"
                  :to="subItem.link"></b-menu-item>
              </b-menu-list>
            </b-menu>
          </b-sidebar>
        </aside>
        <div class="docs-main">
          <div class="docs-main-container">
            <div class="content">
              <Content/>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer v-if="$themeConfig.footer" class="footer">
      <div class="content has-text-centered">
        <p v-html="$themeConfig.footer"/>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/derived-variables"

.sidebar-bg
  position: absolute
  bottom: 0
  right: 50%
  left: 0
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