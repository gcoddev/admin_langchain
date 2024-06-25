<template>
  <div class="fixed-background"></div>
  <main>
    <div class="container">
      <div class="row h-100">
        <div class="col-12 col-md-10 mx-auto my-auto">
          <div class="card auth-card">
            <div class="position-relative image-side d-none d-lg-block">
              <img src="@/assets/upea.png" width="250" alt="" />
              <div class="">
                <a href="https://gcod.dev" target="_blank">Dev</a>
              </div>
            </div>
            <div class="form-side">
              <router-link to="/" class="d-flex justify-content-center">
                <img src="@/assets/banner.png" width="250" alt="" />
              </router-link>
              <messages-custom
                v-if="$store.state.message"
                :type="$store.state.type"
                :message="$store.state.message"
              />
              <h3 class="my-4" style="font-weight: bold">Iniciar sesion</h3>
              <form @submit.prevent="login()">
                <label class="form-group has-float-label mb-4">
                  <input type="text" class="form-control" v-model="username" />
                  <span>Usuario</span>
                </label>

                <label class="form-group has-float-label mb-4">
                  <input
                    class="form-control"
                    type="password"
                    placeholder=""
                    v-model="password"
                  />
                  <span>Contraseña</span>
                </label>
                <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="btn btn-primary btn-lg btn-shadow"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import messagesCustom from "@/components/MessagesCustom.vue";
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    messagesCustom,
  },
  methods: {
    async login() {
      const data = {
        username: this.username,
        password: this.password,
      };
      try {
        const res = await this.axios.post("/api/login", data);
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.commit("setCookie", [
          "auth",
          res.data.token,
          res.data.expires,
        ]);
        localStorage.setItem("user", this.username);
        localStorage.setItem("id_user", res.data.credencial);
        setTimeout(() => {
          this.$router.push("/");
          location.reload();
        }, 2000);
      } catch (error) {
        if (error.response.status == 400) {
          this.username = localStorage.getItem("user");
          this.password = "";
        }
        if (error.response.status == 401) {
          this.password = "";
        }
        console.log(error);
        this.$store.state.message = error.response.data.message;
        this.$store.state.type = "danger";
      }
    },
  },
  created() {
    this.username = localStorage.getItem("user");
    const auth = this.$store.getters.getCookie("auth");
    if (auth) {
      this.$router.push("/");
    } else if (localStorage.getItem("auth")) {
      if (localStorage.getItem("auth") == "1") {
        this.$store.state.message = "Sesion cerrada con exito.";
        this.$store.state.type = "success";
      } else {
        this.$store.state.message = "La sesion a expirado.";
        this.$store.state.type = "warning";
      }
      localStorage.removeItem("auth");
    }
  },
};
</script>