<template>
  <v-navigation-drawer
    app
    clipped
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list>
      <v-list-item
        v-for="(menu, i) of menus"
        :key="i"
        @click="changeRoute(menu.route)"
      >
        <v-list-item-icon class="ml-3 mt-4">
          <v-icon class="item-icon">{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="item-title">{{
            menu.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

const MENUS: Menu[] = [
  {
    icon: "fas fa-tachometer-alt",
    title: "Dashboard",
    route: "dashboard"
  },
  {
    icon: "fas fa-book",
    title: "Test",
    route: "test-list"
  },
  {
    icon: "mdi-bookshelf",
    title: "Books",
    route: "books"
  },
  {
    icon: "mdi-youtube",
    title: "Videos",
    route: "videos"
  }
];

@Component
export default class NavigationDrawer extends Vue {
  menus: Menu[] = MENUS;

  @Prop(Boolean)
  value: boolean = true;

  changeRoute(route: string): void {
    this.$router.push({ name: route });
  }
}

interface Menu {
  icon: string;
  title: string;
  route: string;
}
</script>

<style scoped>
.item-title {
  font-size: 14px;
}

.item-icon {
  width: 20px;
  height: 20px;
}
</style>
