<template>
  <div class="columns is-mobile">
    <div
      class="column is-1 is-narrow-mobile is-fullheight section is-hidden-mobile has-background-dark"
    >
      Menu
    </div>
    <div
      class="column is-3 is-narrow-mobile is-fullheight section has-background-grey"
    >
      Group
    </div>
    <div class="column is-fullheight section has-background-info">
      Main Content
    </div>
    <div
      class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile has-background-black"
    >
      Notification
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.columns {
  height: 100vh;
  width: 100vw;
  .column {
    // overflow-y: scroll;
  }
}
</style>
