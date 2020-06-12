<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="box">
            <h1 class="title has-text-centered">LOGO</h1>
            <div v-if="error" class="notification is-danger is-light">
              {{ error }}
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model="email"
                  class="input"
                  type="email"
                  placeholder="Email"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-text-centered">
                <button class="button is-success is-medium" @click="login">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        });
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style></style>
