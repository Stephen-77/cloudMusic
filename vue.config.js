const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
      },
      // "": {
      //   target: "https://netease-cloud-music-api-fawn-nu.vercel.app",
      //   // pathRewrite: { "^/api": "" },
      // },
      "": {
        target: "http://localhost:3000",
        // pathRewrite: { "^/api": "" },
      },
      // "/mock": {
      //   target: " http://localhost:8080",
      //   changeOrgin:true
      // },
    },
  },
});
