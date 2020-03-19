<template>
  <v-navigation-drawer
    app
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
  >
    <!-- TODO Use v-for -->
    <v-list>
      <v-list-item @click="changeRoute">
        <v-list-item-icon class="ml-3 mt-4">
          <v-icon class="item-icon">fas fa-tachometer-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :class="['item-title']">
            Dashboard
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="changeRoute">
        <v-list-item-icon class="ml-3 mt-4">
          <v-icon class="item-icon">fas fa-book</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :class="['item-title']">
            Test
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="changeRoute">
        <v-list-item-icon class="ml-3 mt-4">
          <v-icon class="item-icon">mdi-bookshelf</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :class="['item-title']">
            Books
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="changeRoute">
        <v-list-item-icon class="ml-3 mt-4">
          <v-icon class="item-icon">mdi-youtube</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :class="['item-title']">
            Videos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavigationDrawer extends Vue {
  drawer: boolean = true;

  changeRoute(): void {
    alert("changeRoute");
  }
}
</script>

<style scoped>
.item-title {
  font-size: 17px;
  font-weight: 500;
}

.item-icon {
  width: 20px;
  height: 20px;
}
</style>
