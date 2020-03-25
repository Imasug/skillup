<template>
  <div v-if="question">
    <TestStepper />
    <v-container fluid class="mt-2">
      <v-row class="mx-5">
        <v-col class="col">
          <pre class="sentence">{{ question.sentence }}</pre>
        </v-col>
        <v-col class="col">
          <p>{{ question.question }}</p>
          <v-radio-group v-model="answer">
            <v-radio
              v-for="choice in question.choices"
              :key="choice.value"
              :value="choice.value"
              color="var(--accent1)"
              @click.native="saveAnswer(choice.value)"
            >
              <template v-slot:label>
                <v-label>
                  <span>{{ choice.label }}</span>
                </v-label>
              </template>
            </v-radio>
          </v-radio-group>
          <v-row>
            <v-btn icon @click="prev">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn icon @click="next">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn icon style="margin-left:75px;" @click="submit">
              <v-icon>mdi-send</v-icon>
            </v-btn>
            <v-btn icon @click="reset">
              <v-icon>mdi-undo-variant</v-icon>
            </v-btn>
            <v-btn icon @click="navigateToResult">
              <v-icon>mdi-chart-donut</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestStepper from "@/views/test/components/TestStepper.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

@Component({
  components: { TestStepper, ConfirmDialog }
})
export default class Test extends Vue {
  question: object = {};
  answer: string = "";

  // computed didn't work properly. so insteadly use method.
  setQuestion() {
    this.question = this.$store.getters.getQuestionByIndex(
      this.$store.state.questionIndex
    );
  }

  setAnswer() {
    this.answer = this.$store.getters.getAnswerByIndex(
      this.$store.state.questionIndex
    );
  }

  saveAnswer(value: string) {
    this.$store.commit("saveAnswer", {
      index: this.$store.state.questionIndex,
      value: value
    });
  }

  prev(): void {
    this.$store.commit("decrementQuestionIndex");
    this.setQuestion();
    this.setAnswer();
  }

  next(): void {
    this.$store.commit("incrementQuestionIndex");
    this.setQuestion();
    this.setAnswer();
  }

  submit(): void {
    (this.$refs.confirm as any).open("提出しますか？").then((flag: boolean) => {
      if (flag) {
        alert("submit");
        this.$router.push({ name: "test-result" });
      }
    });
  }

  reset(): void {
    (this.$refs.confirm as any)
      .open("リセットしますか？")
      .then((flag: boolean) => {
        if (flag) {
          alert("reset");
        }
      });
  }

  navigateToResult(): void {
    this.$router.push({ name: "test-result" });
  }

  created(): void {
    // TODO questionId
    this.$store.commit("initTest", "questionId");
    this.setQuestion();
    this.setAnswer();
  }
}
</script>

<style scoped>
* {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.87);
}

.sentence {
  font-family: "Source Code Pro", monospace;
}

.col {
  max-width: 460px;
  min-width: 460px;
}
</style>
