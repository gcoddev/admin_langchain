import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ckeditor from "@ckeditor/ckeditor5-vue";
import "@ckeditor/ckeditor5-build-classic/build/translations/es.js";

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.headers = {
    Accept: "application/json",
    "content-type": "application/json",
};

createApp(App).use(store).use(router).use(VueAxios, axios).use(VueSweetalert2).use(ckeditor).mount('#app')
