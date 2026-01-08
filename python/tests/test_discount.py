"""
TDD Unit Tests for Membership Discount

BDDでカバーしないエッジケース・境界値をテストする。
- 未知のランク
- 端数処理
- ゼロ値
"""
import pytest
from src.discount import MembershipDiscount


class TestMembershipDiscount:
    # エッジケース: 未知のランク
    def test_unknown_rank_defaults_to_no_discount(self):
        discount = MembershipDiscount("Platinum")
        assert discount.calculate_price(1000) == 1000

    # エッジケース: 端数処理（切り捨て）
    def test_rounding_truncates_decimals(self):
        discount = MembershipDiscount("Bronze")  # 5% off
        # 333 * 0.95 = 316.35 → 316
        assert discount.calculate_price(333) == 316

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
