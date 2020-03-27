import Test from "@/views/test/Test.vue";
import TestList from "@/views/test/TestList.vue";
import TestResult from "@/views/test/TestResult.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuardFactory from "@/router/auth-gurad-factory";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    beforeEnter: AuthGuardFactory.create(),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/home",
    name: "home",
    redirect: "test-list"
  },
  {
    path: "/test-list",
    name: "test-list",
    component: TestList,
    meta: {
      breadcrumbs: [{ text: "Test" }]
    }
  },
  {
    path: "/test",
    name: "test",
    component: Test,
    meta: {
      breadcrumbs: [{ text: "Test" }, { text: "Java" }]
    }
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
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.isPublic) || store.state.auth) {
    next();
  } else {
    next({ name: "auth" });
  }
});

export default router;
