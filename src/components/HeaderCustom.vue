<template>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a
        href="#"
        class="menu-button d-none d-md-block"
        @click="$store.commit('mainHidden')"
      >
        <svg class="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">
          <rect x="0.48" y="0.5" width="7" height="1" />
          <rect x="0.48" y="7.5" width="7" height="1" />
          <rect x="0.48" y="15.5" width="7" height="1" />
        </svg>
        <svg class="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">
          <rect x="1.56" y="0.5" width="16" height="1" />
          <rect x="1.56" y="7.5" width="16" height="1" />
          <rect x="1.56" y="15.5" width="16" height="1" />
        </svg>
      </a>

      <a
        href="#"
        class="menu-button-mobile d-xs-block d-sm-block d-md-none"
        @click="$store.commit('mainHidden')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
          <rect x="0.5" y="0.5" width="25" height="1" />
          <rect x="0.5" y="7.5" width="25" height="1" />
          <rect x="0.5" y="15.5" width="25" height="1" />
        </svg>
      </a>

      <!-- <div class="search" data-search-path="Pages.Search.html?q=">
        <input placeholder="Search..." />
        <span class="search-icon">
          <i class="simple-icon-magnifier"></i>
        </span>
      </div> -->
    </div>

    <router-link class="navbar-logo" to="/">
      <img
        src="@/assets/banner.png"
        width="200"
        alt="Logo"
        class="d-none d-lg-block"
      />
      <!-- <span class="logo d-none d-xs-block"></span> -->
      <!-- <span class="logo-mobile d-block d-xs-none"></span> -->
    </router-link>

    <div class="navbar-right">
      <div class="header-icons d-inline-block align-middle">
        <div class="d-none d-md-inline-block align-text-bottom mr-3">
          <div
            class="custom-switch custom-switch-primary-inverse custom-switch-small pl-1"
            data-toggle="tooltip"
            data-placement="left"
            title="Dark Mode"
          >
            <input
              class="custom-switch-input"
              id="switchDark"
              type="checkbox"
              v-model="dark"
              @change="changeDarkMode()"
            />
            <label class="custom-switch-btn" for="switchDark"></label>
          </div>
        </div>

        <button
          class="header-icon btn btn-empty d-none d-sm-inline-block"
          type="button"
          id="fullScreenButton"
        >
          <i class="simple-icon-size-fullscreen"></i>
          <i class="simple-icon-size-actual"></i>
        </button>
      </div>

      <div class="user d-inline-block">
        <button
          class="btn btn-empty p-0"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="name">
            {{ user.nombres }}
            <span class="fw-bold" v-if="user.role"
              >({{ user.role.descripcion }})</span
            >
          </span>
          <span>
            <img alt="Profile Picture" src="@/assets/chatbot.jpg" />
          </span>
        </button>

        <div class="dropdown-menu dropdown-menu-right mt-3">
          <!-- <a class="dropdown-item" href="#">Perfil</a> -->
          <a class="dropdown-item" href="#" @click="confirmSignout()"
            >Cerrar sesion</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "headerCustom",
  data() {
    return {
      dark: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    confirmSignout() {
      this.$swal({
        title: "¿Estás seguro?",
        text: "¿Quieres cerrar sesión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit("removeCookie", "auth");
          localStorage.setItem("auth", "1");
          this.$router.push("/signin");
          this.$store.state.user = {};
        }
      });
    },
    changeDarkMode() {
      if (this.dark) {
        localStorage.setItem("dore-theme-color", "dore.dark.bluenavy.min.css");
      } else {
        localStorage.setItem("dore-theme-color", "dore.light.bluenavy.min.css");
      }
      window.location.reload();
    },
  },
  created() {
    const mode = localStorage.getItem("dore-theme-color");
    if (mode.includes("dark")) {
      this.dark = true;
    } else {
      this.dark = false;
    }
  },
};
</script>