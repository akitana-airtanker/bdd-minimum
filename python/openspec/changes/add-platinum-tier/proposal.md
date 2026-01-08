# Proposal: Add Platinum Tier

> **Note**: これは学習用サンプルです。実際には適用しません。
> BDD → OpenSpec → TDD フローの具体例として参照してください。

## Summary

最上位の Platinum 会員ティアを追加し、30% 割引を提供する。

## Motivation

- VIP顧客向けの特別待遇として最上位ティアを新設
- 既存の Gold (20%) より高い割引率を提供

## Related BDD Scenarios

新規追加するシナリオ:

```gherkin
# features/membership_discount.feature に追加
@new
Scenario: Platinum member receives 30% discount
  Given a customer with "Platinum" membership
  When they purchase an item for 1000 yen
  Then the discounted price should be 700 yen
```

## Technical Spec

### Changes to DISCOUNT_RATES

```python
DISCOUNT_RATES = {
    "Platinum": 0.30,  # NEW
    "Gold": 0.20,
    "Silver": 0.10,
    "Bronze": 0.05,
    "None": 0.00,
}
```

### Impact Analysis

| Component | Impact | Notes |
|-----------|--------|-------|
| `src/discount.py` | Minimal | 辞書に1エントリ追加のみ |
| `features/` | Addition | 新シナリオ追加 |
| `tests/` | Addition | エッジケーステスト追加 |
| API Contract | None | シグネチャ変更なし |

### Backward Compatibility

- 既存ランク (Gold, Silver, Bronze, None) の動作は変更なし
- 既存テストはすべて通過する

## Risks

- 低: 単純な辞書エントリ追加のみ
- 考慮点: 未知ランク "Platinum" が現在 0% 割引で処理されている可能性

## Acceptance Criteria

1. Platinum 会員は 30% 割引を受ける
2. 既存ランクの割引率は変更なし
3. 端数処理は既存と同様（切り捨て）

## References

- Spec: `openspec/specs/discount.md`
- BDD: `features/membership_discount.feature`
- Implementation: `src/discount.py`
