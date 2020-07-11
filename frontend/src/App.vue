<template>
  <!-- App.vue -->

<v-app>
  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data: () => ({
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: false,
      type: 'default (no property)',
    },
    footer: {
      inset: false,
    },
    routerItens: [
      { title: 'Home', icon: 'mdi-shield-home', path: '/' },
      { title: 'About', icon: 'mdi-view-dashboard-outline', path: '/about' },
    ],
  }),
};
</script>
