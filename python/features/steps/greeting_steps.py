from behave import given, when, then


@given('I have a greeter')
def step_have_greeter(context):
    context.greeter = lambda: "Hello, World!"


@when('I ask for a greeting')
def step_ask_greeting(context):
    context.result = context.greeter()


@then('I should receive "{expected}"')
def step_check_result(context, expected):
    assert context.result == expected, f"Expected {expected}, got {context.result}"
