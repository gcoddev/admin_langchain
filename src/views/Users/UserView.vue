<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Usuario</h1>
        <div class="text-zero top-right-button-container">
          <router-link
            to="/usernew"
            class="btn btn-primary btn-lg top-right-button mr-1"
          >
            Nuevo usuario
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
            <li class="breadcrumb-item active" aria-current="page">Usuarios</li>
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
import messagesCustom from "@/components/MessagesCustom.vue";

export default {
  name: "HomeUser",
  data() {
    return {
      users: [],
      dataTableInstance: null,
    };
  },
  components: {
    DataTable,
    messagesCustom,
  },
  methods: {
    initDataTable() {
      if (this.dataTableInstance) {
        this.dataTableInstance.destroy();
        $(this.$refs.table).empty();
      }

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
            celular: element.celular,
            username: element.username,
            estado: `<button type="button" class="border-0 badge bg-${
              element.estado == 1 ? "success" : "danger"
            } text-white" data-id="${element.id}" data-estado="${
              element.estado
            }" data-accion="estado">${
              element.estado == 1 ? "Activo" : "Inactivo"
            }</button>`,
            acciones: `<button type="button" data-accion="editar" data-id="${element.id}" class="btn btn-warning btn-sm">Editar</button>
                      <button type="button" data-accion="eliminar" data-id="${element.id}" class="btn btn-danger btn-sm">Eliminar</button> `,
          });
          i++;
        }
      });

      this.dataTableInstance = $(this.$refs.table).DataTable({
        data: data,
        columns: [
          { data: "num", title: "#" },
          { data: "nombres", title: "Nombres" },
          { data: "paterno", title: "Paterno" },
          { data: "materno", title: "Materno" },
          { data: "ci", title: "CI" },
          { data: "role", title: "Rol" },
          { data: "celular", title: "Celular" },
          { data: "username", title: "Usuario" },
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
            if (id != 1) {
              this.cambiarEstado(id, estado);
            } else {
              this.$store.state.message =
                "No se puede desactivar el administrador";
              this.$store.state.type = "danger";
            }
            break;
          case "editar":
            this.$router.push("/useredit");
            this.$store.state.user_edit = id;
            break;
          case "eliminar":
            this.$store.state.user_edit = id;
            this.deleteUser();
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
        const res = await this.axios.post("/api/usuarioEstado/" + id, {
          estado: data,
        });
        this.getUsersAll();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
      } catch (error) {
        console.log(error);
      }
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
    async deleteUser() {
      try {
        const res = await this.axios.delete(
          "/api/usuario/" + this.$store.state.user_edit
        );
        this.getUsersAll();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.user_edit = 0;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["admin", "user", "admin"]);
    DataTable.use(DataTablesCore);
    this.getUsersAll();
  },
  mounted() {},
};
</script>
