# BDD + TDD Minimal Example - Python

Behave + pytest を使用した**BDDとTDDの棲み分け**サンプルです。

## ディレクトリ構成

```
python/
├── src/
│   └── discount.py              # アプリケーションコード
├── features/                    # BDD（受け入れテスト）
│   ├── membership_discount.feature
│   └── steps/
│       └── discount_steps.py
└── tests/                       # TDD（ユニットテスト）
    └── test_discount.py
```

## セットアップ

```bash
pip install behave pytest
```

## 実行

```bash
# BDD（受け入れテスト）
behave

# TDD（ユニットテスト）
pytest

# 両方実行
behave && pytest
```

## BDD vs TDD

| | BDD (features/) | TDD (tests/) |
|---|---|---|
| ツール | Behave | pytest |
| 対象者 | ステークホルダー | 開発者 |
| テスト数 | 3シナリオ | 6+テスト |
| 例 | "Gold会員は20%割引" | "端数は切り捨て" |
