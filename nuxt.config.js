require('dotenv').config();

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'NESTA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fd5600' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios/index',
    { src: '@/plugins/actioncable', ssr: false },
    { src: '~/plugins/croppie.js', ssr: false },
    { src: '~/plugins/velocity-animate.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    '@/plugins/vue-scrollto',
    '@/plugins/dayjs',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    'nuxt-fontawesome',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
  ],

  styleResources: {
    sass: ['~/assets/_variables.scss'],
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.SERVER_URL,
  },
  auth: {
    redirect: {
      login: false,
      logout: false,
      callback: false,
      home: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'auth_token',
          },
          user: { url: '/auth/user', method: 'get', propertyName: false },
          logout: { url: '/auth/logout', method: 'post', propertyName: false },
        },
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    standalone: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
