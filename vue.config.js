const HtmlInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === "production", config => {
      // It's necessary for google apps script to embed assets in html.
      // Some steps below are to accomplish this purpose.

      // Remove preload-webpack-plugin
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");

      // Use html-webpack-inline-source-plugin
      config.plugin("html-inline-source").use(HtmlInlineSourcePlugin);

      // Modify html-webpack-plugin
      config.plugin("html").tap(args => {
        args[0].inlineSource = ".(js|css)$";
        args[0].minify.removeAttributeQuotes = false;
        args[0].minify.removeScriptTypeAttributes = false;
        return args;
      });

      // Update url-loader
      config.module
        .rule("images")
        .use("url-loader")
        .options({});

      config.module
        .rule("svg")
        .uses.delete("file-loader")
        .end()
        .use("url-loader")
        .loader("url-loader")
        .options({});

      config.module
        .rule("media")
        .use("url-loader")
        .options({});

      config.module
        .rule("fonts")
        .use("url-loader")
        .options({});

      // Use copy-webpack-plugin
      config.plugin("copy-plugin").use(CopyPlugin, [
        [
          {
            from: path.resolve(__dirname, "./gas")
          }
        ]
      ]);
    });
  }
};
