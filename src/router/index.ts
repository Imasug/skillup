import Vue from "vue";
import VueRouter from "vue-router";
import Test from "@/views/test/Test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "test",
    component: Test
  }
];

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
