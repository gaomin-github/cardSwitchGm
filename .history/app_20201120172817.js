import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index";
// import mock from "./mock/index.js";
// import './axios.js';
// mock数据
import eruda from "eruda";

if (process.env.NODE_ENV === "development") {
    // eruda.init();
    Vue.use(VueRouter);
}
import App from "./app.vue";
// import xianEstateDemo from './xian-estate/index.vue'

// (function () {
//     let a = {
//         value: () => import('./route/index.js')
//     }
//     console.log(a.value, 97)
// })()
// router.beforeEach((to, from, next) => {

// })
// mock数据
// import("./mock/index.js");
import router from './route';
let vm = new Vue({
    el: "#app",
    components: {
        App: App,
    },
    template: "<App/>",
    router,
    // mock,
    store,
    // router: SelfRoutes
});
