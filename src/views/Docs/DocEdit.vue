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

              <button class="btn btn-primary" type="submit">Editar</button>
              <button class="btn btn-dark" type="reset" @click="reset()">
                Reset
              </button>
              <router-link to="/doc" class="btn btn-secondary" type="button">
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
  name: "docedit",
  data() {
    return {
      titulo: "",
      descripcion: "",
      documento: "",
      documentoEdit: "",
      errores: {},
    };
  },
  methods: {
    changePdf(event) {
      this.documentoEdit = event.target.files[0];
    },
    validateForm() {
      this.errores = {};

      if (!this.titulo) {
        this.errores.titulo = "El titulo es obligatorio.";
      }
      if (!this.descripcion) {
        this.errores.descripcion = "La descripcion es obligatoria.";
      }
      if (!this.documento) {
        this.errores.documento = "El documento es obligatorio.";
      }
      if (this.documentoEdit) {
        this.putDocumentoPdf();
      }
      if (Object.keys(this.errores).length == 0) {
        this.putDocumento();
      }
    },
    async putDocumento() {
      const data = {
        titulo: this.titulo,
        descripcion: this.descripcion,
      };
      try {
        const res = await this.axios.put(
          "/api/documento/" + this.$store.state.doc_edit,
          data
        );
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.doc_edit = 0;
        this.$router.push("/doc");
      } catch (error) {
        console.log(error);
      }
    },
    async putDocumentoPdf() {
      const data = {
        documento: this.documentoEdit,
      };
      try {
        await this.axios.put(
          "/api/documento/" + this.$store.state.doc_edit + "/" + this.documento,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          this.errores = {};
          this.$store.state.message = error.response.data.message;
          this.$store.state.type = "danger";
          this.$store.state.doc_edit = 0;
        }
      }
    },
    reset() {
      this.titulo = "";
      this.descripcion = "";
      this.documentoEdit = "";
    },
    async getDocumento() {
      try {
        const res = await this.axios.get(
          "/api/documento/" + this.$store.state.doc_edit
        );
        this.titulo = res.data.titulo;
        this.descripcion = res.data.descripcion;
        this.documento = res.data.documento;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.$store.state.doc_edit == 0) {
      this.$router.push("/doc");
    }
    this.getDocumento();
  },
  mounted() {
    if (this.$store.state.doc_edit == 0) {
      this.$router.push("/doc");
    }
    this.getDocumento();
  },
};
</script>