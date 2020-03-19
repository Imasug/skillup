<template>
  <v-navigation-drawer
    app
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
  >
    <div>NavigationDrawer</div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavigationDrawer extends Vue {
  drawer: boolean = true;
}
</script>
