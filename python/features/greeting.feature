Feature: Greeting
  As a user
  I want to receive a greeting
  So that I feel welcomed

  Scenario: Simple greeting
    Given I have a greeter
    When I ask for a greeting
    Then I should receive "Hello, World!"
