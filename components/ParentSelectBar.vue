<template>
  <ul class="menu-list">
    <div
      :class="[
        target_group_id !== group.id && available
          ? 'level'
          : 'level un-available',
      ]"
      @click="GroupClicked(group)"
    >
      <div class="level-right">
        <font-awesome-icon
          v-if="group.children.length >= 1"
          v-show="open"
          :icon="['fa', 'angle-down']"
          size="lg"
        />
        <font-awesome-icon
          v-if="group.children.length >= 1"
          v-show="!open"
          :icon="['fa', 'angle-right']"
          size="lg"
        />
        #{{ group.name }}
      </div>
      <li class="level-left">
        <button class="button" @click="UpdateParent(group.id)">選択</button>
      </li>
    </div>
    <div
      v-if="group.children.length >= 1"
      v-show="open"
      class="children"
      style="width: 97%;"
    >
      <ParentSelectBar
        v-for="child in group.children"
        :key="child.id"
        :group="child"
        :target_group_id="target_group_id"
        :available="target_group_id !== group.id && available"
      />
    </div>
  </ul>
</template>

<script>
import Group from '@/plugins/axios/modules/group';
import ParentSelectBar from '@/components/ParentSelectBar';

export default {
  name: 'ParentSelectBar',
  components: {
    ParentSelectBar,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
    target_group_id: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      open: false,
    };
  },
  mounted() {
    // this.getGroups();
  },
  methods: {
    async UpdateParent(id) {
      const res = await Group.putGroup(this.target_group_id, null, id);
      window.location.href = '/groups/' + this.target_group_id;
    },

    GroupClicked() {
      this.open = !this.open;
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

.menu-list {
  .level {
    border: 1px solid #dddddd;
    padding: 5px 10px;
    margin: 0;

    &:nth-child(even) {
      border-top: none;
      border-bottom: none;
    }

    .fa-lg {
      margin-right: 5px;
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

  .un-available {
    background-color: #eee;

    &:hover > .level-left {
      visibility: hidden;
    }
  }
}

.children {
  margin-left: auto;
}
</style>
