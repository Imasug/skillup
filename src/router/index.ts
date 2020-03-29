import Test from "@/views/test/Test.vue";
import TestList from "@/views/test/TestList.vue";
import TestResult from "@/views/test/TestResult.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // TODO
  {
    path: "/",
    name: "test-list",
    component: TestList,
    meta: {
      breadcrumbs: [{ text: "Test" }]
    }
  },
  {
    path: "/test/:testName",
    name: "test",
    component: Test,
    meta: {}
  },
  {
    path: "/test-result",
    name: "test-result",
    component: TestResult,
    meta: {
      breadcrumbs: [{ text: "Test" }, { text: "Java" }]
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
