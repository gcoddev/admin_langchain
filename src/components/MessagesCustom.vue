<template>
  <div
    class="alert alert-dismissible fade show"
    :class="['alert-' + type]"
    role="alert"
  >
    <strong>{{ message }}</strong>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="$store.commit('closeAlert')"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "alertMessages",
  props: {
    message: String,
    type: String,
  },
};
</script>