import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);
let router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
