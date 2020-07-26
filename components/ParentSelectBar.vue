<template>
  <ul class="menu-list">
    <div
      :class="[
        targetGroupId !== group.id && available
          ? 'level'
          : 'level un-available',
      ]"
      :style="'padding-left: ' + depth * 15 + 'px'"
      @click="GroupClicked(group)"
    >
      <div class="level-left">
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
      <li class="level-right">
        <button
          class="button is-primary is-outlined"
          @click="UpdateParent(group.id)"
        >
          選択
        </button>
      </li>
    </div>
    <transition
      name="group"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-if="group.children.length >= 1" v-show="open" class="children">
        <ParentSelectBar
          v-for="child in group.children"
          :key="child.id"
          :group="child"
          :target-group-id="targetGroupId"
          :available="targetGroupId !== group.id && available"
          :depth="depth + 1"
        />
      </div>
    </transition>
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
    targetGroupId: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      open: false,
    };
  },
  methods: {
    async UpdateParent(id) {
      await Group.putGroup(this.targetGroupId, null, id);
      window.location.href = '/groups/' + this.targetGroupId;
    },

    GroupClicked() {
      this.open = !this.open;
    },

    beforeEnter(el) {
      el.style.height = '0';
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    afterEnter(el) {
      el.style.height = 'auto';
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave(el, done) {
      this.$velocity(
        el,
        { height: '0px' },
        { duration: 500 },
        { complete: done }
      );
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
    padding: 5px 10px;
    margin: 0;

    &:nth-child(even) {
      border-top: none;
      border-bottom: none;
    }

    .fa-lg {
      margin-right: 5px;
    }

    .level-right {
      visibility: hidden;
    }

    &:hover {
      background-color: #eee;
    }

    &:hover > .level-right {
      visibility: visible;
    }
  }

  .un-available {
    color: #ccc;
    &:hover > .level-right {
      visibility: hidden;
    }
  }
}

.children {
  margin-left: auto;
  overflow: hidden;
}

.group-enter-active {
  transition: height 0.8s;
}

.group-enter,
.group-leave-to {
  height: 0;
}
</style>
