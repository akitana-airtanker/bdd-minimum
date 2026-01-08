# BDD Minimum - 最小構成で理解するBDD

**実際のアプリケーションコード**をBDDでテストする最小構成サンプルです。

## このリポジトリのポイント

```
┌─────────────────────────────────────────────────────────────┐
│  Feature File (仕様)                                        │
│  「5を足して3を足したら8になる」                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ マッピング
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Definitions (グルーコード)                             │
│  from src.calculator import Calculator                      │
│  calculator.add(5)                                          │
└─────────────────────┬───────────────────────────────────────┘
                      │ テスト
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  src/ (アプリケーションコード) ← これがテスト対象            │
│  class Calculator:                                          │
│      def add(self, value): ...                              │
└─────────────────────────────────────────────────────────────┘
```

**BDDは `src/` のアプリケーションコードの振る舞いをテストします。**

---

## ディレクトリ構成

### Python (Behave)

```
python/
├── src/                          # アプリケーションコード
│   └── calculator.py             # ← テスト対象
├── features/
│   ├── calculator.feature        # 振る舞いの仕様
│   └── steps/
│       └── calculator_steps.py   # src/をテストするコード
```

### JavaScript (Cucumber.js)

```
javascript/
├── src/                          # アプリケーションコード
│   └── calculator.js             # ← テスト対象
├── features/
│   ├── calculator.feature        # 振る舞いの仕様
│   └── support/
│       └── steps.js              # src/をテストするコード
└── package.json
```

---

## クイックスタート

### Python

```bash
cd python
pip install behave
behave
```

### JavaScript

```bash
cd javascript
npm install
npm test
```

---

## Feature ファイル（仕様）

Python/JavaScript共通で同じGherkin形式を使用：

```gherkin
Feature: Calculator
  Scenario: Add two numbers
    Given the calculator is cleared
    When I add 5
    And I add 3
    Then the result should be 8
```

これが「人間が読める仕様書」であり、同時に「実行可能なテスト」です。

---

## アプリケーションコード（テスト対象）

### Python (`src/calculator.py`)

```python
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, value):
        self.result += value
        return self.result
```

### JavaScript (`src/calculator.js`)

```javascript
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this.result;
  }
}
```

---

## なぜサンプルリポジトリは複雑に見えるのか？

[behave.example](https://github.com/behave/behave.example) などが複雑に見える理由：

| 要素 | このリポジトリ | behave.example |
|------|--------------|----------------|
| アプリケーションコード | `src/calculator.py` | なし（デモ用） |
| Feature + Steps | あり | あり |
| ドキュメント生成 | なし | Sphinx（大量） |
| CI/CD | なし | あり |
| 複数チュートリアル | なし | 12個 |

**結論:** BDDの本質は「src/ + features/ + steps/」の3層構造。それ以外はオプション。

---

## 学習パス

[docs/learning-path.md](docs/learning-path.md) で段階的な学習パス（Layer 0-4）を解説しています。

---

## 参考リンク

- [Behave Documentation](https://behave.readthedocs.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)

---

## ライセンス

MIT
