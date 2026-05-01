# AIスライド構成案ジェネレーター v2.0

テーマ・ターゲット・目的・箇条書きメモを入力するだけで、Gamma貼り付け用のMarkdown構成案をAIが自動生成するWebアプリです。

## ファイル構成

```
├── index.html        # フロントエンド
├── api/
│   └── generate.js   # バックエンド（Vercel Serverless Function）
├── .env.example      # 環境変数のサンプル
└── README.md
```

## Vercelへのデプロイ手順

1. このリポジトリをGitHubにアップロード
2. [Vercel](https://vercel.com) にアクセスしてGitHubアカウントでログイン
3. 「New Project」→ このリポジトリを選択
4. 「Environment Variables」に `ANTHROPIC_API_KEY` を設定
5. 「Deploy」をクリック

## 注意事項

- `.env` ファイルはGitHubにアップロードしないでください
- APIキーは必ずVercelの環境変数から設定してください
- `.env.example` にはAPIキーの値を書かないでください
