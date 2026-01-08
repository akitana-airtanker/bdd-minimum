# BDD Minimal Example - JavaScript (Cucumber.js)

Cucumber.jsを使用して**実際のアプリケーションコード**をBDDでテストする最小構成サンプルです。

## ディレクトリ構成

```
javascript/
├── src/                          # アプリケーションコード（テスト対象）
│   └── calculator.js             # Calculatorクラス
├── features/
│   ├── calculator.feature        # Gherkin形式の仕様
│   └── support/
│       └── steps.js              # src/をテストするステップ定義
├── package.json
└── README.md
```

## ポイント

**BDDでテストしているのは `src/calculator.js` です。**

```
┌─────────────────────────────────────────────────────────────┐
│  calculator.feature (仕様)                                  │
│  「5を足して3を足したら8になる」                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ マッピング
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  steps.js (ステップ定義)                                     │
│  const { Calculator } = require('../../src/calculator');    │
│  this.calculator.add(5);                                    │
└─────────────────────┬───────────────────────────────────────┘
                      │ テスト
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/calculator.js (アプリケーションコード)                   │
│  class Calculator {                                         │
│      add(value) { ... }                                     │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

## セットアップ

```bash
cd javascript
npm install
```

## 実行

```bash
npm test
```

## 期待される出力

```
Feature: Calculator # features/calculator.feature:1

  Scenario: Add two numbers          # features/calculator.feature:6
    Given the calculator is cleared  # features/support/steps.js:12
    When I add 5                     # features/support/steps.js:17
    And I add 3                      # features/support/steps.js:17
    Then the result should be 8      # features/support/steps.js:32

  Scenario: Subtract from a number   # features/calculator.feature:12
    ...

  Scenario: Multiple operations      # features/calculator.feature:18
    ...

3 scenarios (3 passed)
12 steps (12 passed)
```

## ファイルの役割

| ファイル | 役割 |
|---------|------|
| `src/calculator.js` | **テスト対象**のアプリケーションコード |
| `features/calculator.feature` | 振る舞いの仕様（人間が読める形式） |
| `features/support/steps.js` | 仕様とコードを繋ぐグルーコード |
| `package.json` | 依存関係（@cucumber/cucumber） |
