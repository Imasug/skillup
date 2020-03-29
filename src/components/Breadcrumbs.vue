<template>
  <div class="mx-4 mt-1" v-if="!$vuetify.breakpoint.xsOnly">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Breadcrumbs extends Vue {
  items: any[] = [];

  @Watch("$route")
  onChangedRoute(): void {
    this.updateBreadcrumbs();
  }

  updateBreadcrumbs(): void {
    this.items = this.$route.meta.breadcrumbs;
  }

  created(): void {
    this.updateBreadcrumbs();
  }
}
</script>
