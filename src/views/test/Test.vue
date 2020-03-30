<template>
  <div v-if="question">
    <TestStepper />
    <v-container fluid class="mt-2">
      <v-row class="mx-6">
        <v-col
          cols="12"
          md="5"
          :style="{ 'max-width': $vuetify.breakpoint.mdAndUp ? '460px' : '' }"
        >
          <pre class="sentence">{{ question.sentence }}</pre>
        </v-col>
        <v-col cols="12" md="6">
          <p style="height: 30px;">{{ question.question }}</p>
          <v-radio-group v-model="answer" :disabled="isCheckMode()">
            <v-radio
              v-for="choice in question.choices"
              :key="choice.value"
              :value="choice.value"
              color="var(--accent1)"
              @click.native="saveAnswer(choice.value)"
            >
              <template v-slot:label>
                <v-label>
                  <span
                    :style="{
                      'font-weight':
                        isCheckMode() && choice.value === question.correct
                          ? '600'
                          : ''
                    }"
                    :class="{
                      'success--text':
                        isCheckMode() &&
                        choice.value === answer &&
                        choice.value === question.correct,
                      'error--text':
                        isCheckMode() &&
                        choice.value !== answer &&
                        choice.value === question.correct
                    }"
                  >{{ choice.label }}</span>
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
            <div style="margin-left:75px;">
              <div v-if="!isCheckMode()">
                <v-btn icon @click="submit">
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn icon @click="reset">
                  <v-icon>mdi-sync</v-icon>
                </v-btn>
                <v-btn icon @click="navigateToResult">
                  <v-icon>mdi-chart-donut</v-icon>
                </v-btn>
              </div>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TestStepper from "@/views/test/components/TestStepper.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import TestService from "../../domains/test/test-service";

// TODO research the best settings of styles
@Component({
  components: { TestStepper, ConfirmDialog }
})
export default class Test extends Vue {
  question: object | null = null;
  answer: string = "";

  get index(): number {
    return this.$store.state.questionIndex;
  }

  isCheckMode(): boolean {
    return this.$store.getters.isCheckMode;
  }

  saveAnswer(value: string) {
    this.$store.commit("saveAnswer", {
      index: this.index,
      value: value
    });
  }

  prev(): void {
    this.$store.commit("decrementQuestionIndex");
  }

  next(): void {
    this.$store.commit("incrementQuestionIndex");
  }

  back(): void {
    this.$router.go(-1);
  }

  submit(): void {
    (this.$refs.confirm as any).open("提出しますか？").then((flag: boolean) => {
      if (flag) {
        TestService.submit(() => {
          alert("submit");
          this.$store.commit("changeCheckMode", true);
          this.$router.push({ name: "test-result" });
        });
      }
    });
  }

  reset(): void {
    (this.$refs.confirm as any)
      .open("リセットしますか？")
      .then((flag: boolean) => {
        if (flag) {
          this.$store.commit("changeCheckMode", false);
          this.$store.commit("clearAnswers");
          this.$store.commit("changeQuestionIndex", 0);
          this.init();
        }
      });
  }

  navigateToResult(): void {
    this.$router.push({ name: "test-result" });
  }

  setQuestion() {
    this.question = this.$store.getters.getQuestionByIndex(this.index);
  }

  setAnswer() {
    this.answer = this.$store.getters.getAnswerByIndex(this.index);
  }

  @Watch("index")
  init(): void {
    this.setQuestion();
    this.setAnswer();
  }

  created(): void {
    const testName = this.$route.params.testName;
    this.$route.meta.breadcrumbs = [{ text: "Test" }, { text: testName }];
    if (this.$store.state.testName !== testName) {
      TestService.getTests(testName, questions => {
        this.$store.commit("saveTestName", testName);
        this.$store.commit("saveQuestions", questions);
        this.$store.commit("clearAnswers");
        this.$store.commit("changeQuestionIndex", 0);
        this.init();
      });
    } else {
      this.init();
    }
  }
}
</script>

<style scoped>
* {
  font-size: 12px;
  color: var(--black);
}

.sentence {
  font-family: "Source Code Pro", monospace;
}
</style>
