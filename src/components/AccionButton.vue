<template>
  <div>
    <router-link :to="`/usernew/${id}`" class="btn btn-warning btn-sm"
      >Editar</router-link
    >
    <a href="#" class="btn btn-danger btn-sm" @click="eliminar">Eliminar</a>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    tabla: String,
  },
};
</script>