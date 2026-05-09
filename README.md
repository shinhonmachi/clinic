# 新本町クリニック ホームページ

## お知らせの更新方法

**`news.json` を編集するだけ** で、ホームページのお知らせが更新されます。
HTML ファイルは一切触る必要がありません。

---

### news.json の書き方

```json
[
  {
    "date": "2025.06.01",
    "badge": "new",
    "text": "6月の診療スケジュールを更新しました。"
  },
  {
    "date": "2025.05.03",
    "badge": "holiday",
    "text": "5月3日〜6日（GW）は休診です。"
  }
]
```

**badge の種類**

| 値 | 表示 | 用途 |
|---|---|---|
| `"new"` | 新着（ピンク） | 新しいお知らせ全般 |
| `"holiday"` | 休診（緑） | 休診日・臨時休診 |
| `"info"` | お知らせ（青） | 設備変更・その他案内 |

**ルール**
- 配列の上にあるものが新しい順に表示されます（手動で並び替えてください）
- `text` に HTML タグは使えません（プレーンテキストのみ）
- 表示件数に制限はありませんが、3〜5件程度が見やすいです

---

### ファイル構成

```
clinic-main/
├── news.json          ← お知らせはここだけ編集
├── index.html
├── shinryo_annai.html
├── shisetsu.html
├── ryokin.html
├── access.html
├── staff.html
├── common.css
├── common.js
├── favicon.svg
└── pics/
```
