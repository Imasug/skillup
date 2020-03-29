<template>
  <div class="mx-10 mt-3" style="min-width: 300px;">
    <div class="d-flex flex-wrap justify-start">
      <div v-for="n of total" :key="n">
        <v-btn
          class="mr-1 mb-1"
          :color="getColor(n)"
          fab
          dark
          width="24px"
          height="24px"
          :style="{
            'box-shadow': '3px 3px 3px var(--shadow)',
            transform: isSelected(n) ? 'translateY(-10px)' : ''
          }"
          @click="navigateToTest(n - 1)"
        >
          <span style="font-size: 12px;">{{ n }}</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// TODO which is the best compute or method
// TODO write smart more!
@Component
export default class TestStepper extends Vue {
  get no(): number {
    return this.$store.state.questionIndex + 1;
  }

  get total(): number {
    return this.$store.getters.questionsLength;
  }

  navigateToTest(index: number) {
    this.$store.commit("changeQuestionIndex", index);
    this.$router.push({
      name: "test",
      params: { testName: this.$store.state.testName }
    });
  }

  isSelected(n: number): boolean {
    return n === this.no;
  }

  isAnswered(n: number): boolean {
    return !!this.$store.getters.getAnswerByIndex(n - 1);
  }

  isCheckMode(): boolean {
    return this.$store.getters.isCheckMode;
  }

  isCorrect(n: number): boolean {
    return (
      this.$store.getters.getQuestionByIndex(n - 1).correct ===
      this.$store.getters.getAnswerByIndex(n - 1)
    );
  }

  getColor(n: number) {
    if (this.isCheckMode()) {
      if (this.isCorrect(n)) {
        return "success";
      } else {
        return "error";
      }
    } else {
      if (this.isAnswered(n) || this.isSelected(n)) {
        return "var(--accent1)";
      } else {
        return "var(--gray)";
      }
    }
  }

  created(): void {}
}
</script>
