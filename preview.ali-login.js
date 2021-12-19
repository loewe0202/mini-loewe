const path = require('path');
const { minidev } = require('minidev');

(async () => {
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
			project: path.resolve(__dirname, './dist/dev/mp-alipay')
		});

		// 预览二维码图片地址
		console.log(qrcodeUrl);
		// 预览 schema url，允许手机 App 通过这个 url 唤起预览小程序
		console.log(qrcodeSchema);
		// 生成的临时版本号，对于插件项目可以用于宿主进行插件联调
		console.log(version);
	};

	// minidev.login() 返回的 promise resolve 代表登录完成，如过登录失败，会 reject
	await minidev.login(
		{
			project: 'path/to/mini-program'
		},
		loginTask => {
			// Node.js API 方式可以通过第二个参数获取 loginTask 以便后续展示等
			loginTask.on('qrcode-generated', qrcodeUrl => {
				// 已获取登录图片，进行后续展示
				console.log('请打开支付宝小程序扫码登录： ', qrcodeUrl);
			});

			loginTask.on('polling', remainingMs => {
				console.log(`二维码过期时间: ${Math.floor(remainingMs / 1000)}s`);
			});

			loginTask.on('success', remainingMs => {
				console.log(`完成授权: `, remainingMs);
				// 生成预览二维码
				miniPreview();
			});

			loginTask.on('scan', remainingMs => {
				console.log(`已扫描, 请在手机上确认: `, remainingMs);
			});
		}
	);
})();
