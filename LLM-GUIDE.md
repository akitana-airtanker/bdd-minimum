# BDD/TDD ベストプラクティスガイド

LLM参照用の1ファイル完結型ガイド。BDDとTDDの使い分け、ベストプラクティス、構文リファレンスを網羅。

---

## 1. BDD vs TDD 棲み分け

### 構造図

```
┌─────────────────────────────────────────────────────────────┐
│  BDD (features/)                                            │
│  - ビジネス要件の受け入れテスト                               │
│  - ステークホルダーが読める                                   │
│  - 少数のシナリオ（3-5個）                                    │
│  - 例: "ゴールド会員は20%割引を受ける"                        │
└─────────────────────────────────────────────────────────────┘
                              ↓ 補完
┌─────────────────────────────────────────────────────────────┐
│  TDD (tests/)                                               │
│  - 実装の詳細・エッジケース                                   │
│  - 開発者向け                                                │
│  - 多数のテスト（10-20個）                                    │
│  - 例: "未知のランクはデフォルト0%", "端数は切り捨て"          │
└─────────────────────────────────────────────────────────────┘
```

### 判断フローチャート

```
「このテストは誰のためか？」
    │
    ├─→ ステークホルダー/LLM/将来の読者
    │   └─→ BDD（Gherkin）
    │
    └─→ 開発者のみ
        │
        └─→「このテストは何をカバーするか？」
            │
            ├─→ ビジネスルール・受け入れ基準
            │   └─→ BDD（Gherkin）
            │
            └─→ 実装詳細・エッジケース
                └─→ TDD（Unit Test）
```

### 比較表

| 観点 | BDD | TDD |
|------|-----|-----|
| 対象者 | ステークホルダー | 開発者 |
| 記述 | Gherkin（自然言語） | コード |
| テスト数 | 少数（3-5） | 多数（10-20） |
| カバー範囲 | ハッピーパス | エッジケース |
| 変更頻度 | 仕様変更時のみ | リファクタリング時も |

---

## 2. BDDを使わない基準

### TDDのみで良いケース

| ケース | 例 | 理由 |
|--------|---|------|
| 実装詳細 | 端数処理、型変換 | ビジネス要件ではない |
| エッジケース | null、空文字、境界値 | 数が多すぎる |
| パフォーマンス | 1000req/sec処理 | Gherkinで書いても価値が低い |
| 内部API契約 | モジュール間インターフェース | 開発者以外が読まない |
| リファクタリング保護 | 既存動作の回帰テスト | 仕様変更ではない |

### BDDを使うべきケース

| ケース | 例 | 理由 |
|--------|---|------|
| ビジネス要件 | 会員割引ルール | ステークホルダーと合意した内容 |
| 受け入れ基準 | ログイン成功条件 | リリース判定に使う |
| LLMへの仕様入力 | ガードレール定義 | 実行可能な仕様書 |
| ドキュメント | システム振る舞い | コードと同期したドキュメント |

### 具体例: 会員割引

| テスト内容 | BDD | TDD | 理由 |
|-----------|:---:|:---:|------|
| Gold会員は20%割引 | ✅ | - | ビジネス要件 |
| Silver会員は10%割引 | ✅ | - | ビジネス要件 |
| 未知ランクは0%割引 | - | ✅ | 実装の防御的処理 |
| 333円の5%割引は316円 | - | ✅ | 端数処理の実装詳細 |
| null入力でエラー | - | ✅ | 例外処理 |

---

## 3. 宣言的 vs 命令的

### 命令的（避けるべき）

```gherkin
# ❌ 実装詳細を記述している
Scenario: User login
  Given I am on the login page
  When I click the "email" input field
  And I type "user@example.com"
  And I click the "password" input field
  And I type "secret123"
  And I click the "Login" button
  Then I should see the text "Welcome"
```

### 宣言的（推奨）

```gherkin
# ✅ 振る舞いを記述している
Scenario: User login
  Given a registered user exists
  When they login with valid credentials
  Then they should see the dashboard
```

### 変換パターン

