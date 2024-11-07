import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  // Add additional routes here
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
