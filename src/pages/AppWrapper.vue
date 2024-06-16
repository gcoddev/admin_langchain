<template>
  <header-custom />
  <sidebar-custom />
  <main>
    <router-view></router-view>
  </main>
  <footer-custom />
</template>

<script>
import headerCustom from "@/components/HeaderCustom.vue";
import sidebarCustom from "@/components/SidebarCustom.vue";
import footerCustom from "@/components/FooterCustom.vue";
export default {
  name: "AppWrapper",
  components: {
    headerCustom,
    sidebarCustom,
    footerCustom,
  }
};
</script>