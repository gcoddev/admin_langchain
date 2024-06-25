// import Vue from 'vue';
import { createStore, Store } from 'vuex'
import Cookies from "js-cookie";

export default createStore({
  state: {
    url_api: process.env.VUE_APP_API,
    menu: ['', ''],
    listv: '',
    user: {},
    typeSubmit: '',
    messageSubmit: '',

    // Variables de edición
    user_edit: 0,
    doc_edit: 0,
    video_edit: 0,
    blog_edit: 0,

    message: '',
    type: '',
    subShowTitle: '',
    mainHide: false,
  },
  getters: {
    getCookie: () => (cookieName) => {
      return Cookies.get(cookieName);
    }
  },
  mutations: {
    setMenu(state, payload) {
      state.menu[0] = payload[0];
      state.menu[1] = payload[1];
      switch (payload[0]) {
        case 'admin':
          document.getElementById('listContent').setAttribute('style', 'display: none;')
          document.getElementById('listAdmin').setAttribute('style', 'display: block;')
          break;
        case 'content':
          document.getElementById('listAdmin').setAttribute('style', 'display: none;')
          document.getElementById('listContent').setAttribute('style', 'display: block;')
          break;
        default:
          break;
      }
    },
    setMenuList(state, payload) {
      switch (payload) {
        case 'admin':
          if (state.subShowTitle == 'admin') {
            // document.getElementById('listContent').setAttribute('style', 'display: none;')
            // document.getElementById('listAdmin').setAttribute('style', 'display: none;')
            document.getElementById('app-container').classList.remove('sub-show-temporary')
            document.getElementById('app-container').classList.add('menu-sub-hidden')
            document.getElementById('app-container').classList.add('sub-hidden')
            state.subShowTitle = ''
          } else {
            document.getElementById('listContent').setAttribute('style', 'display: none;')
            document.getElementById('listAdmin').setAttribute('style', 'display: block;')
            document.getElementById('app-container').classList.add('sub-show-temporary')
            document.getElementById('app-container').classList.remove('menu-sub-hidden')
            document.getElementById('app-container').classList.remove('sub-hidden')
            state.subShowTitle = 'admin'
          }
          break;
        case 'content':
          if (state.subShowTitle == 'content') {
            // document.getElementById('listAdmin').setAttribute('style', 'display: none;')
            // document.getElementById('listContent').setAttribute('style', 'display: none;')
            document.getElementById('app-container').classList.remove('sub-show-temporary')
            document.getElementById('app-container').classList.add('menu-sub-hidden')
            document.getElementById('app-container').classList.add('sub-hidden')
            state.subShowTitle = ''
          } else {
            document.getElementById('listAdmin').setAttribute('style', 'display: none;')
            document.getElementById('listContent').setAttribute('style', 'display: block;')
            document.getElementById('app-container').classList.add('sub-show-temporary')
            document.getElementById('app-container').classList.remove('menu-sub-hidden')
            document.getElementById('app-container').classList.remove('sub-hidden')
            state.subShowTitle = 'content'
          }
        default:
          break;
      }
    },
    setCookie(state, payload) {
      Cookies.set(payload[0], payload[1], { expires: new Date(payload[2] * 1000) });
      localStorage.setItem('auth', '0')
    },
    removeCookie(state, cookieName) {
      Cookies.remove(cookieName);
    },
    closeAlert(state) {
      state.message = "";
      state.type = "";
    },
    mainHidden(state, payload) {
      if (state.mainHide) {
        document.getElementById('app-container').classList.remove('main-hidden')
        // document.getElementById('app-container').classList.add('sub-show-temporary')
        // document.getElementById('app-container').classList.remove('menu-sub-hidden')
        // document.getElementById('app-container').classList.remove('sub-hidden')
        state.mainHide = false
      } else {
        document.getElementById('app-container').classList.add('main-hidden')
        document.getElementById('app-container').classList.remove('sub-show-temporary')
        document.getElementById('app-container').classList.add('menu-sub-hidden')
        document.getElementById('app-container').classList.add('sub-hidden')
        state.mainHide = true
        state.subShowTitle = ''
      }
    }
  },
  actions: {
    setMenuAndMenuList({ commit }, payload) {
      commit('setMenu', [payload[0], payload[1]]);
      commit('setMenuList', payload[2]);
    }
  },
  modules: {
  }
})
