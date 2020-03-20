<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    :color="$root.themeColor"
    dark
    class="px-2"
  >
    <div class="mr-3 mt-1">
      <img src="../assets/rocket.svg" width="36px" />
    </div>
    <v-toolbar-title class="ml-3">SkillUp</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="mr-2">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-btn icon class="mr-2">
      <v-icon>mdi-slack</v-icon>
    </v-btn>
    <v-btn icon class="mr-2">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {}
</script>
