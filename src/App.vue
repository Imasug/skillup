<template>
  <div>
    <v-app>
      <div>
        <v-content>
          <router-view />
        </v-content>
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
