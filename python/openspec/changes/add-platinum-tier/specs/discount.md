# Spec Delta: Membership Discount System

> **Note**: これは学習用サンプルです。実際には適用しません。
> 適用後に `openspec/specs/discount.md` を更新する内容を示しています。

## Changes Summary

Platinum ティアを DISCOUNT_RATES に追加。

## Updated Discount Rates

| Rank | Discount Rate | Example (1000 yen) | Change |
|------|---------------|-------------------|--------|
| **Platinum** | **30%** | **700 yen** | **NEW** |
| Gold | 20% | 800 yen | - |
| Silver | 10% | 900 yen | - |
| Bronze | 5% | 950 yen | - |
| None | 0% | 1000 yen | - |

## Updated API Contract

```python
DISCOUNT_RATES: dict[str, float] = {
    "Platinum": 0.30,  # NEW
    "Gold": 0.20,
    "Silver": 0.10,
    "Bronze": 0.05,
    "None": 0.00,
}
```

## New Edge Cases (to add to TDD)

| Case | Input | Expected | Reason |
|------|-------|----------|--------|
| Platinum discount | `"Platinum"`, 1000 | 700 | 30% 割引 |
| Platinum rounding | `"Platinum"`, 333 | 233 | `333 * 0.70 = 233.1` → 切り捨て |

## New BDD Scenarios

```gherkin
@new
Scenario: Platinum member receives 30% discount
  Given a customer with "Platinum" membership
  When they purchase an item for 1000 yen
  Then the discounted price should be 700 yen
```

## Migration Notes

- 既存コードへの影響なし
- 既存テストへの影響なし
- 後方互換性あり
