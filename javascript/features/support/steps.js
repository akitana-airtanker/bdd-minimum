/**
 * BDD Step Definitions for Membership Discount
 *
 * Featureファイルの各ステップをsrc/discount.jsに接続する。
 */

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { MembershipDiscount } = require('../../src/discount');

Given('a customer with {string} membership', function (rank) {
  this.discount = new MembershipDiscount(rank);
});

When('they purchase an item for {int} yen', function (price) {
  this.finalPrice = this.discount.calculatePrice(price);
});

Then('the discounted price should be {int} yen', function (expected) {
  assert.strictEqual(
    this.finalPrice,
    expected,
    `Expected ${expected}, but got ${this.finalPrice}`
  );
});
