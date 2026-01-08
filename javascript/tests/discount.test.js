/**
 * TDD Unit Tests for Membership Discount
 *
 * BDDでカバーしないエッジケース・境界値をテストする。
 * - 未知のランク
 * - 端数処理
 * - ゼロ値
 */

const { MembershipDiscount } = require('../src/discount');

describe('MembershipDiscount', () => {
  // エッジケース: 未知のランク
  test('unknown rank defaults to no discount', () => {
    const discount = new MembershipDiscount('Platinum');
    expect(discount.calculatePrice(1000)).toBe(1000);
  });

  // エッジケース: 端数処理（切り捨て）
  test('rounding truncates decimals', () => {
    const discount = new MembershipDiscount('Bronze'); // 5% off
    // 333 * 0.95 = 316.35 → 316
    expect(discount.calculatePrice(333)).toBe(316);
  });

  // エッジケース: 0円
  test('zero price', () => {
    const discount = new MembershipDiscount('Gold');
    expect(discount.calculatePrice(0)).toBe(0);
  });

  // 境界値: 全ランク
  test.each([
    ['Gold', 800],
    ['Silver', 900],
    ['Bronze', 950],
    ['None', 1000],
  ])('%s rank gives %i yen', (rank, expected) => {
    const discount = new MembershipDiscount(rank);
    expect(discount.calculatePrice(1000)).toBe(expected);
  });
});
