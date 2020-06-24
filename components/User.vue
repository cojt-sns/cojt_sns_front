<template>
  <div class="column is-fullheight section has-background-info">
    <UserEditModal v-model="user_" :edit="edit" @close="closeModal()" />
    <!-- show profile -->
    <div class="section">
      <div class="columns">
        <div class="column">
          <div class="box">
            <div class="columns">
              <div class="column is-2">
                <div class="image is-128x128 has-text-centered">
                  <img :src="user_.image" alt srcset />
                </div>
              </div>
              <div class="column">
                <div class="title has-text-centered username">
                  {{ user_.name }}
                </div>
              </div>
              <div class="column is-2 is-offser-10">
                <button
                  class="button is-medium is-rounded"
                  @click="openModal()"
                >
                  編集
                </button>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="has-text-centered is-size-4">
                  Here comes user_.bio{{ user_.bio }}
                </div>
              </div>
            </div>
            <ul class="has-text-centered">
              <li v-for="tag in user_.tags" :key="tag.id">
                #{{ tag.fullname }}
              </li>
            </ul>
            <!-- userのtwitter情報 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserEditModal from '~/components/UserEditModal';
export default {
  components: {
    UserEditModal,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      edit: false,
      user_: this.user,
    };
  },
  methods: {
    openModal() {
      this.edit = true;
    },
    closeModal() {
      this.edit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.columns {
  align-items: center;
}
.username {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
