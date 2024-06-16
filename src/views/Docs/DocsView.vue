<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Documentos</h1>
        <div class="text-zero top-right-button-container">
          <button
            type="button"
            class="btn btn-primary btn-lg top-right-button mr-1"
            @click="$router.push('/docnew')"
          >
            Agregar documento
          </button>
        </div>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Contenido</a>
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
            <table ref="table" class="display" id="table-docs"></table>
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
import { mapState } from "vuex";
import messagesCustom from "@/components/MessagesCustom.vue";

export default {
  name: "Docs",
  data() {
    return {
      docsAll: [],
    };
  },
  computed: {
    ...mapState(["url_api"]),
  },
  components: {
    DataTable,
    messagesCustom,
  },
  methods: {
    initDataTableAll() {
      const data = [];
      let i = 1;
      this.docsAll.forEach((element) => {
        if (element.estado != 2) {
          data.push({
            num: i,
            titulo: element.titulo,
            descripcion: element.descripcion,
            documento: `<a href="${this.url_api}/documentos/${element.documento}" target="_blank" class="btn btn-sm btn-dark">Ver</a>`,
            fecha: element.fecha,
            estado: `<span class="badge bg-${
              element.estado == 1 ? "success" : "danger"
            } text-white">${
              element.estado == 1 ? "Activo" : "Inactivo"
            }</span>`,
            usuario: element.usuario.nombres,
            acciones: `<a href="#" class="btn btn-warning btn-sm">Editar</a> <a href="#" class="btn btn-danger btn-sm">Eliminar</a>`,
          });
          i++;
        }
      });
      const table = $(this.$refs.table).DataTable({
        data: data,
        columns: [
          { data: "num", title: "#" },
          { data: "titulo", title: "titulo" },
          { data: "descripcion", title: "descripcion" },
          { data: "documento", title: "documento" },
          { data: "fecha", title: "fecha" },
          { data: "usuario", title: "Usuario" },
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
    },
    async getDocumentosAll() {
      try {
        const res = await this.axios.get("/api/documentosAll");
        this.docsAll = res.data;
        this.initDataTableAll();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["content", "docs"]);
    DataTable.use(DataTablesCore);
    this.getDocumentosAll();
  },
  mounted() {},
};
</script>