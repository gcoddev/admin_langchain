<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Blogs</h1>
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
            <h5 class="mb-4">Editar blog</h5>

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

              <label class="form-group has-float-label col-5">
                <input
                  class="form-control"
                  type="file"
                  name="imagen"
                  id="imagen"
                  @change="changePdf"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                />
                <span v-if="errores.imagen" class="text-danger">
                  {{ errores.imagen }}
                </span>
                <span>Imagen</span>
              </label>

              <div class="form-group col-7">
                <label for="contenido">Contenido</label>
                <ckeditor
                  id="contenido"
                  :editor="editor"
                  v-model="contenido"
                  :config="editorConfig"
                ></ckeditor>
                <span v-if="errores.contenido" class="text-danger">
                  {{ errores.contenido }}
                </span>
              </div>

              <button class="btn btn-primary" type="submit">Editar</button>
              <button class="btn btn-dark" type="reset" @click="reset()">
                Reset
              </button>
              <router-link to="/blog" class="btn btn-secondary" type="button">
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "docedit",
  data() {
    return {
      titulo: "",
      descripcion: "",
      imagen: "",
      imagenEdit: "",
      editor: ClassicEditor,
      contenido: "",
      editorConfig: {
        language: "es",
      },
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
      if (!this.imagen) {
        this.errores.imagen = "La imagen es obligatorio.";
      }
      if (!this.contenido) {
        this.errores.contenido = "El contenido es obligatorio.";
      }
      if (this.imagenEdit) {
        this.putImagen();
      }
      if (Object.keys(this.errores).length == 0) {
        this.putBlog();
      }
    },
    async putBlog() {
      const data = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        contenido: this.contenido,
      };
      try {
        const res = await this.axios.put(
          "/api/blog/" + this.$store.state.blog_edit,
          data
        );
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.blog_edit = 0;
        this.$router.push("/blog");
      } catch (error) {
        console.log(error);
      }
    },
    async putImagen() {
      const data = {
        imagen: this.imagenEdit,
      };
      try {
        await this.axios.put(
          "/api/blog/" + this.$store.state.blog_edit + "/" + this.imagen,
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
          this.$store.state.blog_edit = 0;
        }
      }
    },
    reset() {
      this.titulo = "";
      this.descripcion = "";
      this.documentoEdit = "";
      this.contenido = "";
    },
    async getBlog() {
      try {
        const res = await this.axios.get(
          "/api/blog/" + this.$store.state.blog_edit
        );
        this.titulo = res.data.titulo;
        this.descripcion = res.data.descripcion;
        this.contenido = res.data.contenido;
        this.imagen = res.data.imagen;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.$store.state.blog_edit == 0) {
      this.$router.push("/blog");
    }
    this.getBlog();
  },
  mounted() {
    if (this.$store.state.blog_edit == 0) {
      this.$router.push("/blog");
    }
    this.getBlog();
  },
};
</script>