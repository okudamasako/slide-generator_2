# AIスライド構成案ジェネレーター v2.0

テーマ・ターゲット・目的・箇条書きメモを入力するだけで、Gammaへそのまま貼り付け可能なMarkdown形式のスライド構成案をAIが自動生成するWebアプリです。

## 機能

* テーマ・ターゲット・目的を入力
* Claude AIがスライド構成案を自動生成
* Markdown形式で出力
* ワンクリックコピー対応
* Gammaへ貼り付けるだけで資料化可能

## 使用技術

* フロントエンド：HTML / CSS / JavaScript
* バックエンド：Vercel Serverless Functions（Node.js）
* AI：Anthropic Claude API
* ホスティング：Vercel

## ファイル構成

```text id="xwd76n"
├── index.html        # フロントエンド
├── api/
│   └── generate.js   # バックエンド（Vercel Serverless Function）
├── .env.example      # 環境変数サンプル
├── package.json
├── vercel.json
└── README.md
```

## セットアップ

### 1. リポジトリをクローン

```bash id="1v6a8j"
git clone https://github.com/YOUR_USERNAME/slide-generator_2.git
cd slide-generator_2
```

### 2. 環境変数を設定

```bash id="xx1r3b"
cp .env.example .env
```

`.env` ファイルを開き、AnthropicのAPIキーを入力してください。

```env id="m6y1ga"
ANTHROPIC_API_KEY=your_api_key_here
```

## Vercelへのデプロイ手順

1. このリポジトリをGitHubにアップロード
2. https://vercel.com にアクセスしてGitHubアカウントでログイン
3. 「New Project」→ このリポジトリを選択
4. 「Environment Variables」に `ANTHROPIC_API_KEY` を設定
5. 「Deploy」をクリック

## デモ

[デモサイトはこちら](https://slide-generator-2.vercel.app/)

## 注意事項

* `.env` ファイルはGitHubにアップロードしないでください
* APIキーは必ずVercelの環境変数から設定してください
* `.env.example` にはAPIキーの値を書かないでください

## 補足

AIを活用したプレゼン構成生成システムとして、実験・運用しているプロジェ
