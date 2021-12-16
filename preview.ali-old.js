const path = require('path');
const miniu = require('miniu');

(async () => {
	const { create, loginImageURL } = await miniu.login();
	console.log(loginImageURL); // 登录二维码 base64 图片
	// 开发者权限人员扫码后继续后续流程
	const { toolId, privateKey } = await create();
	miniu.setConfig({
		toolId,
		privateKey
	});
	// 生成体验版二维码
	const previewResult = await miniu.miniPreview({
		project: path.resolve(__dirname, './dist/dev/mp-alipay'),
		appId: '2021003105610005',
		page: 'pages/index/index',
		qrcodeFormat: 'image',
		qrcodeOutput: path.resolve(__dirname, './qr-code/2021003105610005.png'),
		onProgressUpdate(info) {
			const { status, data } = info;
			console.log(status, data);
		}
	});

	console.log(previewResult);
})();
