# BDD Minimal Example - JavaScript (Cucumber.js)

Cucumber.jsを使用した最小構成のBDDサンプルです。**3ファイルのみ**で動作します。

## ディレクトリ構成

```
javascript/
├── features/
│   ├── greeting.feature      # Gherkin形式の仕様
│   └── support/
│       └── steps.js          # ステップ定義
├── package.json              # 依存関係
└── README.md
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
Feature: Greeting # features/greeting.feature:1

  Scenario: Simple greeting               # features/greeting.feature:6
    Given I have a greeter                # features/support/steps.js:4
    When I ask for a greeting             # features/support/steps.js:8
    Then I should receive "Hello, World!" # features/support/steps.js:12

1 scenario (1 passed)
3 steps (3 passed)
```

## ポイント

- **設定ファイル不要**: `cucumber.js` なしで動作
- **最小ファイル数**: feature + steps + package.json の3ファイルのみ
- **自動検出**: `features/` ディレクトリを自動で認識