| 命令的 | 宣言的 |
|--------|--------|
| I click the "Login" button | I login |
| I type "user@example.com" in the email field | I enter valid credentials |
| I should see the text "Welcome" | I should see the dashboard |
| I wait for 3 seconds | (削除 - 実装詳細) |
| I scroll down the page | (削除 - 実装詳細) |

---

## 4. ベストプラクティス（厳選10項目）

### 1. 宣言的に書く
振る舞いを記述し、実装詳細を避ける。

### 2. 1シナリオ1ルール
複数のWhen-Thenは設計の問題を示す。

```gherkin
# ❌ 複数ルール
Scenario: Shopping
  When I add item to cart
  Then cart should have 1 item
  When I checkout
  Then order should be created

# ✅ 分割
Scenario: Add item to cart
  When I add item to cart
  Then cart should have 1 item

Scenario: Checkout
  Given cart has items
  When I checkout
  Then order should be created
```

### 3. UIテストを避ける
BDDはビジネスロジック層でテストする。UIテストは遅く脆い。

### 4. 具体的な値を使う
```gherkin
# ❌ 曖昧
When I withdraw some money
Then I should have less money

# ✅ 具体的
When I withdraw 100 yen from an account with 500 yen
Then the balance should be 400 yen
```

### 5. シナリオを独立させる
各シナリオは他のシナリオの結果に依存しない。

### 6. Background で共通化
```gherkin
Feature: Shopping Cart
  Background:
    Given a logged-in user
    And an empty shopping cart

  Scenario: Add item
    When I add "iPhone" to cart
    Then cart should contain "iPhone"
```

### 7. Tags で整理
```gherkin
@smoke @critical
Scenario: Login with valid credentials

@regression @slow
Scenario: Complex checkout flow
```

### 8. ステップ数を制限
1つのGiven/When/Thenに対してAndは2-3個まで。

### 9. 不要シナリオを削除
より包括的なシナリオでカバーされたら削除。

### 10. チームで書く / 仕様として使う
一人で書くBDDも、LLMへの入力や実行可能ドキュメントとして価値がある。

---

## 5. 構文リファレンス

### Background

```gherkin
Feature: Membership Discount
  Background:
    Given the discount system is initialized
    And tax rate is 10%

  Scenario: Gold member
    Given a customer with "Gold" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 800 yen
```

### Tags

```gherkin
@smoke @critical
Scenario: Gold member receives 20% discount
  Given a customer with "Gold" membership
  When they purchase an item for 1000 yen
  Then the discounted price should be 800 yen

@regression @slow
Scenario: Complex discount calculation
  ...
```

**実行フィルタ:**
```bash
behave --tags=@smoke
behave --tags="@critical and not @slow"
behave --tags="@smoke or @critical"
```

### Hooks

**Python (Behave):**
```python
# features/environment.py
def before_all(context):
    """全テスト前に1回"""
    context.config.setup_logging()

def before_scenario(context, scenario):
    """各シナリオ前"""
    context.test_data = {}

def after_scenario(context, scenario):
    """各シナリオ後"""
    if scenario.status == "failed":
        print(f"FAILED: {scenario.name}")

def after_all(context):
    """全テスト後に1回"""
    pass
```

**JavaScript (Cucumber.js):**
```javascript
// features/support/hooks.js
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

BeforeAll(async function () {
  // 全テスト前
});

Before(async function (scenario) {
  this.testData = {};
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    console.log(`FAILED: ${scenario.pickle.name}`);
  }
});

AfterAll(async function () {
  // 全テスト後
});
```

### Scenario Outline

```gherkin
Scenario Outline: Membership discounts
  Given a customer with "<rank>" membership
  When they purchase an item for <price> yen
  Then the discounted price should be <expected> yen

  Examples:
    | rank   | price | expected |
    | Gold   | 1000  | 800      |
    | Silver | 1000  | 900      |
    | Bronze | 1000  | 950      |
    | None   | 1000  | 1000     |
```

**注意:** Scenario Outlineは乱用しない。UIテストや遅いテストでは避ける。

