# ベースイメージとしてNode.js 20を使用
FROM node:20

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# パッケージファイルをコピーしてインストール
COPY package*.json ./
RUN npm install

# TypeScript設定ファイルをコピー
COPY tsconfig.json ./

# アプリケーションのソースコードをコピー
COPY src ./src

# TypeScriptコードをビルド
RUN npx tsc

# アプリケーションを実行
CMD ["node", "dist/server.js"]

# アプリケーションが使用するポートを指定
EXPOSE 8080
