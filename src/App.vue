<template>
  <div>
    <v-app>
      <div>
        <Toolbar />
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

@Component({
  components: { Toolbar }
})
export default class App extends Vue {}
</script>
