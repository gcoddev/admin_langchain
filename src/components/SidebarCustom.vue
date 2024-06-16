<template>
  <div class="menu">
    <div class="main-menu">
      <div class="scroll">
        <ul class="list-unstyled">
          <li :class="[$store.state.menu[0] == 'admin' ? 'active' : '']">
            <a href="#admin">
              <i class="simple-icon-grid"></i>
              <span>Administracion</span>
            </a>
          </li>
          <li :class="[$store.state.menu[0] == 'content' ? 'active' : '']">
            <a href="#content">
              <i class="simple-icon-grid"></i>
              <span>Contenido</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="sub-menu">
      <div class="scroll">
        <ul class="list-unstyled" data-link="admin">
          <li :class="[$store.state.menu[1] == 'home' ? 'active' : '']">
            <router-link
              to="/"
              @click="$store.commit('setMenu', ['admin', 'home'])"
            >
              <i class="simple-icon-pie-chart"></i>
              <span class="d-inline-block">Inicio</span>
            </router-link>
          </li>
          <li :class="[$store.state.menu[1] == 'user' ? 'active' : '']">
            <router-link
              to="/user"
              @click="$store.commit('setMenu', ['admin', 'user'])"
            >
              <i class="simple-icon-basket-loaded"></i>
              <span class="d-inline-block">Usuarios</span>
            </router-link>
          </li>
        </ul>
        <ul class="list-unstyled" data-link="content">
          <li :class="[$store.state.menu[1] == 'docs' ? 'active' : '']">
            <router-link
              to="/docs"
              @click="$store.commit('setMenu', ['content', 'docs'])"
            >
              <i class="simple-icon-pie-chart"></i>
              <span class="d-inline-block">Documentos</span>
            </router-link>
          </li>
          <li :class="[$store.state.menu[1] == 'chat' ? 'active' : '']">
            <router-link
              to="/chat"
              @click="$store.commit('setMenu', ['content', 'chat'])"
            >
              <i class="simple-icon-pie-chart"></i>
              <span class="d-inline-block">Chat</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>