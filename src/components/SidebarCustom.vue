<template>
  <div class="menu">
    <div class="main-menu">
      <div class="scroll">
        <ul class="list-unstyled">
          <li :class="[$store.state.menu[0] == 'admin' ? 'active' : '']">
            <a href="#" @click="$store.commit('setMenuList', 'admin')">
              <i class="simple-icon-user"></i>
              <span>Administracion</span>
            </a>
          </li>
          <li :class="[$store.state.menu[0] == 'content' ? 'active' : '']">
            <a href="#" @click="$store.commit('setMenuList', 'content')">
              <i class="simple-icon-grid"></i>
              <span>Contenido</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="sub-menu">
      <div class="scroll">
        <ul class="list-unstyled" data-link="admin" id="listAdmin">
          <li :class="[$store.state.menu[1] == 'home' ? 'active' : '']">
            <router-link
              to="/"
              @click="$store.commit('setMenu', ['admin', 'home'])"
            >
              <i class="simple-icon-home"></i>
              <span class="d-inline-block">Inicio</span>
            </router-link>
          </li>
          <li :class="[$store.state.menu[1] == 'user' ? 'active' : '']">
            <router-link
              to="/user"
              @click="$store.commit('setMenu', ['admin', 'user'])"
            >
              <i class="simple-icon-user"></i>
              <span class="d-inline-block">Usuarios</span>
            </router-link>
          </li>
        </ul>
        <ul class="list-unstyled" data-link="content" id="listContent">
          <li :class="[$store.state.menu[1] == 'doc' ? 'active' : '']">
            <router-link
              to="/doc"
              @click="$store.commit('setMenu', ['content', 'doc'])"
            >
              <i class="simple-icon-docs"></i>
              <span class="d-inline-block">Documentos</span>
            </router-link>
          </li>
          <li :class="[$store.state.menu[1] == 'vid' ? 'active' : '']">
            <router-link
              to="/video"
              @click="$store.commit('setMenu', ['content', 'vid'])"
            >
              <i class="simple-icon-arrow-right"></i>
              <span class="d-inline-block">Videos</span>
            </router-link>
          </li>
          <li :class="[$store.state.menu[1] == 'blog' ? 'active' : '']">
            <router-link
              to="/blog"
              @click="$store.commit('setMenu', ['content', 'blog'])"
            >
              <i class="simple-icon-book-open"></i>
              <span class="d-inline-block">Blogs</span>
            </router-link>
          </li>
          <!-- <li :class="[$store.state.menu[1] == 'chat' ? 'active' : '']">
            <router-link
              to="/chat"
              @click="$store.commit('setMenu', ['content', 'chat'])"
            >
              <i class="simple-icon-pie-chart"></i>
              <span class="d-inline-block">Chat</span>
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebatCustom",
  data() {
    return {};
  },
};
</script>