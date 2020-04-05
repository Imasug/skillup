import _Vue from "vue";
import Loading from "./Loading.vue";

const node = document.createElement("div");
document.body.appendChild(node);
const vm = new Loading();
const component = vm.$mount(node);

export default class VueLoading {
  static install(Vue: typeof _Vue) {
    Vue.prototype.$loading = component;
  }
}

export const loading = component;

_Vue.use(VueLoading);
