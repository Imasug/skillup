<template>
  <v-app-bar clipped-left app color="var(--main)" dark class="px-2">
    <template v-if="$vuetify.breakpoint.lgAndUp">
      <div class="mr-5 mt-1">
        <img src="../assets/img/rocket.svg" width="36px" />
      </div>
    </template>
    <template v-else>
      <v-app-bar-nav-icon @click.stop="toggle"></v-app-bar-nav-icon>
    </template>

    <v-toolbar-title>SkillUp</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="mr-2">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-btn icon class="mr-2" href="https://app.slack.com/client/T011L1PDT1U/C011L1PDYJJ" target="_blank">
      <v-icon>mdi-slack</v-icon>
    </v-btn>
    <v-btn icon class="mr-2" href="https://github.com/Imasug/skillup" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {
  toggle(): void {
    this.$emit("toggle");
  }
}
</script>
