<template>
  <div class="wrapper">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  mounted() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('orientationchange', this.resize);

    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('orientationchange', this.resize);
  },
  methods: {
    resize() {
      let hullHeight = document.getElementsByClassName('is-fullheight');
      for (const element of hullHeight) {
        element.style.height = window.innerHeight + 'px';
      }

      hullHeight = document.getElementsByClassName('wrapper');
      for (const element of hullHeight) {
        element.style.height = window.innerHeight + 'px';
      }
    },
  },
};
</script>

<style scoped></style>
