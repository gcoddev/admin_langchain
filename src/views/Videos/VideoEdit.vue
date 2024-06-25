<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Documentos</h1>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Contenido</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Editar</li>
          </ol>
        </nav>
        <div class="separator mb-5"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="mb-4">Editar documento</h5>

            <form class="row" @submit.prevent="validateForm">
              <label class="form-group has-float-label col-5">
                <input class="form-control" name="titulo" v-model="titulo" />
                <span v-if="errores.titulo" class="text-danger">
                  {{ errores.titulo }}
                </span>
                <span>Titulo</span>
              </label>

              <label class="form-group has-float-label col-7">
                <input class="form-control" name="url" v-model="url" />
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

              <button class="btn btn-primary" type="submit">Editar</button>
              <button class="btn btn-dark" type="reset" @click="reset()">
                Reset
              </button>
              <router-link to="/video" class="btn btn-secondary" type="button">
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
export default {
  name: "videoedit",
  data() {
    return {
      titulo: "",
      descripcion: "",
      url: "",
      errores: {},
    };
  },
  methods: {
    validateForm() {
      this.errores = {};

      if (!this.titulo) {
        this.errores.titulo = "El titulo es obligatorio.";
      }
      if (!this.url) {
        this.errores.url = "El enlace es obligatorio.";
      } else if (!this.url.includes("watch?v=")) {
        this.errores.url = "Debe ser un video de youtube.";
      }
      if (!this.descripcion) {
        this.errores.descripcion = "La descripcion es obligatoria.";
      }
      if (Object.keys(this.errores).length == 0) {
        this.putVideo();
      }
    },
    async putVideo() {
      const data = {
        titulo: this.titulo,
        url: this.url,
        descripcion: this.descripcion,
      };
      try {
        const res = await this.axios.put(
          "/api/video/" + this.$store.state.video_edit,
          data
        );
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        setTimeout(() => {
          this.$store.state.message = "";
          this.$store.state.type = "";
        }, 2000);
        this.$store.state.video_edit = 0;
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
    async getVideo() {
      try {
        const res = await this.axios.get(
          "/api/video/" + this.$store.state.video_edit
        );
        this.titulo = res.data.titulo;
        this.url = res.data.url;
        this.descripcion = res.data.descripcion;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.$store.state.video_edit == 0) {
      this.$router.push("/video");
    }
    this.getVideo();
  },
  mounted() {
    if (this.$store.state.video_edit == 0) {
      this.$router.push("/video");
    }
    this.getVideo();
  },
};
</script>