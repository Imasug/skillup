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
          <v-radio-group>
            <v-radio
              v-for="choice in question.choices"
              :key="choice.value"
              :value="choice.value"
              color="var(--accent1)"
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
  index: number = 0;

  get question() {
    return this.$store.getters.getQuestionByIndex(this.index);
  }

  prev(): void {
    if (this.index > 0) {
      this.index--;
    }
  }

  next(): void {
    if (this.index < this.$store.getters.questionsLength - 1) {
      this.index++;
    }
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
    this.$store.commit("updateQuestions");
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
