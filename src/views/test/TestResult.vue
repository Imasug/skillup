<template>
  <TestStepper />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestStepper from "@/views/test/components/TestStepper.vue";

@Component({
  components: { TestStepper }
})
export default class TestResult extends Vue {}
</script>
