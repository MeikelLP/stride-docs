<template>
  <div>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="a" href="//stride3d.net">
                <img
                    src="/assets/media/logo.svg"
                    alt="Stride3D"
                >
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
          position="static"
          type="is-light"
          :expand-on-hover="true"
          :reduce="true"
          :fullheight="true"
          v-model="isSideBarOpen"
        >
          <div class="p-1">
            <b-menu>
              <b-menu-list label="Menu">
                <b-menu-item icon="information-outline" label="Info"></b-menu-item>
                <b-menu-item icon="settings">
                  <template #label="props">
                    Administrator
                    <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                  </template>
                  <b-menu-item icon="account" label="Users"></b-menu-item>
                  <b-menu-item icon="cellphone-link">
                    <template #label>
                      Devices
                      <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                            <template #trigger>
                                <b-icon icon="dots-vertical"></b-icon>
                            </template>
                            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                      </b-dropdown>
                    </template>
                  </b-menu-item>
                  <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
                </b-menu-item>
                <b-menu-item icon="account" label="My Account">
                  <b-menu-item label="Account data"></b-menu-item>
                  <b-menu-item label="Addresses"></b-menu-item>
                </b-menu-item>
              </b-menu-list>
              <b-menu-list>
                <b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="Actions">
                <b-menu-item label="Logout"></b-menu-item>
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
  name: 'Layout',
  data () {
    return {
      isSideBarOpen: false
    }
  }
}
</script>

<style lang="scss">
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    // min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100%;
        // min-height: 100vh;
    }
}
@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.is-mini-expand {
    .menu-list a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>