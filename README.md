# mini-loewe

## 项目安装和启动

### 项目安装

```
yarn install
```

### 开发版编译

微信小程序

```
yarn dev:mp-weixin
```

支付宝小程序

```
yarn dev:mp-weixin
```

## 生成预览二维码

### 微信 CI/CD 工具

#### 命令行预览

```
miniprogram-ci \
  preview \
  --pp ./dist/dev/mp-weixin/ \
  --pkp ./private.wx93a9fc6ceaad35eb.key \
  --appid wx93a9fc6ceaad35eb \
  --uv 1.0.0 \
  -r 1 \
  --enable-es6 true \
  --qrcode-format image \
  --qrcode-output-dest ./qr-code/wx93a9fc6ceaad35eb.png \
```

#### node 命令处理

```
yarn qr-test:mp-weixin
```

### 支付宝 CI/CD 工具

#### 命令行预览

```
minidev login
cd ./dist/dev/mp-alipay
minidev preview -a 2021003105610005 --ignore-http-domain-check --ignore-webview-domain-check
```

#### node 命令处理

```
yarn qr-test:mp-alipay
```
