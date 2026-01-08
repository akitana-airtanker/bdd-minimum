# BDD Minimum - 最小構成で理解するBDD

BDD（Behavior-Driven Development）の**最小構成**を示すリポジトリです。

## なぜこのリポジトリを作ったか？

[behave.example](https://github.com/behave/behave.example) や [cucumber-js](https://github.com/cucumber/cucumber-js) のサンプルを見ると、ファイル数が多く複雑に感じます。

**しかし、BDDの本質は非常にシンプルです。**

| リポジトリ | BDDコード | その他（ドキュメント/CI/インフラ） |
|-----------|---------|--------------------------------|
| behave.example | ~5% | ~95% |
| cucumber-js | ~10% | ~90% |
| **このリポジトリ** | **100%** | **0%** |

---

## 最小構成

### Python (Behave) - 2ファイル

```
python/
├── features/
│   ├── greeting.feature      # Gherkin仕様
│   └── steps/
│       └── greeting_steps.py # ステップ定義
```

### JavaScript (Cucumber.js) - 3ファイル

```
javascript/
├── features/
│   ├── greeting.feature      # Gherkin仕様
│   └── support/
│       └── steps.js          # ステップ定義
└── package.json              # 依存関係
```

---

## クイックスタート

### Python

```bash
cd python
pip install behave
behave
```

### JavaScript

```bash
cd javascript
npm install
npm test
```

---

## 学習パス

[docs/learning-path.md](docs/learning-path.md) で、Layer 0（最小構成）から Layer 4（CI/CD統合）までの段階的な学習パスを解説しています。

| Layer | 内容 | 必要になるとき |
|-------|------|--------------|
| Layer 0 | Feature + Steps | **常に必要** |
| Layer 1 | 設定ファイル, Tags | シナリオ5個以上 |
| Layer 2 | Hooks (Before/After) | セットアップの重複 |
| Layer 3 | Scenario Outlines | データ駆動テスト |
| Layer 4 | CI/CD, レポート | チーム開発 |

---

## BDDとは

**Behavior-Driven Development** は、システムの振る舞いを自然言語で記述し、それをそのまま実行可能なテストにするアプローチです。

```gherkin
Feature: Greeting
  Scenario: Simple greeting
    Given I have a greeter
    When I ask for a greeting
    Then I should receive "Hello, World!"
```

この「Given/When/Then」形式は、非エンジニアでも読める仕様書として機能します。

---

## 参考リンク

- [Behave Documentation](https://behave.readthedocs.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)

---

## ライセンス

MIT
