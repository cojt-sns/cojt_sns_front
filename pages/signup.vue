<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds is-offset-2">
            <h2 class="title is-1 has-text-centered has-text-primary">NESTA</h2>
            <div class="box">
              <h1 class="title is-3 has-text-centered">アカウントを作成する</h1>
              <h1 class="has-text-centered">
                <router-view></router-view>
              </h1>
              <div v-if="error" class="notification is-danger is-light">
                {{ error }}
              </div>
              <div class="columns">
                <div class="column is-full">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="username"
                        class="input has-text-light"
                        type="text"
                        placeholder="ユーザー名"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'user']" />
                      </span>
                      <span class="icon is-small is-right">
                        <font-awesome-icon :icon="['fas', 'check']" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-full">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="email"
                        class="input"
                        type="email"
                        placeholder="メールアドレス"
                        @change="check(email, reemail)"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="reemail"
                        class="input"
                        type="email"
                        placeholder="メールアドレスの確認"
                        @change="check(email, reemail)"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="password"
                        class="input"
                        type="password"
                        placeholder="パスワード"
                        @change="check(password, repassword)"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'key']" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        v-model="repassword"
                        class="input"
                        type="password"
                        placeholder="パスワードの確認"
                        @change="check(password, repassword)"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'key']" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="level">
                <div class="level-item has-centerd">
                  <div class="field is-centered">
                    <div class="control">
                      <nuxt-link :to="nextURL" class="has-text-white">
                        <button
                          class="button is-size-4 is-primary"
                          @click="submit"
                        >
                          新規作成
                        </button>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
              <h2
                class="title is-6 has-text-centered has-text-grey-lighter add-line"
              >
                または
              </h2>
              <div class="level">
                <div class="level-item has-centerd">
                  <div class="field is-centered">
                    <div class="control">
                      <nuxt-link :to="nextURL" class="has-text-white">
                        <button
                          class="button is-size-6 is-outlined is-info"
                          @click="submit"
                        >
                          Twitterでログイン
                        </button>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import User from '@/plugins/axios/modules/user';
export default {
  data() {
    return {
      username: '',
      email: '',
      reemail: '',
      password: '',
      repassword: '',
      htmlerror: '',
      error: '',
      nextURL: '',
    };
  },
  methods: {
    check(text, refill) {
      if (!refill) return;
      if (text !== refill) this.error = 'not same input';
      else this.error = '';
    },
    async submit() {
      if (
        this.email === '' ||
        this.reemail === '' ||
        this.password === '' ||
        this.repassword === '' ||
        this.username === ''
      ) {
        this.error = 'empty form exists';
        return;
      }
      if (this.email !== this.reemail) {
        this.error = 'email is varying';
        return;
      }

      if (this.password !== this.repassword) {
        this.error = 'password is varying';
        return;
      }
      const res = await User.postUser(this.username, this.email, this.password);
      console.log(res);
      try {
        await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        });
      } catch (error) {
        this.error = error;
      }
      this.nextURL = '/first';
    },
  },
};
</script>

<style>
.add-line:before {
  color: #ccc;
  content: '-------------------';
}
.add-line:after {
  color: #ccc;
  content: '-------------------';
}
</style>
