import Vue from "vue";
import Vuetify from "vuetify";
import store from "./store/index";
import getRouter from "./router";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import Vuex from "vuex";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueCookies);
Vue.use(Toast, {});
window.axios = require("axios");
let token = Vue.$cookies.get("apiToken");
let router;
if (token) {  
  store.dispatch("CHECK_AUTH", token).then(()=>{
    router=getRouter(store);
    new Vue({
      el: "#app",
      vuetify: new Vuetify(),
      router,
      store,
      template: "<App/>",
      components: { App },
    });    
  });
}
else{
  router=getRouter();
    new Vue({
      el: "#app",
      vuetify: new Vuetify(),
      router,
      store,      
      template: "<App/>",
      components: { App },
    });
}

