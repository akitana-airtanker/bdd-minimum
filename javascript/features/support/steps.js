const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I have a greeter', function () {
  this.greeter = () => 'Hello, World!';
});

When('I ask for a greeting', function () {
  this.result = this.greeter();
});

Then('I should receive {string}', function (expected) {
  assert.strictEqual(this.result, expected);
});
