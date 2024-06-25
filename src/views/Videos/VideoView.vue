<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Videos</h1>
        <div class="text-zero top-right-button-container">
          <router-link
            to="/videonew"
            class="btn btn-primary btn-lg top-right-button mr-1"
          >
            Nuevo video
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
            <li class="breadcrumb-item active" aria-current="page">Videos</li>
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
            <table ref="table" class="display" id="table-videos"></table>
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
  name: "VideosView",
  data() {
    return {
      videos: [],
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
      this.videos.forEach((element) => {
        if (element.estado != "2") {
          data.push({
            num: i,
            titulo: element.titulo,
            url: `<a href="${element.url}" target="_blank">${element.url}</a>`,
            descripcion: element.descripcion,
            estado: `<button type="button" class="border-0 badge bg-${
              element.estado == 1 ? "success" : "danger"
            } text-white" data-id="${element.id_video}" data-estado="${
              element.estado
            }" data-accion="estado">${
              element.estado == 1 ? "Activo" : "Inactivo"
            }</button>`,
            acciones: `<button type="button" data-accion="editar" data-id="${element.id_video}" class="btn btn-warning btn-sm">Editar</button>
                        <button type="button" data-accion="eliminar" data-id="${element.id_video}" class="btn btn-danger btn-sm">Eliminar</button> `,
          });
          i++;
        }
      });

      this.dataTableInstance = $(this.$refs.table).DataTable({
        data: data,
        columns: [
          { data: "num", title: "#" },
          { data: "titulo", title: "Titulo" },
          { data: "url", title: "Enlace" },
          { data: "descripcion", title: "Descripcion" },
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
            this.$router.push("/videoedit");
            this.$store.state.video_edit = id;
            break;
          case "eliminar":
            this.$store.state.video_edit = id;
            this.deleteVideo();
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
        const res = await this.axios.post("/api/videoEstado/" + id, {
          estado: data,
        });
        this.getVideos();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
      } catch (error) {
        console.log(error);
      }
    },
    async getVideos() {
      const id_user = localStorage.getItem("id_user");
      try {
        const res = await this.axios.get("/api/videos/" + id_user);
        this.videos = res.data;
        this.initDataTable();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteVideo() {
      try {
        const res = await this.axios.delete(
          "/api/video/" + this.$store.state.video_edit
        );
        this.getVideos();
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.video_edit = 0;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["content", "vid", "content"]);
    DataTable.use(DataTablesCore);
    this.getVideos();
  },
  mounted() {
    this.$store.commit("setMenu", ["content", "vid", "content"]);
    DataTable.use(DataTablesCore);
    this.getVideos();
  },
};
</script>
  