---

## 6. ディレクトリ構成テンプレート

### Python (Behave + pytest)

```
project/
├── src/
│   ├── __init__.py
│   └── discount.py              # アプリケーションコード
├── features/                    # BDD
│   ├── membership_discount.feature
│   ├── environment.py           # Hooks (Layer 2)
│   └── steps/
│       └── discount_steps.py
├── tests/                       # TDD
│   ├── __init__.py
│   └── test_discount.py
├── behave.ini                   # 設定 (Layer 1)
└── pytest.ini
```

### JavaScript (Cucumber.js + Jest)

```
project/
├── src/
│   └── discount.js              # アプリケーションコード
├── features/                    # BDD
│   ├── membership_discount.feature
│   └── support/
│       ├── steps.js
│       └── hooks.js             # Hooks (Layer 2)
├── tests/                       # TDD
│   └── discount.test.js
├── cucumber.js                  # 設定 (Layer 1)
└── package.json
```

---

## 7. コード例（最小）

### Feature ファイル

```gherkin
Feature: Membership Discount
  As a store owner
  I want to offer discounts based on membership rank
  So that loyal customers are rewarded

  Scenario: Gold member receives 20% discount
    Given a customer with "Gold" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 800 yen

  Scenario: Silver member receives 10% discount
    Given a customer with "Silver" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 900 yen

  Scenario: Non-member pays full price
    Given a customer with "None" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 1000 yen
```

### Step Definitions (Python)

```python
from behave import given, when, then
from src.discount import MembershipDiscount

@given('a customer with "{rank}" membership')
def step_given_customer(context, rank):
    context.discount = MembershipDiscount(rank)

@when('they purchase an item for {price:d} yen')
def step_when_purchase(context, price):
    context.final_price = context.discount.calculate_price(price)

@then('the discounted price should be {expected:d} yen')
def step_then_price(context, expected):
    assert context.final_price == expected
```

### Unit Test (Python)

```python
import pytest
from src.discount import MembershipDiscount

class TestMembershipDiscount:
    def test_unknown_rank_defaults_to_no_discount(self):
        discount = MembershipDiscount("Platinum")
        assert discount.calculate_price(1000) == 1000

    def test_rounding_truncates_decimals(self):
        discount = MembershipDiscount("Bronze")  # 5% off
        assert discount.calculate_price(333) == 316

    def test_zero_price(self):
        discount = MembershipDiscount("Gold")
        assert discount.calculate_price(0) == 0

    @pytest.mark.parametrize("rank,expected", [
        ("Gold", 800),
        ("Silver", 900),
        ("Bronze", 950),
        ("None", 1000),
    ])
    def test_all_ranks(self, rank, expected):
        discount = MembershipDiscount(rank)
        assert discount.calculate_price(1000) == expected
```

### Application Code (Python)

```python
class MembershipDiscount:
    DISCOUNT_RATES = {
        "Gold": 0.20,
        "Silver": 0.10,
        "Bronze": 0.05,
        "None": 0.00,
    }

    def __init__(self, membership_rank: str):
        self.membership_rank = membership_rank

    def calculate_price(self, original_price: int) -> int:
        rate = self.DISCOUNT_RATES.get(self.membership_rank, 0.00)
        return int(original_price * (1 - rate))
```

---

## クイックコマンド

```bash
# Python
pip install behave pytest
cd project && behave          # BDD
cd project && pytest          # TDD
cd project && behave && pytest  # 両方

# JavaScript
npm install @cucumber/cucumber jest
npm test                      # BDD (cucumber-js)
npm run test:unit             # TDD (jest)
npm run test:all              # 両方
```

---

## 8. BDD → OpenSpec → TDD 統合フロー

AI協調開発における3層アーキテクチャ。

### フロー図

