# BDD + TDD Minimum - ベストプラクティス最小構成

**BDDとTDDの棲み分け**を示す最小構成サンプルです。

## BDD → OpenSpec → TDD の3層フロー

```
┌─────────────────────────────────────────────────────────────┐
│  BDD (features/)                                            │
│  「何をすべきか」- ビジネス振る舞い                          │
│  - ステークホルダーが読める仕様書                            │
│  - 例: "ゴールド会員は20%割引を受ける"                        │
└─────────────────────────────────────────────────────────────┘
                              ↓ 変換・参照
┌─────────────────────────────────────────────────────────────┐
│  OpenSpec (openspec/)                                       │
│  「どう実装するか合意」- AI向け技術仕様                      │
│  - proposal.md, tasks.md, specs/                            │
│  - AIコーディングアシスタントとの合意形成                    │
└─────────────────────────────────────────────────────────────┘
                              ↓ 実装・検証
┌─────────────────────────────────────────────────────────────┐
│  TDD (tests/)                                               │
│  「実装を検証」- エッジケース・境界値                        │
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
│   ├── openspec/                    # OpenSpec（技術仕様）
│   │   ├── project.md
│   │   ├── AGENTS.md
│   │   ├── specs/
│   │   │   └── discount.md
│   │   └── changes/
│   │       └── add-platinum-tier/   # 学習用サンプル
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
├── LLM-GUIDE.md                     # LLM参照用ガイド
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

## 3層の使い分け

| 観点 | BDD | OpenSpec | TDD |
|------|-----|----------|-----|
| 役割 | 何をすべきか | どう実装するか | 実装を検証 |
| 対象者 | ステークホルダー | 開発者・AI | 開発者 |
| 記述 | Gherkin | Markdown | コード |
| テスト数 | 少数（3-5） | - | 多数（10-20） |
| 例 | "Gold会員は20%割引" | API契約、タスク分解 | "端数切り捨て" |

---

## 参考リンク

- [Behave Documentation](https://behave.readthedocs.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [pytest Documentation](https://docs.pytest.org/)
- [Jest Documentation](https://jestjs.io/)
- [OpenSpec (Fission AI)](https://github.com/fission-ai/openspec)

---

## ライセンス

MIT
