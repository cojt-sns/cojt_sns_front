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
                        class="input"
                        type="text"
                        placeholder="ユーザー名"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'user']" />
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
                        @change="check(email, reemail), validateMail(email)"
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
                        @change="check(email, reemail), validateMail(email)"
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
                      <button
                        class="button is-size-5 is-primary"
                        @click="submit"
                      >
                        新規作成
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h2 class="title is-6 has-text-centered has-text-grey bar">
                または
              </h2>
              <div class="level">
                <div class="level-item has-centerd">
                  <div class="field is-centered">
                    <div class="control">
                      <a
                        class="button is-size-6 is-outlined is-info"
                        :href="serverUrl + '/auth/twitter'"
                      >
                        <span class="icon">
                          <font-awesome-icon
                            :icon="['fab', 'twitter']"
                            size="lg"
                          />
                        </span>
                        <span>
                          Twitterでログイン
                        </span>
                      </a>
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
  layout: 'top',
  data() {
    return {
      username: '',
      email: '',
      reemail: '',
      password: '',
      repassword: '',
      htmlerror: '',
      error: '',
      flag1: true,
      flag2: true,
      emailValid: false,
      buttonPushed: false,
      serverUrl: process.env.SERVER_URL,
    };
  },
  methods: {
    validateMail(email) {
      if (email) {
        if (
          !email.match(
            /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
          )
        ) {
          this.flag1 = false;
          this.emailValid = false;
          this.error = 'メールアドレスの形式が正しくありません';
        } else {
          this.flag1 = true;
          this.emailValid = true;
          if (this.flag2) {
            this.error = '';
          }
        }
      } else {
        this.flag1 = false;
        this.error = 'メールアドレスを入力してください';
      }
    },
    check(text, refill) {
      if (!refill) {
        this.flag2 = true;
        if (this.flag1) {
          this.error = '';
        }
        return;
      }
      if (text !== refill) {
        this.flag2 = false;
        this.error = 'メールアドレスが一致しません';
      } else {
        this.flag2 = true;
        if (this.flag1) {
          this.error = '';
        }
      }
    },
    async submit() {
      if (this.buttonPushed) {
        return;
      }
      this.buttonPushed = true;
      if (
        this.email === '' ||
        this.reemail === '' ||
        this.password === '' ||
        this.repassword === '' ||
        this.username === ''
      ) {
        this.error = '空欄が存在します';
        this.buttonPushed = false;
        return;
      }
      if (!this.emailValid) {
        this.error = 'メールアドレスの形式が正しくありません 修正してください';
        this.buttonPushed = false;
        return;
      }
      if (this.email !== this.reemail) {
        this.error = 'メールアドレスが一致しません';
        this.buttonPushed = false;

        return;
      }

      if (this.password !== this.repassword) {
        this.error = 'パスワードが一致しません';
        this.buttonPushed = false;

        return;
      }
      try {
        await User.postUser(this.username, this.email, this.password);
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

<style lang="scss" scoped>
.bar {
  &::before,
  &::after {
    flex-grow: 1;
    flex-shrink: 1;
    background-color: #dbdbdb;
    height: 1px;
    position: relative;
    margin: 5px;
    width: 35%;
    content: '';
    display: inline-block;
  }
}
</style>
