<template>
  <div :class="{ 'is-active': isShow }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ groupUser.name }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">質問への回答</label>
          <div class="content">
            <ol type="1">
              <li v-for="(question, index) in group.questions" :key="index">
                <p>Q:{{ question }}</p>
                <p>A:{{ groupUser.answers[index] }}</p>
              </li>
            </ol>
          </div>
        </div>
        <div v-if="group.introduction" class="field">
          <label class="label">自己紹介</label>
          <div class="content">{{ groupUser.introduction }}</div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button" @click="$emit('edit')">Edit</button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    groupUser: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
    isShow: {
      type: Boolean,
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
