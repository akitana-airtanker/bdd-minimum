/**
 * BDDステップ定義
 *
 * このファイルは src/calculator.js をインポートしてテストします。
 * Featureファイルの各ステップ（Given/When/Then）がここのコードに対応します。
 */

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Calculator } = require('../../src/calculator'); // ← アプリケーションコードをインポート

Given('the calculator is cleared', function () {
  // 実際のCalculatorクラスのインスタンスを作成
  this.calculator = new Calculator();
});

When('I add {int}', function (number) {
  // Calculatorクラスのaddメソッドを呼び出す
  this.calculator.add(number);
});

When('I subtract {int}', function (number) {
  // Calculatorクラスのsubtractメソッドを呼び出す
  this.calculator.subtract(number);
});

When('I multiply by {int}', function (number) {
  // Calculatorクラスのmultiplyメソッドを呼び出す
  this.calculator.multiply(number);
});

Then('the result should be {int}', function (expected) {
  // Calculatorクラスのresultプロパティを検証
  const actual = this.calculator.result;
  assert.strictEqual(actual, expected, `Expected ${expected}, but got ${actual}`);
});
