<template>
  <div>
    <v-app>
      <div>
        <Toolbar @toggle="drawer = !drawer" />
        <NavigationDrawer v-model="drawer" />
        <v-content>
          <Breadcrumbs />
          <router-view />
        </v-content>
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Toolbar from "@/components/Toolbar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

@Component({
  components: { Toolbar, NavigationDrawer, Breadcrumbs }
})
export default class App extends Vue {
  drawer: boolean = true;
}

declare global {
  interface Window {
    console: any;
    google: any;
  }
}
</script>
