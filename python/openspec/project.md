# Project Context: BDD + TDD Minimum Example

## Overview

Python による BDD (Behave) + TDD (pytest) の最小構成サンプル。
会員ランクに応じた割引計算をビジネスドメインとして使用。

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Python 3.11+ |
| BDD Framework | Behave |
| TDD Framework | pytest |
| Application | 会員割引計算システム |

## Directory Structure

```
python/
├── src/
│   └── discount.py              # アプリケーションコード
├── features/                    # BDD（受け入れテスト）
│   ├── membership_discount.feature
│   └── steps/
│       └── discount_steps.py
├── tests/                       # TDD（ユニットテスト）
│   └── test_discount.py
└── openspec/                    # OpenSpec（技術仕様）
    ├── project.md               # このファイル
    ├── AGENTS.md                # AI向けガイドライン
    ├── specs/                   # 確定済みスペック
    └── changes/                 # 変更提案
```

## Current Implementation

### 割引ランク

| Rank | Discount Rate | Status |
|------|---------------|--------|
| Gold | 20% | Implemented |
| Silver | 10% | Implemented |
| Bronze | 5% | Implemented |
| None | 0% | Implemented |
| Platinum | 30% | **Not Implemented** |

### Core API

```python
class MembershipDiscount:
    def __init__(self, membership_rank: str)
    def calculate_price(self, original_price: int) -> int
```

## Coding Conventions

- 型アノテーション使用
- 端数処理: 切り捨て (`int()` による変換)
- 未知のランクは 0% 割引として扱う（エラーにしない）

## BDD/OpenSpec/TDD Integration

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    BDD      │     │  OpenSpec   │     │    TDD      │
│  (振る舞い)  │ ──→ │  (技術仕様)  │ ──→ │   (検証)    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Role of Each Layer

| Layer | Role | Files |
|-------|------|-------|
| BDD | ビジネス要件の定義 | `features/*.feature` |
| OpenSpec | 技術仕様の明文化・AI合意 | `openspec/` |
| TDD | エッジケース・境界値の検証 | `tests/` |

## Related BDD Scenarios

- `features/membership_discount.feature`
  - Gold member receives 20% discount
  - Silver member receives 10% discount
  - Non-member pays full price

## Commands

```bash
# BDD tests
behave

# TDD tests
pytest

# Both
behave && pytest

# OpenSpec CLI
npm run openspec
```
