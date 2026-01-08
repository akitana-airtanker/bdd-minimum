# BDD + TDD 学習パス

BDDとTDDの棲み分けを理解し、段階的にスキルを身につけるガイドです。

---

## BDD vs TDD の棲み分け

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

| 観点 | BDD | TDD |
|------|-----|-----|
| 対象者 | ステークホルダー | 開発者 |
| 記述 | Gherkin（自然言語） | コード |
| テスト数 | 少数（3-5） | 多数（10-20） |
| カバー範囲 | ハッピーパス | エッジケース |

---

## Layer 概要

| Layer | 内容 | ファイル数 | 必要になるタイミング |
|-------|-----|----------|-------------------|
| Layer 0 | BDD + TDD 基本構成 | 5-6 | **常に必要** |
| Layer 1 | Tags, 設定ファイル | +1-2 | シナリオが5個以上 |
| Layer 2 | Hooks (Before/After) | +1 | セットアップの重複 |
| Layer 3 | Scenario Outlines | 同じ | データ駆動テスト |
| Layer 4 | CI/CD, レポート | +2-3 | チーム開発 |

---

## Layer 0: 最小構成（BDD + TDD）

### ディレクトリ構成

```
project/
├── src/
│   └── discount.py          # アプリケーションコード
├── features/                # BDD（受け入れテスト）
│   ├── membership_discount.feature
│   └── steps/
│       └── discount_steps.py
└── tests/                   # TDD（ユニットテスト）
    └── test_discount.py
```

### BDD: Feature ファイル

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

**ポイント:** ステークホルダーが読めるビジネス要件。技術用語なし。

### BDD: Step Definitions

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

### TDD: Unit Tests

```python
import pytest
from src.discount import MembershipDiscount

class TestMembershipDiscount:
    # エッジケース: 未知のランク
    def test_unknown_rank_defaults_to_no_discount(self):
        discount = MembershipDiscount("Platinum")
        assert discount.calculate_price(1000) == 1000

    # エッジケース: 端数処理
    def test_rounding_truncates_decimals(self):
        discount = MembershipDiscount("Bronze")  # 5% off
        assert discount.calculate_price(333) == 316  # 切り捨て

    # エッジケース: 0円
    def test_zero_price(self):
        discount = MembershipDiscount("Gold")
        assert discount.calculate_price(0) == 0

    # 境界値: 全ランク
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

**ポイント:** BDDでカバーしないエッジケース・境界値を開発者がテスト。

### 実行

```bash
# BDD（受け入れテスト）
behave

# TDD（ユニットテスト）
pytest

# 両方
behave && pytest
```

---

## Layer 1: Tags と設定

シナリオが増えてきたら整理が必要。

### Tags

```gherkin
Feature: Membership Discount

  @smoke @critical
  Scenario: Gold member receives 20% discount
    ...

  @regression
  Scenario: Silver member receives 10% discount
    ...
```

```bash
behave --tags=@smoke           # smokeテストのみ
behave --tags="not @slow"      # slowを除外
```

### 設定ファイル: `behave.ini`

```ini
[behave]
format = pretty
stdout_capture = false
```

---

## Layer 2: Hooks（Before/After）

セットアップ・クリーンアップが重複したら導入。

### `features/environment.py`

```python
def before_scenario(context, scenario):
    """各シナリオ実行前"""
    context.test_data = {}

def after_scenario(context, scenario):
    """各シナリオ実行後"""
    if scenario.status == "failed":
        print(f"FAILED: {scenario.name}")
```

---

## Layer 3: Scenario Outlines

同じテストを複数データで実行。

```gherkin
Scenario Outline: Different membership discounts
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

---

## Layer 4: CI/CD

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install behave pytest
      - name: BDD tests
        run: behave
      - name: TDD tests
        run: pytest
```

---

## BDD/TDD の選択基準

### BDD に書くべきもの

- ビジネス要件（ステークホルダーと合意したルール）
- ハッピーパス（正常系）
- 3-5シナリオで十分

### TDD に書くべきもの

- エッジケース（未知の入力、境界値）
- 実装詳細（端数処理、型変換）
- 開発者だけが気にする挙動

### 例: 会員割引

| テスト | BDD? | TDD? | 理由 |
|--------|------|------|------|
| Gold会員は20%割引 | **BDD** | - | ビジネス要件 |
| 未知ランクは0%割引 | - | **TDD** | エッジケース |
| 端数は切り捨て | - | **TDD** | 実装詳細 |
| 0円は0円のまま | - | **TDD** | 境界値 |

---

## 推奨アプローチ

1. **Layer 0 から始める** - BDD + TDD の基本構成
2. **痛みを感じてから追加** - 必要になるまで複雑化しない
3. **BDD は少なく、TDD は多く** - ステークホルダー向け vs 開発者向け

> "BDDはコミュニケーションツール、TDDは設計ツール"
