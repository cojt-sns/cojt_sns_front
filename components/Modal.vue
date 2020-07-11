<template>
  <div class="modal">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content">
      <div class="header has-background-primary">
        <div class="title is-3 has-text-white has-text-centered">
          {{ title }}
        </div>
      </div>
      <div class="section has-background-white">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-content {
  border-radius: 10px;
  .header {
    padding: 15px;
  }
  .section {
    padding-top: 30px;
    padding-bottom: 35px;
  }
}
</style>
