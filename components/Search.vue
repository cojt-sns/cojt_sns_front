<template>
  <div class="column is-fullheight">
    <div class="level search-type">
      <div class="level-item">
        <h1
          v-if="$route.query.type != 'graph'"
          class="title is-5 has-text-primary"
        >
          List
        </h1>
        <nuxt-link
          v-else
          to="/search?type=list"
          class="title is-5 has-text-grey"
        >
          List
        </nuxt-link>
      </div>
      <div class="level-item">
        <h1
          v-if="$route.query.type == 'graph'"
          class="title is-5 has-text-primary"
        >
          Graph
        </h1>
        <nuxt-link
          v-else
          to="/search?type=graph"
          class="title is-5 has-text-grey"
        >
          Graph
        </nuxt-link>
      </div>
    </div>
    <div v-if="$route.query.type != 'graph'" class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="keyword"
          type="text"
          class="input"
          @keydown.enter="searchGroups()"
        />
      </div>
      <div class="control">
        <!-- eslint-disable no-irregular-whitespace -->
        <nuxt-link
          class="button"
          :to="`/search?type=list&keywords=${keyword.split(/[ 　]/).join(' ')}`"
        >
          Search
        </nuxt-link>
      </div>
    </div>
    <hr />
    <div v-if="$route.query.type != 'graph'" class="">
      <div v-for="group in search" :key="group.id">
        <nuxt-link :to="`/groups/${group.id}`">#{{ group.fullname }}</nuxt-link>
      </div>
    </div>
    <div v-else class="">
      Graph
    </div>
  </div>
</template>

<script>
export default {
  props: {
    search: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      keyword: this.$route.query.keywords ?? '',
    };
  },
  methods: {
    searchGroups() {
      this.$router.push(
        // eslint-disable-next-line no-irregular-whitespace
        `/search?type=list&keywords=${this.keyword.split(/[ 　]/).join(' ')}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.search-type {
  width: 60%;
  margin: 10px auto;
  margin-bottom: 20px;
}
.field {
  width: 70%;
  margin: 0 auto;
}
</style>
