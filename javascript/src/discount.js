/**
 * Membership Discount - Application Code
 *
 * BDDでテストされるビジネスロジック。
 * 会員ランクに応じた割引率を適用する。
 */

class MembershipDiscount {
  static DISCOUNT_RATES = {
    Gold: 0.20,    // 20% off
    Silver: 0.10,  // 10% off
    Bronze: 0.05,  // 5% off
    None: 0.00,    // No discount
  };

  constructor(membershipRank) {
    this.membershipRank = membershipRank;
  }

  /**
   * 割引後の価格を計算する（端数切り捨て）
   * @param {number} originalPrice - 元の価格
   * @returns {number} 割引後の価格
   */
  calculatePrice(originalPrice) {
    const rate = MembershipDiscount.DISCOUNT_RATES[this.membershipRank] ?? 0.00;
    return Math.floor(originalPrice * (1 - rate));
  }
}

module.exports = { MembershipDiscount };
