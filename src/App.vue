<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  methods: {
    async verificarToken() {
      const auth = this.$store.getters.getCookie("auth");
      const data = {
        token: auth,
      };
      try {
        const res = await this.axios.post("/api/token", data);
        if (res.data.message.iss) {
          if (res.data.message.iss == "ApiChatbotLangChain") {
            this.axios.defaults.headers = {
              Authorization: "Bearer " + auth,
            };
            this.getUser(res.data.message.sub);
          } else {
            this.$store.state.user = {};
            this.$store.commit("removeCookie", "auth");
            this.$router.push("/signin");
          }
        } else {
          this.$swal({
            title: "Error",
            text: res.data.message,
            icon: "info",
            confirmButtonText: "Aceptar",
          }).then(() => {
            this.$store.state.user = {};
            this.$store.commit("removeCookie", "auth");
            this.$router.push("/signin");
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUser(id_user) {
      try {
        const res = await this.axios.get("/api/usuario/" + id_user);
        this.$store.state.user = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const auth = this.$store.getters.getCookie("auth");
    if (auth) {
      this.verificarToken();
    } else {
      this.$router.push("/signin");
    }
  },
};
</script>