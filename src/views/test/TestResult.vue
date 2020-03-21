<template>
  <div>
    <TestStepper />
    <v-container fluid>
      <v-row>
        <v-col style="max-width: 200px;" class="mt-3 ml-8">
          <h4>Result</h4>
          <div class="ml-2">
            <v-row class="mt-5">
              <v-col class="py-0">Status:</v-col>
              <v-col class="py-0">Success</v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">Score:</v-col>
              <v-col class="py-0">14/20</v-col>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <div class="mt-8 ml-8">
            <v-progress-circular
              rotate="-90"
              size="100"
              value="70"
              width="10"
              color="#28a89c"
              >70 %</v-progress-circular
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestStepper from "@/views/test/components/TestStepper.vue";

@Component({
  components: { TestStepper }
})
export default class TestResult extends Vue {}
</script>
