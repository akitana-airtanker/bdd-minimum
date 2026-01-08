# BDD 学習パス - Layer 0 から Layer 4 へ

BDDの複雑さを段階的に理解するためのガイドです。

## 概要

| Layer | 追加される機能 | ファイル数 | 必要になるタイミング |
|-------|--------------|----------|-------------------|
| Layer 0 | Feature + Steps | 2-3 | **常に必要（これがBDD）** |
| Layer 1 | 設定ファイル, Tags | +1-2 | シナリオが5個以上 |
| Layer 2 | Hooks (Before/After) | +1 | セットアップの重複 |
| Layer 3 | Scenario Outlines | 同じ | データ駆動テスト |
| Layer 4 | CI/CD, レポート | +2-3 | チーム開発・本番運用 |

---

## Layer 0: 最小構成（必須）

これがBDDの本質です。これ以上削れません。

### Python (Behave)

```
features/
├── greeting.feature
└── steps/
    └── greeting_steps.py
```

**greeting.feature:**
```gherkin
Feature: Greeting
  Scenario: Simple greeting
    Given I have a greeter
    When I ask for a greeting
    Then I should receive "Hello, World!"
```

**greeting_steps.py:**
```python
from behave import given, when, then

@given('I have a greeter')
def step_have_greeter(context):
    context.greeter = lambda: "Hello, World!"

@when('I ask for a greeting')
def step_ask_greeting(context):
    context.result = context.greeter()

@then('I should receive "{expected}"')
def step_check_result(context, expected):
    assert context.result == expected
```

**実行:** `behave`

---

## Layer 1: 設定とタグ

シナリオが増えてきたら、整理が必要になります。

### 追加ファイル: `behave.ini`

```ini
[behave]
format = pretty
stdout_capture = false
logging_level = INFO
```

### Tagsの使用

```gherkin
Feature: User Management

  @smoke
  Scenario: User can login
    Given a registered user
    When they enter valid credentials
    Then they see the dashboard

  @slow @integration
  Scenario: User data is synced
    Given a user with local changes
    When the sync runs
    Then remote data is updated
```

**フィルタ実行:**
```bash
behave --tags=@smoke           # smokeテストのみ
behave --tags="not @slow"      # slowを除外
behave --tags=@smoke,@fast     # smoke または fast
```

---

## Layer 2: Hooks（Before/After）

セットアップ・クリーンアップが重複したら Hooks を導入します。

### 追加ファイル: `features/environment.py`

```python
def before_all(context):
    """全テスト実行前に1回だけ"""
    context.config.setup_logging()
    print("Starting test suite...")

def before_scenario(context, scenario):
    """各シナリオ実行前"""
    context.test_data = {}
    print(f"Running: {scenario.name}")

def after_scenario(context, scenario):
    """各シナリオ実行後"""
    if scenario.status == "failed":
        print(f"FAILED: {scenario.name}")

def after_all(context):
    """全テスト実行後に1回だけ"""
    print("Test suite completed.")
```

### JavaScript (Cucumber.js) の場合

```javascript
// features/support/hooks.js
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

BeforeAll(async function () {
  console.log('Starting test suite...');
});

Before(async function (scenario) {
  this.testData = {};
  console.log(`Running: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    console.log(`FAILED: ${scenario.pickle.name}`);
  }
});

AfterAll(async function () {
  console.log('Test suite completed.');
});
```

---

## Layer 3: Scenario Outlines（データ駆動テスト）

同じテストを複数のデータで実行したい場合。

### Before（重複コード）

```gherkin
Scenario: Login with Alice
  Given user "Alice" exists
  When "Alice" logs in
  Then "Alice" sees the dashboard

Scenario: Login with Bob
  Given user "Bob" exists
  When "Bob" logs in
  Then "Bob" sees the dashboard
```

### After（Scenario Outline）

```gherkin
Scenario Outline: Login with different users
  Given user "<name>" exists
  When "<name>" logs in
  Then "<name>" sees the dashboard

  Examples:
    | name    |
    | Alice   |
    | Bob     |
    | Charlie |
```

### 複数パラメータの例

```gherkin
Scenario Outline: Calculator operations
  Given I have a calculator
  When I calculate <a> <operator> <b>
  Then the result should be <result>

  Examples:
    | a  | operator | b  | result |
    | 10 | +        | 5  | 15     |
    | 10 | -        | 3  | 7      |
    | 4  | *        | 3  | 12     |
    | 20 | /        | 4  | 5      |
```

---

## Layer 4: CI/CD とレポート

チーム開発・本番運用時に必要になります。

### GitHub Actions 設定例

```yaml
# .github/workflows/bdd.yml
name: BDD Tests

on: [push, pull_request]

jobs:
  python-bdd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install behave
      - name: Run BDD tests
        run: |
          cd python
          behave --format json -o report.json
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: bdd-report
          path: python/report.json

  javascript-bdd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: |
          cd javascript
          npm install
      - name: Run BDD tests
        run: |
          cd javascript
          npm test -- --format json:report.json
```

### JUnit レポート（CI連携用）

**Python:**
```bash
behave --junit --junit-directory=reports/
```

**JavaScript:**
```bash
npx cucumber-js --format @cucumber/junit-formatter:reports/junit.xml
```

---

## 複雑さの比較まとめ

```
Layer 0 (2-3 files)
├── features/example.feature
└── features/steps/steps.py

Layer 1 (+1-2 files)
├── behave.ini
└── (Tags in feature files)

Layer 2 (+1 file)
└── features/environment.py

Layer 3 (same files)
└── (Scenario Outlines in feature files)

Layer 4 (+2-3 files)
├── .github/workflows/bdd.yml
├── reports/ (generated)
└── (Custom formatters)
```

---

## なぜサンプルリポジトリは複雑なのか？

### behave.example の内訳

| ディレクトリ | 目的 | BDDに必要か？ |
|------------|------|-------------|
| `features/` | BDDテスト本体 | **必要** |
| `docs/` | Sphinx ドキュメント | 不要 |
| `.github/` | CI/CD | Layer 4 |
| `lib/python/` | カスタム拡張 | 不要 |
| `tasks/` | ビルド自動化 | 不要 |

**結論:** リポジトリの95%は「教育用」「CI用」「ドキュメント用」であり、BDD自体には不要。

---

## 推奨アプローチ

1. **Layer 0 から始める** - 最小構成で動かす
2. **痛みを感じてから追加** - 必要になるまで複雑化しない
3. **段階的に学習** - 一度に全部理解しようとしない

> "Simple things should be simple, complex things should be possible."
> — Alan Kay
