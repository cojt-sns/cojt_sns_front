<template>
  <div :class="{ 'is-active': active }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <strong>
            AddTagModal
          </strong>
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <div v-if="error" class="notification is-danger is-light">
          {{ error }}
        </div>
        <div class="field">
          <label class="lavel">
            <p>
              <strong>ParentTag:#{{ tags.fullname }}</strong>
            </p>
          </label>
          <div class="control has-icons-left">
            <input
              v-model="childname"
              class="input"
              type="text"
              placeholder="Child Tag Name"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="['fas', 'flag']" />
            </span>
          </div>
        </div>
        <div>childname:"{{ childname }}"</div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="complete">
          Done
        </button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Tag from '@/plugins/axios/modules/tag';
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    tags: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: '',
      childname: '',
      isAbleClose: false,
    };
  },
  methods: {
    async complete() {
      this.error = '';
      if (this.childname === '') {
        this.error = 'empty';
        return;
      }
      await Tag.postTag(this.childname, this.tags.id);
      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
