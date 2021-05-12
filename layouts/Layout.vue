<template>
  <div>
    <b-navbar wrapper-class="container" type="is-light">
        <template #brand>
          <b-navbar-item tag="a" href="//stride3d.net">
          </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="/manual">
                Manual
            </b-navbar-item>
            <b-navbar-item href="/api">
                API
            </b-navbar-item>
            <b-navbar-item href="/ReleaseNotes">
                Release Notes
            </b-navbar-item>
            <b-navbar-item href="/tutorials">
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
    <main class="section">
      <div class="container">
        <div class="content">
          <Content/>
        </div>
      </div>
    </main>
    <footer v-if="$themeConfig.footer" class="footer">
      <div class="content has-text-centered">
        <p v-html="$themeConfig.footer"/>
      </div>
    </footer>
    <div class="sidebar-page">
      <section class="sidebar-layout">
        <b-sidebar
            position="fixed"
            mobile="fullwidth"
            type="is-light"
            :fullheight="true"
            open
        >
          <div class="p-1">
            <b-menu class="is-custom-mobile">
              <b-menu-list>
                <b-menu-item icon="information-outline" label="Info"></b-menu-item>
                <b-menu-item active expanded icon="settings" label="Administrator">
                  <b-menu-item icon="account" label="Users"></b-menu-item>
                  <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
                  <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
                </b-menu-item>
                <b-menu-item icon="account" label="My Account">
                  <b-menu-item icon="account-box" label="Account data"></b-menu-item>
                  <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
                </b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item label="Expo" icon="link"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="Actions">
                <b-menu-item icon="logout" label="Logout"></b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="sass">
.sidebar-content
  margin-top: 52px

</style>