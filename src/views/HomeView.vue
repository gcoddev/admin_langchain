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
                  <i class="iconsminds-clock"></i>
                  <p class="card-text mb-0">Pending Orders</p>
                  <p class="lead text-center">16</p>
                </div>
              </a>

              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="iconsminds-basket-coins"></i>
                  <p class="card-text mb-0">Completed Orders</p>
                  <p class="lead text-center">32</p>
                </div>
              </a>

              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="iconsminds-arrow-refresh"></i>
                  <p class="card-text mb-0">Refund Requests</p>
                  <p class="lead text-center">2</p>
                </div>
              </a>

              <a href="#" class="card col-3">
                <div class="card-body text-center">
                  <i class="iconsminds-mail-read"></i>
                  <p class="card-text mb-0">New Comments</p>
                  <p class="lead text-center">25</p>
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
  created() {
    this.$store.commit("setMenu", ["admin", "home"]);
  },
};
</script>