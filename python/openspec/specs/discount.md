# Spec: Membership Discount System

## Overview

会員ランクに基づく割引計算システム。

## Related BDD Scenarios

- `features/membership_discount.feature`
  - Gold member receives 20% discount
  - Silver member receives 10% discount
  - Non-member pays full price

## API Contract

### Class: MembershipDiscount

```python
class MembershipDiscount:
    """会員割引を計算するクラス"""

    DISCOUNT_RATES: dict[str, float] = {
        "Gold": 0.20,
        "Silver": 0.10,
        "Bronze": 0.05,
        "None": 0.00,
    }

    def __init__(self, membership_rank: str) -> None:
        """
        Args:
            membership_rank: 会員ランク名
        """
        ...

    def calculate_price(self, original_price: int) -> int:
        """
        割引後の価格を計算する。

        Args:
            original_price: 元の価格（整数）

        Returns:
            割引後の価格（整数、端数切り捨て）
        """
        ...
```

## Discount Rates

| Rank | Discount Rate | Example (1000 yen) |
|------|---------------|-------------------|
| Gold | 20% | 800 yen |
| Silver | 10% | 900 yen |
| Bronze | 5% | 950 yen |
| None | 0% | 1000 yen |

## Business Rules

1. **割引率適用**: `final_price = original_price * (1 - discount_rate)`
2. **端数処理**: 小数点以下は切り捨て（`int()` による変換）
3. **未知のランク**: 0% 割引として扱う（エラーにしない）

## Edge Cases (covered by TDD)

| Case | Input | Expected | Reason |
|------|-------|----------|--------|
| Unknown rank | `"Platinum"`, 1000 | 1000 | 未知ランクは0%割引 |
| Rounding | `"Bronze"`, 333 | 316 | `333 * 0.95 = 316.35` → 切り捨て |
| Zero price | `"Gold"`, 0 | 0 | 0円は0円のまま |
| Large price | `"Gold"`, 100000 | 80000 | 大きな金額も正しく計算 |

## Invariants

- `calculate_price(x) >= 0` for all `x >= 0`
- `calculate_price(x) <= x` for all `x >= 0`
- `calculate_price(0) == 0` for all ranks

## File Locations

| Purpose | Location |
|---------|----------|
| Implementation | `src/discount.py` |
| BDD Scenarios | `features/membership_discount.feature` |
| Step Definitions | `features/steps/discount_steps.py` |
| Unit Tests | `tests/test_discount.py` |
