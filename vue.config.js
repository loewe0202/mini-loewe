const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 引入webpack打包资源分析插件，用于性能分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('config', resolve('src/config'))
      .set('http', resolve('src/http'))
      .set('utils', resolve('src/utils'))
      .set('plugins', resolve('src/plugins'))
      .set('pages', resolve('src/pages'))
      .set('components', resolve('src/components'))
      .set('mixins', resolve('src/mixins'))
      .set('store', resolve('src/store'))
      .set('style', resolve('src/style'))
      .set('static', resolve('src/static'));
  },
  configureWebpack: (config) => {
    console.log('==> 环境变量： ', process.env);
    const plugins = [];
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      config.optimization.minimize = true;
      config.optimization.minimizer[0].options.parallel = true;
      config.optimization.minimizer[0].options.extractComments = true;
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.toplevel = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];

      // 针对不同编译命令处理非预发环境
      if (
        !(
          process.env.VUE_APP_ENV === 'pre' ||
          (process.env.UNI_SCRIPT && process.env.UNI_SCRIPT.includes('pre'))
        )
      ) {
        // 使用webpack analyze分析资源包的大小
        plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 9998,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
          }),
        );
      }
    } else {
      // 为开发环境修改配置...
      config.devtool = 'source-map';
      config.optimization.minimize = true;
      config.optimization.minimizer[0].options.parallel = true;
      config.optimization.minimizer[0].options.extractComments = true;
      config.optimization.minimizer[0].options.terserOptions.compress.toplevel = true;
    }
    config.plugins = [...config.plugins, ...plugins];
  },
};
