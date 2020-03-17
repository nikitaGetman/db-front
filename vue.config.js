module.exports = {
  devServer: {
    open: true,
    watchOptions: {
      poll: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/vars";`
      }
    }
  }
};
