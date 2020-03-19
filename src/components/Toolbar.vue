<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    :color="$root.themeColor"
    dark
    class="px-3"
  >
    <div class="mr-3">
      <img src="../assets/rocket.svg" width="36px" />
    </div>
    <v-toolbar-title><h4>SkillUp</h4></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="mr-3">
      <v-icon size="32">mdi-slack</v-icon>
    </v-btn>
    <v-btn icon class="mr-5">
      <v-icon size="32">mdi-github</v-icon>
    </v-btn>
    <v-avatar size="32" class="mr-3">
      <img
        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light"
      />
    </v-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {}
</script>
