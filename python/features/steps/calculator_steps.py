"""
BDDステップ定義

このファイルは src/calculator.py をインポートしてテストします。
Featureファイルの各ステップ（Given/When/Then）がここのコードに対応します。
"""

import sys
import os

# src/ ディレクトリをパスに追加
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from behave import given, when, then
from src.calculator import Calculator  # ← アプリケーションコードをインポート


@given('the calculator is cleared')
def step_calculator_cleared(context):
    # 実際のCalculatorクラスのインスタンスを作成
    context.calculator = Calculator()


@when('I add {number:d}')
def step_add(context, number):
    # Calculatorクラスのaddメソッドを呼び出す
    context.calculator.add(number)


@when('I subtract {number:d}')
def step_subtract(context, number):
    # Calculatorクラスのsubtractメソッドを呼び出す
    context.calculator.subtract(number)


@when('I multiply by {number:d}')
def step_multiply(context, number):
    # Calculatorクラスのmultiplyメソッドを呼び出す
    context.calculator.multiply(number)


@then('the result should be {expected:d}')
def step_check_result(context, expected):
    # Calculatorクラスのresultプロパティを検証
    actual = context.calculator.result
    assert actual == expected, f"Expected {expected}, but got {actual}"
