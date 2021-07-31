module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/styles.scss"`
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: '/'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/FretboardMaster.github.io/'
  //   : './'
}