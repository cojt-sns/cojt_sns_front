<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column head">
              <h1 class="title has-text-primary has-text-centered is-1">
                NESTA
              </h1>
              <div class="buttons is-centered">
                <nuxt-link
                  v-scroll-to="'#description'"
                  class="button is-primary is-outlined"
                  to="#"
                >
                  NESTAとは?
                </nuxt-link>
              </div>
            </div>
            <div class="column">
              <div class="box section">
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
                      class="button is-primary is-medium"
                      @click="login()"
                    >
                      ログイン
                    </button>
                  </p>
                </div>
                <h2 class="title is-6 has-text-centered has-text-grey bar">
                  または
                </h2>
                <div class="level">
                  <div class="level-item has-centerd">
                    <div class="field is-centered">
                      <div class="control">
                        <button
                          class="button is-size-6 is-outlined is-boxColor is-info"
                        >
                          <span class="icon">
                            <font-awesome-icon
                              :icon="['fab', 'twitter']"
                              size="lg"
                            />
                          </span>
                          <span>Twitterでログイン</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <p class="control has-text-centered">
                    <nuxt-link to="sinup">
                      アカウントを作成
                    </nuxt-link>
                  </p>
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
    <div class="container">
      <div class="section content">
        <h1 class="title has-text-centered is-3">
          NESTAには様々なグループがあります。
        </h1>
        <h1 class="title has-text-centered is-3">
          気になるグループに入り、チャットを楽しみましょう！
        </h1>
        <p>
          親譲りの無鉄砲で小供の時から損ばかりして居る。小学校に居る時分学校の二階から飛び降りて一週間程腰を抜かした事がある。なぜそんな無闇(むやみ)をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出して居たら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃(はや)したからである。小使に負(お)ぶさって帰って来た時、おやじが大きな眼をして二階位から飛び降りて腰を抜かす奴があるかと云ったから、此次(このつぎ)は抜かさずに飛んで見せますと答えた。
          　親類の者から西洋製のナイフを貰って奇麗な刃を日に翳(かざ)して、友達に見せて居たら、一人が光る事は光るが切れそうもないと云った。切れぬ事があるか、何でも切って見せると受け合った。そんなら君の指を切ってみろと注文したから、何だ指位此(この)通りだと右の手の親指の甲をはすに切り込んだ。幸(さいわい)ナイフが小さいのと、親指の骨が堅かったので、今だに親指は手に付いて居る。然し創痕(きずあと)は死ぬ迄消えぬ。
          　庭を東へ二十歩に行き尽すと、南上がりに聊(いささ)か許(ばか)りの菜園があって、真中に栗の木が一本立って居る。是(こ)れは命より大事な栗だ。実の熟する時分は起き抜けに脊戸(せど)を出て落ちた奴を拾ってきて、学校で食う。菜園の西側が山城屋(やましろや)と云う質屋の庭続きで、此(この)質屋に勘太郎という十三四の忰(せがれ)が居た。勘太郎は無論弱虫である。弱虫の癖に四つ目の垣根を乗りこえて、栗を盗みにくる。ある日の夕方折戸の蔭に隠れて、とうとう勘太郎を捕(つら)まえてやった。其(その)時勘太郎は逃げ路を失って、一生懸命に飛びかゝって来た。向うは二つ許り年上である。弱虫だが力は強い。鉢(はち)の開いた頭を、こっちの胸へ宛(あ)てゝぐいぐい押した拍子に、勘太郎の頭がすべって、おれの袷の袖の中に這入(はい)った。邪魔になって手が使えぬから、無闇(むやみ)に手を振ったら、袖の中にある勘太郎の頭が、左右へぐらぐら靡(なび)いた。仕舞に苦しがって袖の中から、おれの二の腕へ食い付いた。痛かったから勘太郎を垣根へ押しつけて置いて、足搦(あしがら)をかけて向(むこう)へ倒してやった。山城屋の地面は菜園より六尺がた低い。勘太郎は四つ目垣を半分崩(くず)して、自分の領分へ真逆様(まっさかさま)に落ちて、ぐうと云った。勘太郎が落ちるときに、おれの袷の片袖がもげて、急に手が自由になった。其(その)晩母が山城屋に詫(わ)びに行った序(つい)でに袷の片袖も取り返して来た。
          　此外(このほか)いたづらは大分やった。大工の兼公(かねこう)と肴屋(さかなや)の角(かく)をつれて、茂作(もさく)の人参畠(にんじんばたけ)をあらした事がある。人参の芽が出揃(でそろ)わぬ処へ藁(わら)が一面に敷いてあったから、其(その)上で三人が半日相撲(すもう)をとりつづけに取ったら、人参がみんな踏みつぶされて仕舞った。古川の持っている田圃(たんぼ)の井戸を埋めて尻(しり)を持ち込まれた事もある。太い孟宗(もうそう)の節を抜いて、深く埋めた中から水が沸(わ)き出て、そこいらの稲に水がかゝる仕掛であった。其(その)時分はどんな仕掛か知らぬから、石や棒ちぎれをぎゅうぎゅう井戸の中へ插(さ)し込んで、水が出なくなったのを見届けて、うちへ帰って飯を食って居たら、古川が真赤になって怒鳴り込んで来た。慥(たし)か罰金(ばっきん)を出して済んだ様である。
          　おやじは些(ちっ)ともおれを可愛がって呉(くれ)なかった。母は兄許(ばか)り贔負(ひいき)にして居た。此(この)兄はやに色が白くって、芝居の真似(まね)をして女形になるのが好きだった。おれを見る度にこいつはどうせ碌(ろく)なものにならないと、おやじが云った。乱暴で乱暴で行く先が案じられると母が云った。成程(なるほど)碌なものにはならない。御覧の通りの始末である。行く先が案じられたのも無理はない。只(ただ)懲役に行かないで生きて居る許りである。
          　母が病気で死ぬ二三日(にさんち)前台所で宙返りをしてへっついの角で肋骨(あばらぼね)を撲(う)って大(おおい)に痛かった。母が大層怒って、御前の様なものの顔は見たくないと云うから、親類へ泊まりに行って居た。するととうとう死んだと云う報知(しらせ)が来た。そう早く死ぬとは思わなかった。そんな大病なら、もう少し大人しくすればよかったと思って帰って来た。そうしたら例の兄がおれを親不孝だ、おれの為めに、おっかさんが早く死んだんだと云った。口惜(くや)しかったから、兄の横っ面を張って大変叱(しか)られた。
        </p>
      </div>
    </div>
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
        this.error = error.data.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.column.head {
  align-items: center;
}

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
