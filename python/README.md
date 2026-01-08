# BDD Minimal Example - Python (Behave)

Behaveを使用して**実際のアプリケーションコード**をBDDでテストする最小構成サンプルです。

## ディレクトリ構成

```
python/
├── src/                          # アプリケーションコード（テスト対象）
│   ├── __init__.py
│   └── calculator.py             # Calculatorクラス
├── features/
│   ├── calculator.feature        # Gherkin形式の仕様
│   └── steps/
│       └── calculator_steps.py   # src/をテストするステップ定義
└── README.md
```

## ポイント

**BDDでテストしているのは `src/calculator.py` です。**

```
┌─────────────────────────────────────────────────────────────┐
│  calculator.feature (仕様)                                  │
│  「5を足して3を足したら8になる」                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ マッピング
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  calculator_steps.py (ステップ定義)                          │
│  from src.calculator import Calculator                      │
│  context.calculator.add(5)                                  │
└─────────────────────┬───────────────────────────────────────┘
                      │ テスト
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/calculator.py (アプリケーションコード)                   │
│  class Calculator:                                          │
│      def add(self, value): ...                              │
└─────────────────────────────────────────────────────────────┘
```

## セットアップ

```bash
pip install behave
```

## 実行

```bash
cd python
behave
```

## 期待される出力

```
Feature: Calculator # features/calculator.feature:1

  Scenario: Add two numbers          # features/calculator.feature:6
    Given the calculator is cleared  # features/steps/calculator_steps.py:16
    When I add 5                     # features/steps/calculator_steps.py:22
    And I add 3                      # features/steps/calculator_steps.py:22
    Then the result should be 8      # features/steps/calculator_steps.py:40

  Scenario: Subtract from a number   # features/calculator.feature:12
    ...

  Scenario: Multiple operations      # features/calculator.feature:18
    ...

3 features passed, 0 failed, 0 skipped
3 scenarios passed, 0 failed, 0 skipped
12 steps passed, 0 failed, 0 skipped
```

## ファイルの役割

| ファイル | 役割 |
|---------|------|
| `src/calculator.py` | **テスト対象**のアプリケーションコード |
| `features/calculator.feature` | 振る舞いの仕様（人間が読める形式） |
| `features/steps/calculator_steps.py` | 仕様とコードを繋ぐグルーコード |
