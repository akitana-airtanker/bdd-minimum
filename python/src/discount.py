"""
Membership Discount - Application Code

BDDでテストされるビジネスロジック。
会員ランクに応じた割引率を適用する。
"""


class MembershipDiscount:
    DISCOUNT_RATES = {
        "Gold": 0.20,    # 20% off
        "Silver": 0.10,  # 10% off
        "Bronze": 0.05,  # 5% off
        "None": 0.00,    # No discount
    }

    def __init__(self, membership_rank: str):
        self.membership_rank = membership_rank

    def calculate_price(self, original_price: int) -> int:
        """割引後の価格を計算する（端数切り捨て）"""
        rate = self.DISCOUNT_RATES.get(self.membership_rank, 0.00)
        return int(original_price * (1 - rate))
