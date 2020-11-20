// import Vue from "vue";
// import VueRouter from "vue-router";
// import store from "./store/index";

if (process.env.NODE_ENV === "development") {
    // eruda.init();
    Vue.use(VueRouter);
}
import App from "./app.vue";
import router from './route';
let vm = new Vue({
    el: "#app",
    components: {
        App: App,
    },
    template: "<App/>",
});
