const path = require('path');
const ci = require('miniprogram-ci');

(async () => {
  // 注意： new ci.Project 调用时，请确保项目代码已经是完整的，避免编译过程出现找不到文件的报错。
  const project = new ci.Project({
    appid: 'wx93a9fc6ceaad35eb',
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, './dist/dev/mp-weixin'),
    privateKeyPath: path.resolve(__dirname, './private.wx93a9fc6ceaad35eb.key'),
    ignores: ['node_modules/**/*'],
  });
  const previewResult = await ci.preview({
    project,
    desc: 'CI/CD',
    urlCheck: false,
    ignoreHttpDomainCheck: true,
    ignoreWebViewDomainCheck: true,
    setting: {
      es6: true,
      urlCheck: false,
      ignoreHttpDomainCheck: true,
      ignoreWebViewDomainCheck: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: path.resolve(__dirname, './qr-code/wx93a9fc6ceaad35eb.png'),
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
    // scene: 1011, // 场景值
  });
  console.log(previewResult);
})();
