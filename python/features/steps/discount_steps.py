"""
BDD Step Definitions for Membership Discount

Featureファイルの各ステップをsrc/discount.pyに接続する。
"""
from behave import given, when, then
from src.discount import MembershipDiscount


@given('a customer with "{rank}" membership')
def step_given_customer_with_membership(context, rank):
    context.discount = MembershipDiscount(rank)


@when('they purchase an item for {price:d} yen')
def step_when_purchase_item(context, price):
    context.final_price = context.discount.calculate_price(price)


@then('the discounted price should be {expected:d} yen')
def step_then_price_should_be(context, expected):
    assert context.final_price == expected, \
        f"Expected {expected}, but got {context.final_price}"
