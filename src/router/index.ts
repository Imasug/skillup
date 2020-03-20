import Vue from "vue";
import VueRouter from "vue-router";
import Test from "@/views/test/Test.vue";
import TestList from "@/views/test/TestList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/test",
    name: "test",
    component: Test,
    meta: {
      breadcrumbs: [{ text: "Test" }, { text: "Java" }]
    }
  },
  {
    path: "/",
    name: "test-list",
    component: TestList,
    meta: {
      breadcrumbs: [{ text: "Test" }]
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
