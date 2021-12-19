const path = require('path');
const { minidev } = require('minidev');
const privateAliConfig = require('./private.ali.config.json');

(async () => {
  /**
   * 支付宝小程序 CLI 的授权信息在用户使用机器上存储的是一对工具 Id toolId 和 私钥 privateKey 的键值对，
   * 方式一：
   * 对应位于开放平台存储的公钥 publicKey 可以登录 开放平台
   * 在 账户中心 > 密钥管理 > 开发工具密钥 > 工具密钥 中查看。
   * 方式二：
   * minidev login
   * 授权信息存储在用户目录下 minidev 资料目录中的配置文件中，默认位置：
   * • MacOS/Linux ~/.minidev/config.json
   * • Windows C:\User\你的用户名\.minidev/config.json
   * login 后将 config.json 复制到项目根目录下，命名为 private.ali.config.json
   */

  // 获取 authentication 信息
  let {
    alipay: { authentication },
  } = privateAliConfig;

  // 注入默认授权信息
  minidev.config.useRuntime({
    'alipay.authentication.privateKey': authentication.privateKey,
    'alipay.authentication.toolId': authentication.toolId,
  });

  // 生成预览二维码
  const miniPreview = async () => {
    const { qrcodeSchema, qrcodeUrl, version } = await minidev.preview({
      appId: '2021003105610005',
      // clientType 指定真机预览的目标端类型，默认为 alipay (支付宝)
      // autoPush 自动推送到手机
      ignoreHttpDomainCheck: true,
      ignoreWebViewDomainCheck: true,
      page: 'pages/index/index',
      // pageQuery 页面参数
      // query 全局参数，可在 app.js 的 onLaunch 中取得
      // scene 场景值
      project: path.resolve(__dirname, './dist/dev/mp-alipay'),
    });

    // 预览二维码图片地址
    console.log(qrcodeUrl);
    // 预览 schema url，允许手机 App 通过这个 url 唤起预览小程序
    console.log(qrcodeSchema);
    // 生成的临时版本号，对于插件项目可以用于宿主进行插件联调
    console.log(version);
  };

  miniPreview();
})();
