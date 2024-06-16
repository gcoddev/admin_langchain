<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Usuario</h1>
        <div class="text-zero top-right-button-container">
          <button
            type="button"
            class="btn btn-primary btn-lg top-right-button mr-1"
          >
            Nuevo usuario
          </button>
        </div>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Administracion</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Usuarios</li>
          </ol>
        </nav>
        <div class="separator mb-5"></div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 data-tables-ide-filter">
        <div class="card">
          <div class="card-body">
            <table ref="table" class="display" id="table-users"></table>
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

export default {
  name: "HomeUser",
  data() {
    return {
      users: [],
    };
  },
  components: {
    DataTable,
  },
  methods: {
    initDataTable() {
      const data = [];
      let i = 1;
      this.users.forEach((element) => {
        if (element.estado != "2") {
          data.push({
            num: i,
            nombres: element.nombres,
            paterno: element.paterno,
            materno: element.materno,
            ci: element.ci,
            role: element.role.nombre,
            estado: `<span class="badge bg-${
              element.estado == 1 ? "success" : "danger"
            } text-white">${
              element.estado == 1 ? "Activo" : "Inactivo"
            }</span>`,
            acciones: `<a href="#" class="btn btn-warning btn-sm">Editar</a> <a href="#" class="btn btn-danger btn-sm">Eliminar</a>`,
          });
          i++;
        }
      });
      const table = $(this.$refs.table).DataTable({
        data: data,
        columns: [
          { data: "num", title: "#" },
          { data: "nombres", title: "Nombres" },
          { data: "paterno", title: "Paterno" },
          { data: "materno", title: "Materno" },
          { data: "ci", title: "CI" },
          { data: "role", title: "Rol" },
          { data: "estado", title: "Estado" },
          { data: "acciones", title: "Acciones" },
        ],
        language: {
          paginate: {
            previous: "&lt;", // HTML para el botón "Prev"
            next: "&gt;", // HTML para el botón "Next"
          },
        },
      });
    },
    async getUsersAll() {
      try {
        const res = await this.axios.get("/api/usuarios");
        this.users = res.data;
        this.initDataTable();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["admin", "user"]);
    DataTable.use(DataTablesCore);
    this.getUsersAll();
  },
  mounted() {},
};
</script>