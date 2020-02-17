<template>
  <v-app :dark="setTheme">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
      </v-btn>
      <v-row justify="center">Iris - Faculty Dashboard</v-row>
      <v-spacer />
      <v-switch v-model="goDark"></v-switch>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      goDark: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-login-variant',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/register'
        },
        {
          icon: 'mdi-teach',
          title: 'Faculty Details',
          to: '/faculty'
        },
        {
          icon: 'mdi-account-card-details',
          title: 'Class Details',
          to: '/class'
        },
        {
          icon: 'mdi-account-clock',
          title: 'Notifications',
          to: '/notifications'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
      setTheme() {
        if(this.goDark == true) {
          return (this.$vuetify.theme.dark = true);
        } else {
          return (this.$vuetify.theme.dark = false);
        }
      }
  }
}
</script>
