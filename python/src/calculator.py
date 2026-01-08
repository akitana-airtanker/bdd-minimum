"""
Minimal Calculator - アプリケーションコード（テスト対象）

このファイルがBDDでテストされる「実際のアプリケーション」です。
"""


class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, value):
        self.result += value
        return self.result

    def subtract(self, value):
        self.result -= value
        return self.result

    def multiply(self, value):
        self.result *= value
        return self.result

    def clear(self):
        self.result = 0
        return self.result
