<template>
  <div>
    <section class="hero is-primary is-fullheight bar2">
      <div class="hero-body">
        <div class="columns" style="width:100%">
          <div class="column is-half">
            <h1 class="title is-1 has-text-centered">NESTA</h1>
            <div class="buttons is-centered">
              <nuxt-link to="#description">
                <button
                  class="button is-primary is-inverted is-outlined center"
                >
                  NESTAとは?
                </button>
              </nuxt-link>
            </div>
          </div>
          <div class="column is-half">
            <div class="columns ">
              <div
                class="column is-10
is-offset-1 "
              >
                <div class="box is-boxColor">
                  <div class="columns ">
                    <div
                      class="column is-10
is-offset-1"
                    >
                      <div v-if="error" class="notification is-danger is-light">
                        {{ error }}
                      </div>
                      <div class="field">
                        <p class="control has-icons-right">
                          <input
                            v-model="email"
                            class="input"
                            type="email"
                            placeholder="メールアドレス"
                          />
                        </p>
                      </div>
                      <div class="field">
                        <p class="control ">
                          <input
                            v-model="password"
                            class="input"
                            type="password"
                            placeholder="パスワード"
                          />
                        </p>
                      </div>
                      <div class="field">
                        <p class="control has-text-centered">
                          <button
                            class="button box-button-color is-medium"
                            @click="login"
                          >
                            ログイン
                          </button>
                        </p>
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
                              <button
                                class="button is-size-6 is-outlined is-boxColor"
                                @click="submit"
                              >
                                Twitterでログイン
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns bar2">
                    <div class="column is-full"></div>
                  </div>
                  <div class="columns ">
                    <div
                      class="column is-10
is-offset-1"
                    >
                      <div class="field">
                        <p class="control has-text-centered">
                          <button class="button is-medium is-boxColor">
                            アカウントを作成
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="description" class="hero is-primary">
      <div class="hero-body">
        <h1 class="title is-1">自由につながるSNSです。</h1>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered ">
          <h1 class="title is-3">NESTAには様々なグループがあります。</h1>
          <h1 class="title is-3">
            気になるグループに入り、チャットを楽しみましょう！
          </h1>
          <div id="low-description" class="bar2"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  layout: 'top',
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
<style>
.add-line::before {
  color: #ccc;
  content: '-------------------';
}
.add-line::after {
  color: #ccc;
  content: '-------------------';
}
.bar2 {
  border-bottom: 0.5px solid white;
  margin-top: 0px; /* 上線の外側の余白はナシ */
  padding-top: 0px; /* 上線の内側の余白はナシ */
  margin-bottom: 0.3em; /* 下線の外側の余白量 */
  padding-bottom: 0.3em; /* 下線の内側の余白量 */
}
.box-button-color {
  color: #fd671a;
}
.box-button-color:hover {
  color: red;
}
.is-boxColor {
  background-color: #fd671a;
  color: white;
}
#low-description {
  width: 100%;
  border-color: #fd5600;
  margin: 300px 0 200px 0;
}
</style>
