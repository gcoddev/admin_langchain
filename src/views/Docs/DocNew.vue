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
            <h5 class="mb-4">Crear nuevo documento</h5>

            <form class="row" @submit.prevent="validateForm">
              <label class="form-group has-float-label col-6">
                <input class="form-control" name="titulo" v-model="titulo" />
                <span v-if="errores.titulo" class="text-danger">
                  {{ errores.titulo }}
                </span>
                <span>Titulo</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  class="form-control"
                  type="date"
                  name="fecha"
                  v-model="fecha"
                />
                <span v-if="errores.fecha" class="text-danger">
                  {{ errores.fecha }}
                </span>
                <span>Fecha</span>
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

              <label class="form-group has-float-label col-12">
                <input
                  class="form-control"
                  type="file"
                  name="documento"
                  id="documento"
                  @change="changePdf"
                  accept="application/pdf"
                />
                <span v-if="errores.documento" class="text-danger">
                  {{ errores.documento }}
                </span>
                <span>Documento</span>
              </label>

              <button class="btn btn-primary" type="submit">Agregar</button>
              <button class="btn btn-dark" type="reset">Reset</button>
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
      descripcion: "",
      documento: "",
      fecha: "",
      errores: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    changePdf(event) {
      this.documento = event.target.files[0];
    },
    validateForm() {
      this.errores = {};

      if (!this.titulo) {
        this.errores.titulo = "El titulo es obligatorio.";
      }
      if (!this.fecha) {
        this.errores.fecha = "La fecha es obligatoria.";
      }
      if (!this.descripcion) {
        this.errores.descripcion = "La descripcion es obligatoria.";
      }
      if (!this.documento) {
        this.errores.documento = "El documento es obligatorio.";
      }

      if (Object.keys(this.errores).length == 0) {
        this.postDocumento();
      }
    },
    async postDocumento() {
      const data = {
        titulo: this.titulo,
        fecha: this.fecha,
        descripcion: this.descripcion,
        documento: this.documento,
      };
      try {
        const res = await this.axios.post(
          "/api/documentos/" + this.user.id,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$router.push("/docs");
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.errores = {};
          this.errores.documento = error.response.data.message;
        }
      }
    },
  },
};
</script>