const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = {
  outputDir: "out",


  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  // devServer: {
  //   proxy: {
  //     // http://192.168.20.15:8081/
  //     // 'http://192.168.20.103:8081/'  // 大师
  //     '/api': {
  //       target: 'http://192.168.20.103:8081/',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     }
  //   }
  // },

  lintOnSave: false
};