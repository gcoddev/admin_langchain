<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Dashboard</h1>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Administracion</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Inicio</li>
          </ol>
        </nav>
        <div class="separator mb-5"></div>
      </div>
      <div class="col-12">
        <div class="icon-cards-row">
          <div class="dashboard-numbers">
            <div class="row">
              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="simple-icon-user"></i>
                  <p class="card-text mb-0">Usuarios</p>
                  <p class="lead text-center">
                    {{ Object.keys(users).length }}
                  </p>
                </div>
              </a>

              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="simple-icon-docs"></i>
                  <p class="card-text mb-0">Documentos</p>
                  <p class="lead text-center">{{ Object.keys(docs).length }}</p>
                </div>
              </a>

              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="iconsminds-video"></i>
                  <p class="card-text mb-0">Videos</p>
                  <p class="lead text-center">
                    {{ Object.keys(videos).length }}
                  </p>
                </div>
              </a>

              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="simple-icon-book-open"></i>
                  <p class="card-text mb-0">Blogs</p>
                  <p class="lead text-center">
                    {{ Object.keys(blogs).length }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      users: [],
      docs: [],
      videos: [],
      blogs: [],
    };
  },
  methods: {
    async getUsuarios() {
      try {
        const res = await this.axios.get("/api/usuarios");
        res.data.forEach((el) => {
          if (el.estado != "2") {
            this.users.push(el);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getDocumentos() {
      try {
        const res = await this.axios.get("/api/documentosAll");
        res.data.forEach((el) => {
          if (el.estado != "2") {
            this.docs.push(el);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getVideos() {
      try {
        const res = await this.axios.get("/api/videosAll");
        res.data.forEach((el) => {
          if (el.estado != "2") {
            this.videos.push(el);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getBlogs() {
      try {
        const res = await this.axios.get("/api/blogsAll");
        res.data.forEach((el) => {
          if (el.estado != "2") {
            this.blogs.push(el);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.commit("setMenu", ["admin", "home"]);
    // this.$store.commit("setMenuList", "admin");

    this.getUsuarios();
    this.getDocumentos();
    this.getVideos();
    this.getBlogs();
  },
};
</script>