# Tasks: Add Platinum Tier

> **Note**: これは学習用サンプルです。実際には適用しません。

## Task Overview

| # | Task | Status | Dependencies |
|---|------|--------|--------------|
| 1 | BDDシナリオ追加 | [ ] | - |
| 2 | ステップ定義確認 | [ ] | Task 1 |
| 3 | TDDテスト追加 (Red) | [ ] | Task 1 |
| 4 | 実装 (Green) | [ ] | Task 3 |
| 5 | 全テスト実行確認 | [ ] | Task 4 |
| 6 | スペック更新 | [ ] | Task 5 |

---

## Task 1: BDDシナリオ追加

**File**: `features/membership_discount.feature`

```gherkin
@new
Scenario: Platinum member receives 30% discount
  Given a customer with "Platinum" membership
  When they purchase an item for 1000 yen
  Then the discounted price should be 700 yen
```

**Acceptance**:
- [ ] シナリオが正しい構文で追加されている
- [ ] 既存シナリオに影響がない

---

## Task 2: ステップ定義確認

**File**: `features/steps/discount_steps.py`

既存のステップ定義でカバー可能か確認:
- `a customer with "{rank}" membership` → OK
- `they purchase an item for {price:d} yen` → OK
- `the discounted price should be {expected:d} yen` → OK

**Acceptance**:
- [ ] 新規ステップ定義が不要であることを確認

---

## Task 3: TDDテスト追加 (Red)

**File**: `tests/test_discount.py`

```python
def test_platinum_member_discount(self):
    """Platinum会員は30%割引を受ける"""
    discount = MembershipDiscount("Platinum")
    assert discount.calculate_price(1000) == 700

def test_platinum_rounding(self):
    """Platinum会員の端数処理（切り捨て）"""
    discount = MembershipDiscount("Platinum")
    # 333 * 0.70 = 233.1 → 233
    assert discount.calculate_price(333) == 233
```

**Acceptance**:
- [ ] テストが失敗すること (Red)
- [ ] テスト名が意図を明確に表現している

---

## Task 4: 実装 (Green)

**File**: `src/discount.py`

```python
DISCOUNT_RATES = {
    "Platinum": 0.30,  # 追加
    "Gold": 0.20,
    "Silver": 0.10,
    "Bronze": 0.05,
    "None": 0.00,
}
```

**Acceptance**:
- [ ] Task 3 のテストが通ること (Green)
- [ ] 既存テストが引き続き通ること

---

## Task 5: 全テスト実行確認

```bash
# BDD テスト
behave

# TDD テスト
pytest

# 両方
behave && pytest
```

**Acceptance**:
- [ ] BDD: 4 scenarios passed (既存3 + 新規1)
- [ ] TDD: すべてのテスト passed

---

## Task 6: スペック更新

**File**: `openspec/specs/discount.md`

Discount Rates テーブルに Platinum を追加:

| Rank | Discount Rate | Example (1000 yen) |
|------|---------------|-------------------|
| Platinum | 30% | 700 yen |
| Gold | 20% | 800 yen |
| ... | ... | ... |

**Acceptance**:
- [ ] スペックが実装と一致している
- [ ] Edge Cases に Platinum 関連を追加
