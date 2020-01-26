const HtmlInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    // Remove preload-webpack-plugin
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");

    // Use html-webpack-inline-source-plugin
    config.plugin("html-inline-source").use(HtmlInlineSourcePlugin);

    // Modify html-webpack-plugin
    config.plugin("html").tap(args => {
      args[0].inlineSource = ".(js|css)$";
      return args;
    });
  }
};
