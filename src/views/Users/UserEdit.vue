<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Nuevo usuario</h1>
        <nav
          class="breadcrumb-container d-none d-sm-block d-lg-inline-block"
          aria-label="breadcrumb"
        >
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item">
              <a href="#">Administración</a>
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
            <h5 class="mb-4">Crear nuevo usuario</h5>

            <form class="row" @submit.prevent="validateForm">
              <label class="form-group has-float-label col-6">
                <input
                  type="text"
                  class="form-control"
                  name="ci"
                  v-model="ci"
                />
                <span v-if="errores.ci" class="text-danger">
                  {{ errores.ci }}
                </span>
                <span>CI</span>
              </label>

              <label class="form-group has-float-label col-6">
                <select class="form-control" name="expedido" v-model="expedido">
                  <option value=""></option>
                  <option value="LP">LP</option>
                  <option value="OR">OR</option>
                  <option value="PT">PT</option>
                  <option value="PD">PD</option>
                  <option value="BN">BN</option>
                  <option value="SCZ">SCZ</option>
                  <option value="CO">CO</option>
                  <option value="CH">CH</option>
                  <option value="TJ">TJ</option>
                </select>
                <span v-if="errores.expedido" class="text-danger">
                  {{ errores.expedido }}
                </span>
                <span>Expedido</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="text"
                  class="form-control"
                  name="paterno"
                  v-model="paterno"
                />
                <span v-if="errores.paterno" class="text-danger">
                  {{ errores.paterno }}
                </span>
                <span>Apellido paterno</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="text"
                  class="form-control"
                  name="materno"
                  v-model="materno"
                />
                <span v-if="errores.materno" class="text-danger">
                  {{ errores.materno }}
                </span>
                <span>Apellido materno</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="text"
                  class="form-control"
                  name="nombres"
                  v-model="nombres"
                />
                <span v-if="errores.nombres" class="text-danger">
                  {{ errores.nombres }}
                </span>
                <span>Nombres</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  class="form-control"
                  type="date"
                  name="nacimiento"
                  v-model="nacimiento"
                />
                <span v-if="errores.nacimiento" class="text-danger">
                  {{ errores.nacimiento }}
                </span>
                <span>Fecha de nacimiento</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="text"
                  class="form-control"
                  name="celular"
                  v-model="celular"
                />
                <span v-if="errores.celular" class="text-danger">
                  {{ errores.celular }}
                </span>
                <span>Numero de celular</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  v-model="email"
                />
                <span v-if="errores.email" class="text-danger">
                  {{ errores.email }}
                </span>
                <span>Correo electronico</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  v-model="username"
                />
                <span v-if="errores.username" class="text-danger">
                  {{ errores.username }}
                </span>
                <span>Nombre de usuario</span>
              </label>

              <label class="form-group has-float-label col-6">
                <select class="form-control" name="id_rol" v-model="id_rol">
                  <option value=""></option>
                  <option
                    :value="rol.id_rol"
                    v-for="(rol, id) of roles"
                    :key="id"
                  >
                    {{ rol.descripcion }}
                  </option>
                </select>
                <span v-if="errores.id_rol" class="text-danger">
                  {{ errores.id_rol }}
                </span>
                <span>id_rol</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  v-model="password"
                />
                <span v-if="errores.password" class="text-danger">
                  {{ errores.password }}
                </span>
                <span>Contraseña</span>
              </label>

              <label class="form-group has-float-label col-6">
                <input
                  type="password"
                  class="form-control"
                  name="password2"
                  v-model="password2"
                />
                <span v-if="errores.password2" class="text-danger">
                  {{ errores.password2 }}
                </span>
                <span>Confirmar contraseña</span>
              </label>

              <button class="me-3 btn btn-primary" type="submit">
                Agregar
              </button>
              <button class="me-3 btn btn-dark" type="reset" @click="reset()">
                Reset
              </button>
              <router-link to="/user" class="me-3 btn btn-secondary">
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
import { mapState } from "vuex";
export default {
  name: "usernew",
  data() {
    return {
      id: 0,
      ci: "",
      expedido: "",
      paterno: "",
      materno: "",
      nombres: "",
      nacimiento: "",
      celular: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      id_rol: 0,
      errores: {},
      roles: [],
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

      if (!this.ci) {
        this.errores.ci = "El ci es obligatorio.";
      }
      if (!this.expedido) {
        this.errores.expedido = "El expedido es obligatorio.";
      }
      if (!this.paterno) {
        this.errores.paterno = "El apellido paterno es obligatorio.";
      }
      if (!this.materno) {
        this.errores.materno = "El apellido materno es obligatorio.";
      }
      if (!this.nombres) {
        this.errores.nombres = "El nombre es obligatorio.";
      }
      if (!this.nacimiento) {
        this.errores.nacimiento = "La fecha de nacimiento es obligatorio.";
      }
      if (!this.celular) {
        this.errores.celular = "El numero de celular es obligatorio.";
      }
      if (!this.email) {
        this.errores.email = "El correo es obligatorio.";
      }
      if (!this.username) {
        this.errores.username = "El nombre de usuario es obligatorio.";
      }
      if (this.id_rol == 0) {
        this.errores.id_rol = "El rol es obligatorio.";
      }
      if (!this.password) {
        this.errores.password = "La contraseña es obligatorio.";
      }
      if (!this.password2) {
        this.errores.password2 = "Debe confirmar la contraseña.";
      } else {
        if (this.password != this.password2) {
          this.errores.password2 = "Las contraseñas no coinciden.";
        }
      }

      if (Object.keys(this.errores).length == 0) {
        this.putUsuario();
      }
    },
    async putUsuario() {
      const data = {
        ci: this.ci,
        expedido: this.expedido,
        paterno: this.paterno,
        materno: this.materno,
        nombres: this.nombres,
        nacimiento: this.nacimiento,
        celular: this.celular,
        email: this.email,
        username: this.username,
        password: this.password,
        id_rol: this.id_rol,
      };
      try {
        const res = await this.axios.put("/api/usuario/" + this.id, data, {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        });
        this.$store.state.message = res.data.message;
        this.$store.state.type = "success";
        this.$store.state.user_edit = 0;
        this.$router.push("/user");
      } catch (error) {
        console.log(error);
        // if (error.response.status == 400) {
        //   this.errores = {};
        //   this.errores.documento = error.response.data.message;
        // }
      }
    },
    reset() {
      this.ci = "";
      this.expedido = "";
      this.paterno = "";
      this.materno = "";
      this.nombres = "";
      this.nacimiento = "";
      this.celular = "";
      this.email = "";
      this.username = "";
      this.password = "";
    },
    async getRoles() {
      try {
        const res = await this.axios.get("/api/roles");
        this.roles = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsuario() {
      try {
        const res = await this.axios.get(
          "/api/usuario/" + this.$store.state.user_edit
        );
        this.id = res.data.id;
        this.ci = res.data.ci;
        this.expedido = res.data.expedido;
        this.paterno = res.data.paterno;
        this.materno = res.data.materno;
        this.nombres = res.data.nombres;
        this.nacimiento = res.data.nacimiento;
        this.celular = res.data.celular;
        this.email = res.data.email;
        this.username = res.data.username;
        this.id_rol = res.data.id_rol;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.$store.state.user_edit == 0) {
      this.$router.push("/user");
    }
    this.getRoles();
    this.getUsuario();
  },
  mounted() {
    if (this.$store.state.user_edit == 0) {
      this.$router.push("/user");
    }
    this.getRoles();
    this.getUsuario();
  },
};
</script>