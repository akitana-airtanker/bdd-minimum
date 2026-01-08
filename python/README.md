# BDD Minimal Example - Python (Behave)

Behaveを使用した最小構成のBDDサンプルです。**2ファイルのみ**で動作します。

## ディレクトリ構成

```
python/
├── features/
│   ├── greeting.feature      # Gherkin形式の仕様
│   └── steps/
│       └── greeting_steps.py # ステップ定義
└── README.md
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
Feature: Greeting # features/greeting.feature:1

  Scenario: Simple greeting              # features/greeting.feature:6
    Given I have a greeter               # features/steps/greeting_steps.py:5
    When I ask for a greeting            # features/steps/greeting_steps.py:10
    Then I should receive "Hello, World!" # features/steps/greeting_steps.py:15

1 feature passed, 0 failed, 0 skipped
1 scenario passed, 0 failed, 0 skipped
3 steps passed, 0 failed, 0 skipped, 0 undefined
```

## ポイント

- **設定ファイル不要**: `behave.ini` なしで動作
- **最小ファイル数**: feature + steps の2ファイルのみ
- **自動検出**: `features/` ディレクトリを自動で認識
