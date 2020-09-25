import colors from "vuetify/es5/util/colors"

export default {
  target: 'static',
  mode: "spa",
  server: {
    port: 5000, // default: 3000
    host: "127.0.0.1", // default: localhost
  },
  plugins: [
    { src: "~/plugins/vue2-google-maps", mode: 'client' },
    { src: "~/plugins/vuelidate" }
  ],
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8", },
      { name: "viewport", content: "width=device-width, initial-scale=1", },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "https://i.ibb.co/VHpBQTf/logo.png", }]
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff", },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/bootstrap.css",
    "~/assets/css/main-style.css",
    "~/assets/css/all.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt"
  ],
  bootstrapVue: {
    components: ['BContainer', 'BRow', 'BCol', 'BFormInput', 'BButton', 'BTable', 'BModal', 'BFormTags'],
    directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBScrollspy']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || "https://api.yalladealz.com/api/",
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    optimization: {
      minimize: true,
      minimizer: [
        // terser-webpack-plugin
        // optimize-css-assets-webpack-plugin
      ],
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {}
      }
    },
    splitChunks: {
      commons: true,
      layouts: true,
      pages: true
    },
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {

    }
  },
  env: {
    baseUrl: process.env.baseURL || 'https://api.yalladealz.com'
  }
}
