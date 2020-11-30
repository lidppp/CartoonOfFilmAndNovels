module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查

  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    sourceMap: true, // 开启 CSS source maps?
  },
  // webpack-dev-server 相关配置
  devServer: {
    hot:true,
    open: true,
    host: '0.0.0.0', // 允许外部ip访问
    port: 8080, // 端口
    https: false, // 启用https
    overlay: {
      warnings: false,
      errors: true,
    }, // 错误、警告在页面弹出
    // proxy: {
      // '/api': {
      //     target: 'http://www.baidu.com/api',
      //     changeOrigin: true, // 允许websockets跨域
      //     // ws: true,
      //     pathRewrite: {
      //         '^/api': ''
      //     }
      // }
    // }, // 代理转发配置，用于调试环境
  },
  // 第三方插件配置
  pluginOptions: {},
}
