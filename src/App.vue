<template>
  <div>
    <v-app>
      <div>
        <Toolbar />
        <NavigationDrawer />
        <v-content>
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

@Component({
  components: { Toolbar, NavigationDrawer }
})
export default class App extends Vue {}
</script>
