<template>
  <div :class="{ 'is-active': whichmodal == 1 }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">#{{ group.fullname }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>

      <section class="modal-card-body">
        <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <span v-if="group.public" class="tag is-success">Public</span>
            <span v-else class="tag is-danger">Private</span>
          </div>
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-light">VisibleProfile</span>
              <span v-if="group.visible_profile" class="tag is-info">
                Yes
              </span>
              <span v-else class="tag is-danger">
                No
              </span>
            </div>
          </div>
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-light">Introduction</span>
              <span v-if="group.introduction" class="tag is-info">
                Required
              </span>
              <span v-else class="tag is-danger">
                No
              </span>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Questions</label>
          <div class="content">
            <ol type="1">
              <li v-for="(question, index) in group.questions" :key="index">
                {{ question }}
              </li>
            </ol>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button" @click="$emit('edit')">
          Edit
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
    whichmodal: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-card-title {
  flex: 1;
}
</style>
