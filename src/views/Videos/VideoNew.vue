<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Videos</h1>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Contenido</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Nuevo</li>
          </ol>
        </nav>
        <div class="separator mb-5"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="mb-4">Crear nuevo video</h5>

            <form class="row" @submit.prevent="validateForm">
              <label class="form-group has-float-label col-5">
                <input class="form-control" name="titulo" v-model="titulo" />
                <span v-if="errores.titulo" class="text-danger">
                  {{ errores.titulo }}
                </span>
                <span>Titulo</span>
              </label>

              <label class="form-group has-float-label col-7">
                <input class="form-control" name="url" v-model="url" placeholder="https://www.youtube.com/watch?v=" />
                <span v-if="errores.url" class="text-danger">
                  {{ errores.url }}
                </span>
                <span>Enlace de video (youtube)</span>
              </label>

              <label class="form-group has-float-label col-12">
                <input
                  class="form-control"
                  type="text"
                  name="descripcion"
                  v-model="descripcion"
                />
                <span v-if="errores.descripcion" class="text-danger">
                  {{ errores.descripcion }}
                </span>
                <span>Descripcion</span>
              </label>

              <button class="btn btn-primary" type="submit">Agregar</button>
              <button class="btn btn-dark" type="reset" @click="reset()">
                Reset
              </button>
              <router-link to="/doc" class="btn btn-secondary">
                Volver
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  name: "docnew",
  data() {
    return {
      titulo: "",
      url: "",
      descripcion: "",
      errores: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    validateForm() {
      this.errores = {};

      if (!this.titulo) {
        this.errores.titulo = "El titulo es obligatorio.";
      }
      if (!this.descripcion) {
        this.errores.descripcion = "La descripcion es obligatoria.";
      }
      if (!this.url) {
        this.errores.url = "El enlace es obligatorio.";
      } else if (!this.url.includes("watch?v=")) {
        this.errores.url = "Debe ser un video de youtube.";
      }

      if (Object.keys(this.errores).length == 0) {
        this.postVideo();
      }
    },
    async postVideo() {
      const data = {
        titulo: this.titulo,
        url: this.url,
        descripcion: this.descripcion,
      };
      const id_user = localStorage.getItem("id_user");
      try {
        const res = await this.axios.post("/api/videos/" + id_user, data);
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$router.push("/video");
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      this.titulo = "";
      this.url = "";
      this.descripcion = "";
    },
  },
};
</script>