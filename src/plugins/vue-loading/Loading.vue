<template>
  <v-overlay :value="overlay" color="transparent">
    <v-img src="./loading.svg" width="60px"></v-img>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  overlay: boolean = false;

  show(): void {
    this.overlay = true;
  }
  hide(): void {
    this.overlay = false;
  }
}
</script>
