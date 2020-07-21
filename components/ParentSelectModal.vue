<template>
  <Modal
    :class="{ 'is-active': open }"
    :title="'親グループを選択'"
    @close="$emit('close')"
  >
    <div class="wr">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input
            v-model="query"
            type="text"
            class="input"
            @keydown.enter="searchGroups()"
          />
        </div>
        <div class="control">
          <!-- eslint-disable no-irregular-whitespace -->
          <button class="button" @click="searchGroups()">
            Search
          </button>
        </div>
      </div>
      <aside class="menu">
        <ParentSelectBar
          v-for="group in groups"
          :key="group.id"
          :group="group"
          :target-group-id="group_id"
          :available="true"
        />
      </aside>
    </div>
  </Modal>
</template>

<script>
import Group from '@/plugins/axios/modules/group';
import Modal from '@/components/Modal';
import ParentSelectBar from '@/components/ParentSelectBar';

export default {
  components: {
    Modal,
    ParentSelectBar,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    group_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      error: '',
      groups: [],
      query: '',
    };
  },
  mounted() {
    // this.getGroups();
  },
  watch: {
    open(newValue) {
      if (newValue && this.groups.length <= 0) {
        this.getGroups();
      }
    },
  },
  methods: {
    async searchGroups() {
      this.groups = [];
      this.groups = await Group.searchGroup(this.query, null, 1);
    },

    UpdateParent() {
      Group.putGroup(this.query);
    },

    async getGroups() {
      try {
        this.groups = await Group.searchGroup(null, null, -1);
      } catch (error) {
        this.error = error.data.message.name[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-card {
  overflow: visible;
  .modal-card-body {
    overflow: visible;
  }
}
.wr {
  max-height: 60vh;
  overflow: auto;
  .menu-list {
    .level {
      border: 1px solid #dddddd;
      padding: 5px 10px;
      margin: 0;

      &:nth-child(even) {
        border-top: none;
        border-bottom: none;
      }

      .level-left {
        visibility: hidden;
      }

      &:hover {
        background-color: #eee;
      }

      &:hover > .level-left {
        visibility: visible;
      }
    }
  }
}
</style>
