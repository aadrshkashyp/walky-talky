import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";
import VueRouter from "vue-router";
import VueCompositionApi from "@vue/composition-api";
import ChatRoom from "./components/ChatRoom";

Vue.use(VueCompositionApi);
Vue.use(VueRouter);
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

import Home from "./components/Home";

const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/chats/:id", component: ChatRoom, name: "chat" },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
