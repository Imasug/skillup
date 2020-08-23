import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@fortawesome/fontawesome-free/css/all.css";
import Java from "@/components/icons/Java.vue";
import Database from "@/components/icons/Database.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa",
    values: {
      java: {
        component: Java
      },
      database: {
        component: Database
      }
    }
  }
});
