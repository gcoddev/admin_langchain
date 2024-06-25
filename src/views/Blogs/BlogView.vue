<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Documentos</h1>
        <div class="text-zero top-right-button-container">
          <router-link
            to="/blognew"
            class="btn btn-primary btn-lg top-right-button mr-1"
          >
            Nuevo blog
          </router-link>
        </div>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Administracion</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Documentos
            </li>
          </ol>
        </nav>
        <div class="separator mb-5"></div>
      </div>
    </div>
    <messages-custom
      v-if="$store.state.message"
      :type="$store.state.type"
      :message="$store.state.message"
    />
    <div class="row mb-4">
      <div class="col-12 data-tables-ide-filter">
        <div class="card">
          <div class="card-body">
            <table ref="table" class="display" id="table-blogs"></table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <style>
@import "datatables.net-dt";
</style>
  
  <script>
// import $ from "jquery";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import messagesCustom from "@/components/MessagesCustom.vue";
import { mapState } from "vuex";

export default {
  name: "blogsnew",
  data() {
    return {
      blogs: [],
      dataTableInstance: null,
    };
  },
  components: {
    DataTable,
    messagesCustom,
  },
  computed: {
    ...mapState(["url_api", "user"]),
  },
  methods: {
    initDataTable() {
      if (this.dataTableInstance) {
        this.dataTableInstance.destroy();
        $(this.$refs.table).empty();
      }

      const data = [];
      let i = 1;
      this.blogs.forEach((element) => {
        if (element.estado != "2") {
          data.push({
            num: i,
            titulo: element.titulo,
            descripcion: element.descripcion,
            contenido: element.contenido,
            imagen: `<a href="${this.url_api}/imagenes/${element.imagen}" target="_blank">
                <img src="${this.url_api}/imagenes/${element.imagen}" width="150" crossorigin='anonymous'>
                </a>`,
            estado: `<button type="button" class="border-0 badge bg-${
              element.estado == 1 ? "success" : "danger"
            } text-white" data-id="${element.id_blog}" data-estado="${
              element.estado
            }" data-accion="estado">${
              element.estado == 1 ? "Activo" : "Inactivo"
            }</button>`,
            acciones: `<button type="button" data-accion="editar" data-id="${element.id_blog}" class="btn btn-warning btn-sm">Editar</button>
                        <button type="button" data-accion="eliminar" data-id="${element.id_blog}" data-img="${element.imagen}" class="btn btn-danger btn-sm">Eliminar</button> `,
          });
          i++;
        }
      });

      this.dataTableInstance = $(this.$refs.table).DataTable({
        data: data,
        columns: [
          { data: "num", title: "#" },
          { data: "titulo", title: "Titulo" },
          { data: "descripcion", title: "Descripcion" },
          { data: "contenido", title: "Contenido" },
          { data: "imagen", title: "Imagen" },
          { data: "estado", title: "Estado" },
          { data: "acciones", title: "Acciones" },
        ],
        language: {
          paginate: {
            previous: "&lt;",
            next: "&gt;",
          },
        },
      });

      $(this.$refs.table).off("click", "button");

      $(this.$refs.table).on("click", "button", (event) => {
        const accion = $(event.target).data("accion");
        const id = $(event.target).data("id");
        switch (accion) {
          case "estado":
            const estado = $(event.target).data("estado");
            this.cambiarEstado(id, estado);
            break;
          case "editar":
            this.$router.push("/blogedit");
            this.$store.state.blog_edit = id;
            break;
          case "eliminar":
            const img = $(event.target).data("img");
            this.$store.state.blog_edit = id;
            this.deleteBlog(img);
            break;
        }
      });
    },
    async cambiarEstado(id, estado) {
      try {
        let data = "1";
        if (estado == "1") {
          data = "0";
        } else {
          estado = "1";
        }
        const res = await this.axios.post("/api/blogEstado/" + id, {
          estado: data,
        });
        this.getBlogs();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
      } catch (error) {
        console.log(error);
      }
    },
    async getBlogs() {
      const id_user = localStorage.getItem("id_user");
      try {
        const res = await this.axios.get("/api/blogs/" + id_user);
        this.blogs = res.data;
        this.initDataTable();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBlog(img) {
      try {
        const res = await this.axios.delete(
          "/api/blog/" + this.$store.state.blog_edit + "/" + img
        );
        this.getBlogs();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.blog_edit = 0;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["content", "blog", "content"]);
    DataTable.use(DataTablesCore);
    this.getBlogs();
  },
  mounted() {
    this.$store.commit("setMenu", ["content", "blog", "content"]);
    DataTable.use(DataTablesCore);
    this.getBlogs();
  },
};
</script>