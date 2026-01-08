Feature: Membership Discount
  As a store owner
  I want to offer discounts based on membership rank
  So that loyal customers are rewarded

  Scenario: Gold member receives 20% discount
    Given a customer with "Gold" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 800 yen

  Scenario: Silver member receives 10% discount
    Given a customer with "Silver" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 900 yen

  Scenario: Non-member pays full price
    Given a customer with "None" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 1000 yen
