# Page4.html CSS 衝突解決方案

## 問題

將 `page-02.html` 的婚紗區塊 (Bridal, 獨家頂級品牌婚紗, 婚紗禮服實穿) 複製到 `page4.html` 時，發生 CSS 衝突：

- **page-02.html** 使用 `style.css` + `css/responsive.css` (自訂 CSS)
- **page4.html / page8.html** 使用 `assets/css/style.css` (Tailwind CSS)

### 衝突點
兩個 CSS 都定義了 `.container` class：
```css
/* page-02 的 style.css */
.container {
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 15px;
}

/* Tailwind 的 style.css */
.container {
    /* 不同的 max-width 和 responsive breakpoints */
}
```

當兩個 CSS 同時載入時，後載入的會覆蓋前者，導致：
- 載入 Tailwind → page-02 CSS：Header/Footer 壞掉
- 載入 page-02 CSS → Tailwind：婚紗區塊壞掉

---

## 解決方案

**只載入 Tailwind CSS，婚紗區塊樣式改用內嵌 (inline styles)**

### CSS 載入
```html
<!-- 只載入 Tailwind CSS -->
<link rel="stylesheet" href="assets/css/style.css">

<!-- 不載入這些 (會造成衝突) -->
<!-- <link rel="stylesheet" href="style.css"/> -->
<!-- <link rel="stylesheet" href="css/responsive.css"/> -->
```

### 婚紗區塊樣式內嵌
從 `style.css` 和 `css/responsive.css` 提取婚紗相關樣式，放入 `<style>` 區塊：

```html
<style>
    /* bridalss-area */
    .bridalss-area { padding-top: 346px; }
    .bridalss-area .container { max-width: 1480px; margin: 0 auto; padding: 0 15px; }
    /* ... 其他婚紗樣式 ... */

    /* exclusivess-area */
    .exclusivess-area { padding: 160px 0 60px; }
    /* ... */

    /* dresses-area */
    .dresses-area { background: #303030; padding: 48px 0; }
    /* ... */

    /* Responsive */
    @media screen and (max-width: 767px) {
        .bridalss-area { padding-top: 80px; }
        /* ... */
    }
</style>
```

### 關鍵技巧
為婚紗區塊的 `.container` 加上父層 scope，避免影響其他區塊：
```css
/* 只影響婚紗區塊的 container */
.bridalss-area .container { max-width: 1480px; }
.exclusivess-area .container { max-width: 1480px; }
.dresses-area .container { max-width: 1480px; }
.dress-dropdown-wrap .container { max-width: 1480px; }

/* Header/Footer/Reserve 的 container 繼續使用 Tailwind 的定義 */
```

---

## 檔案結構

```
page4.html
├── <head>
│   ├── Tailwind CSS (assets/css/style.css)
│   └── <style> 內嵌婚紗區塊樣式
│
├── <body>
│   ├── Header (Tailwind classes, 同 page8.html)
│   ├── Hero Image
│   ├── bridalss-area (page-02 HTML + 內嵌 CSS)
│   ├── exclusivess-area (page-02 HTML + 內嵌 CSS)
│   ├── dress-dropdown-wrap (page-02 HTML + 內嵌 CSS)
│   ├── dresses-area x3 (page-02 HTML + 內嵌 CSS)
│   ├── reserve_area (Tailwind classes, 同 page8.html)
│   ├── contact_area (Tailwind classes, 同 page8.html)
│   ├── bittie_area (Tailwind classes, 同 page8.html)
│   └── Footer (Tailwind classes, 同 page8.html)
│
└── <script>
    ├── Tailwind JS (assets/js/main.js)
    └── 婚紗 dropdown JS (inline)
```

---

## 總結

| 區塊 | 來源 | 樣式方式 |
|------|------|----------|
| Header | page8.html | Tailwind classes |
| Hero | page4.html | Tailwind classes |
| bridalss-area | page-02.html | 內嵌 CSS |
| exclusivess-area | page-02.html | 內嵌 CSS |
| dresses-area | page-02.html | 內嵌 CSS |
| reserve_area | page8.html | Tailwind classes |
| contact_area | page8.html | Tailwind classes |
| bittie_area | page8.html | Tailwind classes |
| Footer | page8.html | Tailwind classes |

**優點：**
- 無 CSS 衝突
- 婚紗區塊樣式完全還原 page-02.html
- Header/Footer/Reserve 區塊與 page8.html 完全相同
- RWD 正常運作
