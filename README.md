# BDD + TDD Minimum - ベストプラクティス最小構成

**BDDとTDDの棲み分け**を示す最小構成サンプルです。

## BDD vs TDD の棲み分け

```
┌─────────────────────────────────────────────────────────────┐
│  BDD (features/)                                            │
│  - ビジネス要件の受け入れテスト                               │
│  - ステークホルダーが読める                                   │
│  - 少数のシナリオ（3-5個）                                    │
│  - 例: "ゴールド会員は20%割引を受ける"                        │
└─────────────────────────────────────────────────────────────┘
                              ↓ 補完
┌─────────────────────────────────────────────────────────────┐
│  TDD (tests/)                                               │
│  - 実装の詳細・エッジケース                                   │
│  - 開発者向け                                                │
│  - 多数のテスト（10-20個）                                    │
│  - 例: "未知のランクはデフォルト0%", "端数は切り捨て"          │
└─────────────────────────────────────────────────────────────┘
```

---

## ディレクトリ構成

```
bdd-minimum/
├── python/
│   ├── src/
│   │   └── discount.py              # アプリケーションコード
│   ├── features/                    # BDD（受け入れテスト）
│   │   ├── membership_discount.feature
│   │   └── steps/
│   │       └── discount_steps.py
│   └── tests/                       # TDD（ユニットテスト）
│       └── test_discount.py
├── javascript/
│   ├── src/
│   │   └── discount.js
│   ├── features/
│   │   ├── membership_discount.feature
│   │   └── support/
│   │       └── steps.js
│   └── tests/
│       └── discount.test.js
└── README.md
```

---

## クイックスタート

### Python

```bash
cd python
pip install behave pytest

# BDD（受け入れテスト）
behave

# TDD（ユニットテスト）
pytest
```

### JavaScript

```bash
cd javascript
npm install

# BDD（受け入れテスト）
npm test

# TDD（ユニットテスト）
npm run test:unit
```

---

## Feature ファイル（BDD）

```gherkin
Feature: Membership Discount
  Scenario: Gold member receives 20% discount
    Given a customer with "Gold" membership
    When they purchase an item for 1000 yen
    Then the discounted price should be 800 yen
```

**ステークホルダーが読める仕様書**であり、同時に**実行可能なテスト**。

---

## Unit Test（TDD）

```python
def test_unknown_rank_defaults_to_no_discount():
    discount = MembershipDiscount("Platinum")
    assert discount.calculate_price(1000) == 1000
```

**エッジケース・境界値**を開発者がテスト。BDDでカバーしない詳細。

---

## BDD/TDD の使い分け

| 観点 | BDD | TDD |
|------|-----|-----|
| 対象者 | ステークホルダー | 開発者 |
| 記述 | Gherkin（自然言語） | コード |
| テスト数 | 少数（3-5） | 多数（10-20） |
| カバー範囲 | ハッピーパス | エッジケース |
| 例 | "Gold会員は20%割引" | "未知ランクは0%", "端数切り捨て" |

---

## 参考リンク

- [Behave Documentation](https://behave.readthedocs.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [pytest Documentation](https://docs.pytest.org/)
- [Jest Documentation](https://jestjs.io/)

---

## ライセンス

MIT
