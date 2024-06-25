<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Documentos</h1>
        <div class="text-zero top-right-button-container">
          <router-link
            to="/docnew"
            class="btn btn-primary btn-lg top-right-button mr-1"
          >
            Nuevo documento
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
import messagesCustom from "@/components/MessagesCustom.vue";
import { mapState } from "vuex";

export default {
  name: "HomeUser",
  data() {
    return {
      docs: [],
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
      this.docs.forEach((element) => {
        if (element.estado != "2") {
          data.push({
            num: i,
            titulo: element.titulo,
            descripcion: element.descripcion,
            documento: `<a href="${this.url_api}/documentos/${element.documento}" target="_blank" class="btn btn-sm btn-dark">Ver documento</a>`,
            estado: `<button type="button" class="border-0 badge bg-${
              element.estado == 1 ? "success" : "danger"
            } text-white" data-id="${element.id_doc}" data-estado="${
              element.estado
            }" data-accion="estado">${
              element.estado == 1 ? "Activo" : "Inactivo"
            }</button>`,
            acciones: `<button type="button" data-accion="editar" data-id="${element.id_doc}" class="btn btn-warning btn-sm">Editar</button>
                      <button type="button" data-accion="eliminar" data-id="${element.id_doc}" data-doc="${element.documento}" class="btn btn-danger btn-sm">Eliminar</button> `,
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
          { data: "documento", title: "Documento" },
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
            this.$router.push("/docedit");
            this.$store.state.doc_edit = id;
            break;
          case "eliminar":
            const doc = $(event.target).data("doc");
            this.$store.state.doc_edit = id;
            this.deleteDocument(doc);
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
        const res = await this.axios.post("/api/documentoEstado/" + id, {
          estado: data,
        });
        this.getDocumentos();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
      } catch (error) {
        console.log(error);
      }
    },
    async getDocumentos() {
      const id_user = localStorage.getItem("id_user");
      try {
        const res = await this.axios.get("/api/documentos/" + id_user);
        this.docs = res.data;
        this.initDataTable();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDocument(doc) {
      try {
        const res = await this.axios.delete(
          "/api/documento/" + this.$store.state.doc_edit + "/" + doc
        );
        this.getDocumentos();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.doc_edit = 0;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["content", "doc", "content"]);
    DataTable.use(DataTablesCore);
    this.getDocumentos();
  },
  mounted() {
    this.$store.commit("setMenu", ["content", "doc", "content"]);
    DataTable.use(DataTablesCore);
    this.getDocumentos();
  },
};
</script>
