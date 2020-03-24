<template>
  <div class="mx-10" style="min-width: 500px;">
    <v-stepper class="elevation-0" :value="index">
      <v-stepper-header class="justify-start" style="height: auto;">
        <v-stepper-step class="pa-0" v-for="n of total" :key="n" color="var(--accent1)" :step="n"></v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TestStepper extends Vue {
  get index(): number {
    return this.$store.state.questionIndex + 1;
  }

  get total(): number {
    return this.$store.getters.questionsLength;
  }

  created(): void {}
}
</script>

