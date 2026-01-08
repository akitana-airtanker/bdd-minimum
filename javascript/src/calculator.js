/**
 * Minimal Calculator - アプリケーションコード（テスト対象）
 *
 * このファイルがBDDでテストされる「実際のアプリケーション」です。
 */

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this.result;
  }

  subtract(value) {
    this.result -= value;
    return this.result;
  }

  multiply(value) {
    this.result *= value;
    return this.result;
  }

  clear() {
    this.result = 0;
    return this.result;
  }
}

module.exports = { Calculator };
