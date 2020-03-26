<template>
  <div>
    <TestStepper />
    <v-container fluid>
      <v-row class="mx-5">
        <v-col class="result" style="min-width: 350px;">
          <v-row>
            <v-col>
              <h4>Result</h4>
              <div class="pa-2">
                <!-- <v-row class="mt-3">
                  <v-col class="py-0">Status</v-col>
                  <v-col class="py-0">{{ status }}</v-col>
                </v-row> -->
                <v-row>
                  <v-col class="py-0">Score</v-col>
                  <v-col class="py-0">{{ correct }} / {{ total }}</v-col>
                </v-row>
              </div>
            </v-col>
            <v-col>
              <div class="pa-2">
                <v-progress-circular
                  rotate="-90"
                  size="100"
                  :value="calculateAccuracyRate()"
                  width="10"
                  color="var(--accent1)"
                  >{{ calculateAccuracyRate() }} %</v-progress-circular
                >
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestStepper from "@/views/test/components/TestStepper.vue";
import _ from "lodash";

@Component({
  components: { TestStepper }
})
export default class TestResult extends Vue {
  total: number = 0;
  correct: number = 0;
  status: string = "-";

  calculateAccuracyRate(): number {
    return (this.correct / this.total) * 100;
  }

  created(): void {
    this.total = this.$store.getters.questionsLength;

    const corrects = _.map(this.$store.state.questions, "correct");
    const answers = this.$store.state.answers;

    for (let i = 0; i < this.total; i++) {
      if (corrects[i] === answers[i]) {
        this.correct++;
      }
    }

    // TODO
    this.status = "Success";
  }
}
</script>