```
┌─────────────────────────────────────────────────────────────┐
│  1. BDD (features/*.feature)                                │
│  「何をすべきか」- ビジネス振る舞い                          │
│  ─────────────────────────────────────────────────────────  │
│  - Gherkin で受け入れ基準を定義                             │
│  - ステークホルダーが読める仕様書                            │
│  - LLMへのガードレール・振る舞い入力としても機能              │
└─────────────────────────────────────────────────────────────┘
                              ↓ 変換・参照
┌─────────────────────────────────────────────────────────────┐
│  2. OpenSpec (openspec/)                                    │
│  「どう実装するか合意」- AI向け技術仕様                      │
│  ─────────────────────────────────────────────────────────  │
│  - proposal.md: BDDシナリオを参照しつつ技術仕様化           │
│  - tasks.md: 実装タスクを分解                               │
│  - specs/: 詳細スペック（型定義、API契約等）                │
└─────────────────────────────────────────────────────────────┘
                              ↓ 実装・検証
┌─────────────────────────────────────────────────────────────┐
│  3. TDD (tests/)                                            │
│  「実装を検証」- エッジケース・境界値                        │
│  ─────────────────────────────────────────────────────────  │
│  - OpenSpecタスクに対応するユニットテスト                    │
│  - BDDでカバーしないエッジケース・境界値                     │
└─────────────────────────────────────────────────────────────┘
```

### 3層の責務分担

| Layer | 責務 | 対象者 | ファイル |
|-------|------|--------|----------|
| BDD | ビジネス要件定義 | ステークホルダー | `features/*.feature` |
| OpenSpec | 技術仕様・AI合意 | 開発者・AI | `openspec/` |
| TDD | 実装検証 | 開発者 | `tests/` |

### 境界判断基準

#### BDD vs OpenSpec

| 内容 | BDD | OpenSpec | 理由 |
|------|:---:|:--------:|------|
| ビジネスルール | ✅ | 参照 | ステークホルダーと合意 |
| ユーザーストーリー | ✅ | 参照 | 「誰が」「何を」「なぜ」 |
| 受け入れ基準 | ✅ | 参照 | リリース判定に使う |
| 技術的制約 | - | ✅ | 開発者/AIのみ |
| API設計 | - | ✅ | エンドポイント、型 |
| 実装タスク分解 | - | ✅ | AIへの作業指示 |

**原則**: BDD = What（何を）、OpenSpec = How（どう実装）

#### OpenSpec vs TDD

| 内容 | OpenSpec | TDD | 理由 |
|------|:--------:|:---:|------|
| 型定義・API契約 | ✅ | - | 仕様として明文化 |
| エッジケース | 記載 | ✅ | 仕様は書くがテストで検証 |
| 境界値テスト | - | ✅ | 実装検証はTDD |
| リファクタリング保護 | - | ✅ | 仕様変更ではない |

**原則**: OpenSpec = 仕様の明文化、TDD = 仕様の検証

### ワークフロー例: 新機能追加

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    BDD      │     │  OpenSpec   │     │    TDD      │
│  (振る舞い)  │ ──→ │  (技術仕様)  │ ──→ │   (検証)    │
└─────────────┘     └─────────────┘     └─────────────┘
     │                    │                    │
     ▼                    ▼                    ▼
  Feature追加        Proposal作成         テスト追加
     │                    │                    │
     │                    ▼                    ▼
     │               レビュー・合意        Red → Green
     │                    │                    │
     └────────────────────┴────────────────────┘
                          │
                          ▼
                    全テスト通過
```

### このフローを使うべきケース

- AI協調開発（Claude Code, Cursor等）を行うプロジェクト
- 複数人/AIでの並列開発
- 変更履歴の追跡が重要なプロジェクト
- ステークホルダーとの合意形成が必要

### このフローを使わないケース

- 小規模・単発のプロジェクト
- AI支援なしの従来型開発
- 変更頻度が低いプロジェクト

### 参考

- [OpenSpec Documentation](https://github.com/fission-ai/openspec)
- サンプル実装: `python/openspec/`

---

## 参考リンク

- [Behave Documentation](https://behave.readthedocs.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [pytest Documentation](https://docs.pytest.org/)
- [Jest Documentation](https://jestjs.io/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [OpenSpec (Fission AI)](https://github.com/fission-ai/openspec)
