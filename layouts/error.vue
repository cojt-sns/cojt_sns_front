<template>
  <main class="container">
    <section class="section has-text-centered">
      <h1 class="title">{{ error.statusCode }}</h1>
      <p v-if="error.statusCode === 404" class="subtitle has-text-grey m-t-30">
        指定されたページが見つかりませんでした。<br />
        既に削除されたか、URLが間違っている可能性があります。
      </p>
      <p v-else class="subtitle has-text-grey m-t-30">
        {{ error.data }}
      </p>
      <div class="columns has-text-centered">
        <div class="column">
          <nuxt-link
            :to="error.statusCode === 404 ? '/groups' : '/'"
            class="button is-primary"
          >
            ホームに戻る
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
