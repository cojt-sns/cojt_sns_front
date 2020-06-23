<template>
  <div :class="{ 'is-active': whichmodal == 1 }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          #{{ group.tags.map((tag) => tag.fullname).join('#') }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>

      <section class="modal-card-body">
        <button class="button is-medium is-rounded" @click="$emit('edit')">
          編集
        </button>
        <div class="field">
          <label v-if="group.public" class="label">Publicグループ</label>
          <label v-else class="label">Privateグループ</label>
        </div>
        <div class="field">
          <label class="label"
            >Twitter tracability:{{ group.twitter_traceability }}</label
          >
        </div>
        <div class="field">
          <label class="label">
            自己紹介欄:
            <span v-if="group.introduction">有り</span>
            <span v-else>無し</span>
          </label>
        </div>
        <div class="field">
          <label class="label">プロフィール質問</label>
          <div class="content">
            <ol type="1">
              <li v-for="(question, index) in group.questions" :key="index">
                {{ question }}
              </li>
            </ol>
          </div>
        </div>
      </section>
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
