module.exports = {
  devServer: {
    open: true,
    watchOptions: {
      poll: true
    },
    proxy: {
      "/user/": {
        target: "http://localhost:3002/",
        secure: false,
        changeOrigin: true
      },
      "/service/": {
        target: "http://localhost:3002/",
        secure: false,
        changeOrigin: true
      },
      "/field/": {
        target: "http://localhost:3002/",
        secure: false,
        changeOrigin: true
      }
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
