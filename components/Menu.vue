<template>
  <div class="menu-container column is-3">
    <aside class="menu">
      <ul class="menu-list ">
        <li>
          <a
            href="#"
            :class="{ 'is-active': activeNum == 0 }"
            @click="changeActiveLink(0)"
            >ホーム</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ 'is-active': activeNum == 1 }"
            @click="changeActiveLink(1)"
            >チャット</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ 'is-active': activeNum == 2 }"
            @click="changeActiveLink(2)"
            >探索</a
          >
        </li>
        <li>
          <a
            href="#"
            :class="{ 'is-active': activeNum == 3 }"
            @click="changeActiveLink(3)"
            >プロフィール</a
          >
        </li>
      </ul>
    </aside>
  </div>
</template>
<style lang="scss" scoped>
.is-vertical-center {
  display: flex;
  align-items: center;
}
.menu-container {
  border-right: 1px black solid;
  height: 100vh;
  .menu {
    margin-top: 40vh;
  }
}
</style>
<script>
export default {
  data() {
    return {
      activeNum: 0,
    };
  },
  methods: {
    changeActiveLink(n) {
      this.activeNum = n;
    },
  },
};
</script>
