import { createStore } from 'vuex'
import Cookies from "js-cookie";

export default createStore({
  state: {
    url_api: process.env.VUE_APP_API,
    menu: ['', ''],
    user: {},
    typeSubmit: '',
    messageSubmit: ''
  },
  getters: {
    getCookie: (state) => (cookieName) => {
      return Cookies.get(cookieName);
    }
  },
  mutations: {
    setMenu(state, payload) {
      state.menu[0] = payload[0];
      state.menu[1] = payload[1];
    },
    setCookie(state, payload) {
      Cookies.set(payload[0], payload[1], { expires: new Date(payload[2] * 1000) });
      localStorage.setItem('auth', '0')
      console.log("Cookie set");
    },
    removeCookie(state, cookieName) {
      Cookies.remove(cookieName);
      console.log("Cookie removed");
    },
    closeAlert() {
      state.message = "";
      state.type = "";
    },
  },
  actions: {
  },
  modules: {
  }
})
