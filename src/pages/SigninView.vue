<template>
  <div class="fixed-background"></div>
  <main>
    <div class="container">
      <div class="row h-100">
        <div class="col-12 col-md-10 mx-auto my-auto">
          <div class="card auth-card">
            <div class="position-relative image-side">
              <p class="text-white h2">MAGIC IS IN THE DETAILS</p>

              <p class="white mb-0">
                Please use your credentials to login.
                <br />If you are not a member, please
                <a href="#" class="white">register</a>.
              </p>
            </div>
            <div class="form-side">
              <a href="Dashboard.Default.html">
                <span class="logo-single"></span>
              </a>
              <messages-custom
                v-if="$store.state.message"
                :type="$store.state.type"
                :message="$store.state.message"
              />
              <h6 class="mb-4">Iniciar sesion</h6>
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
        this.message = res.data.message;
        this.type = "success";
        this.$store.commit("setCookie", [
          "auth",
          res.data.token,
          res.data.expires,
        ]);
        localStorage.setItem("user", this.username);
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