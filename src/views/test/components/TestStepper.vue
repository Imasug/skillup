<template>
  <div class="mx-10" style="min-width: 500px;">
    <v-stepper class="elevation-0">
      <v-stepper-header class="justify-start" style="height: auto;">
        <v-stepper-step
          class="pa-0"
          v-for="n of 20"
          :key="n"
          color="#28a89c"
          :step="n"
        ></v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TestStepper extends Vue {}
</script>
