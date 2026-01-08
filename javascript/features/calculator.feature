Feature: Calculator
  As a user
  I want to use a calculator
  So that I can perform arithmetic operations

  Scenario: Add two numbers
    Given the calculator is cleared
    When I add 5
    And I add 3
    Then the result should be 8

  Scenario: Subtract from a number
    Given the calculator is cleared
    When I add 10
    And I subtract 4
    Then the result should be 6

  Scenario: Multiple operations
    Given the calculator is cleared
    When I add 5
    And I multiply by 3
    And I subtract 5
    Then the result should be 10
