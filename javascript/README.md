# BDD + TDD Minimal Example - JavaScript

Cucumber.js + Jest を使用した**BDDとTDDの棲み分け**サンプルです。

## ディレクトリ構成

```
javascript/
├── src/
│   └── discount.js              # アプリケーションコード
├── features/                    # BDD（受け入れテスト）
│   ├── membership_discount.feature
│   └── support/
│       └── steps.js
└── tests/                       # TDD（ユニットテスト）
    └── discount.test.js
```

## セットアップ

```bash
npm install
```

## 実行

```bash
# BDD（受け入れテスト）
npm test

# TDD（ユニットテスト）
npm run test:unit

# 両方実行
npm run test:all
```

## BDD vs TDD

| | BDD (features/) | TDD (tests/) |
|---|---|---|
| ツール | Cucumber.js | Jest |
| 対象者 | ステークホルダー | 開発者 |
| テスト数 | 3シナリオ | 6+テスト |
| 例 | "Gold会員は20%割引" | "端数は切り捨て" |
