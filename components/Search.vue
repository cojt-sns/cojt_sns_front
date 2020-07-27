<template>
  <div class="column is-fullheight">
    <MainHeader v-if="$device.isMobile" title="Search" :groups="groups" />
    <div class="top">
      <div class="level search-type is-mobile">
        <div class="level-item">
          <h1
            v-if="$route.query.type != 'graph'"
            class="title is-5 has-text-primary"
          >
            List
          </h1>
          <a v-else class="title is-5 has-text-grey" @click="moveToList()">
            List
          </a>
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
            :to="
              `/search?type=list&keywords=${keyword.split(/[ 　]/).join(' ')}`
            "
          >
            Search
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="$route.query.type != 'graph'" class="list-result">
      <GroupPanelList :groups="search" />
    </div>
    <GroupGraph
      v-show="$route.query.type == 'graph'"
      class="graph"
      :groups="all"
    />
  </div>
</template>

<script>
import MainHeader from '~/components/MainHeader';
import GroupPanelList from '@/components/GroupPanelList';
import GroupGraph from '@/components/GroupGraph';
export default {
  components: {
    MainHeader,
    GroupPanelList,
    GroupGraph,
  },
  props: {
    search: {
      type: Array,
      required: true,
    },
    all: {
      type: Array,
      required: true,
    },
    groups: {
      type: Array,
      required: false,
      default: null,
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
    moveToList() {
      this.$router.push('/search?type=list');
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-flow: column;
  padding: 0;
  .top {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    .search-type {
      width: 60%;
      margin: 10px auto;
    }
    .field {
      width: 70%;
      margin: 0 auto;
    }
  }
  .list-result {
    flex: 1;
    overflow-y: scroll;
  }
  .graph {
    flex: 1;
    overflow: hidden;
  }
}
</style>
