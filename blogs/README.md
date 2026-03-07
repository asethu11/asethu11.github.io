# How to Create a New Blog Post

Use the `new-blog-post/` folder as your starting template every time.

---

## Folder Structure

Every blog post lives in its own subfolder inside `blogs/` and contains exactly:

```
blogs/
└── your-post-slug/
    ├── your-post-slug.html   ← main article file
    ├── index.html            ← alias for blogs.abseth.com routing
    └── img/                  ← (optional) images for this post
```

---

## Step-by-Step

### 1. Create the folder

Name it in **kebab-case** — all lowercase, words separated by hyphens. This slug becomes the URL.

```
blogs/why-constraints-improve-design/
```

### 2. Copy the template files

Copy everything from `new-blog-post/` into your new folder:

```
cp -r blogs/new-blog-post/ blogs/your-post-slug/
```

### 3. Rename the main HTML file

Rename `new-blog-post.html` to match your folder name exactly:

```
blogs/your-post-slug/your-post-slug.html
```

### 4. Edit `your-post-slug.html`

This is the main article file. Update the following:

**`<title>` tag**
```html
<title>Your Post Title Here</title>
```

**Meta tags** — update `description` and `keywords` to reflect the post:
```html
<meta name="description" content="One sentence describing the post.">
<meta name="keywords" content="UX, relevant, keywords, here">
```

**Back button** — already points to `https://abseth.com`, leave it as-is:
```html
<a href="https://abseth.com" class="back-button">
```

**Article heading**
```html
<h1 class="article-h1">Your Post Title Here</h1>
```

**Body content** — write sections using these elements:

| Element | Usage |
|---|---|
| `<h2 class="article-h2">` | Section headings |
| `<h3>` | Sub-headings |
| `<p>` | Paragraphs |
| `<br>` | Spacing between paragraphs |
| `<hr>` | Horizontal divider between major sections |
| `<ul>` / `<li>` | Bullet lists |
| `<strong>` | Bold emphasis |
| `<em>` | Italic emphasis |

**Tables** — use `.table-header` on `<th>` and `.table-first-col` on the first `<td>` in each row:
```html
<table>
    <tr>
        <th class="table-header">Column A</th>
        <th class="table-header">Column B</th>
    </tr>
    <tr>
        <td class="table-first-col">Row 1, Col A</td>
        <td>Row 1, Col B</td>
    </tr>
</table>
```

**Images** — standard image inside a figure:
```html
<figure class="article-figure">
    <img src="img/your-image.png" class="article-image">
</figure>
```

**Theme-aware images** (different image for dark/light mode) — place dark version in `img/dk/` and light version in `img/lt/`, then use:
```html
<img class="theme-img article-image" data-name="image-name">
```
The `updateImages()` script at the top of the file handles switching automatically.

**Footer** — leave the Share button and back-to-top link as-is:
```html
<footer>
    <br><br><br>
    <hr><br>
    <div class="footer-container">
        <button id="copyUrl">Share</button>
        <a href="#top" class="headtag">back to top<span class="arr">↑</span></a>
    </div>
</footer>
```

---

### 5. Edit `index.html`

This file is the alias used when the post is accessed via `blogs.abseth.com/your-post-slug`. Update two lines at the very top of `<head>`:

```html
<base href="/your-post-slug/">
<link rel="canonical" href="https://blogs.abseth.com/your-post-slug">
```

Also update the `<title>` and meta tags to match `your-post-slug.html`.

Everything else in `index.html` (analytics, CSS/JS paths, nav, body content) can be kept identical to `your-post-slug.html`. The `<base>` tag handles all relative path resolution.

---

### Canonical URLs explained

Each blog post has **two HTML files** and therefore two different canonical setups. Here's how they work:

#### `your-post-slug.html` — dynamic canonical via IIFE

This file has an inline script at the very top of `<head>` (the canonical URL normalizer) that **dynamically computes and sets** the canonical `<link>` at runtime. You do not hardcode the canonical URL here — the script handles it.

The script normalizes the current URL by:
- Stripping `/index.html` suffixes
- Lowercasing the slug
- Removing trailing slashes
- Collapsing redundant path patterns (e.g. `/blogs/blogs` → `/blogs`)

It then sets `<link id="canonical-link" rel="canonical">` and redirects the browser if the URL isn't already in canonical form.

**You don't need to touch this script.** Just make sure the `<link id="canonical-link" rel="canonical" href="">` tag is present at the top of `<head>` (it's already in the template).

The canonical this resolves to at runtime will be:
```
https://abseth.com/blogs/your-post-slug
```

#### `index.html` — hardcoded canonical

This file has a **static, hardcoded** canonical pointing to the `blogs.abseth.com` subdomain:

```html
<base href="/your-post-slug/">
<link rel="canonical" href="https://blogs.abseth.com/your-post-slug">
```

This tells search engines that when the post is accessed via `blogs.abseth.com/your-post-slug`, its canonical URL is that same address — not the `abseth.com/blogs/...` path.

**You must update both of these manually** — replace `new-blog-post` with your actual slug:

```html
<!-- Change this: -->
<base href="/new-blog-post/">
<link rel="canonical" href="https://blogs.abseth.com/new-blog-post">

<!-- To this: -->
<base href="/your-post-slug/">
<link rel="canonical" href="https://blogs.abseth.com/your-post-slug">
```

#### Summary

| File | Canonical method | Resolves to |
|---|---|---|
| `your-post-slug.html` | Dynamic IIFE (auto) | `https://abseth.com/blogs/your-post-slug` |
| `index.html` | Hardcoded `<link>` | `https://blogs.abseth.com/your-post-slug` |

---

### 6. Add images (if needed)

Place images inside `img/` within your post folder:

```
blogs/your-post-slug/img/
├── hero.png
├── diagram.gif
├── dk/theme-image.png    ← dark mode variant
└── lt/theme-image.png    ← light mode variant
```

---

### 7. Add the post to the listing pages

You need to add an entry in **two places**:

**`blogs/index.html`** — add a new `<a class="project-row">` inside the `.projects` div, at the top (newest first):

```html
<a href="your-post-slug/your-post-slug.html" class="project-row">
    <p class="project-row-title">Your Post Title Here</p>
    <div class="project-row-sub-title">
        <p class="project-tag">March 2026</p>
        <p class="project-tag">·</p>
        <p class="project-tag">Opinion</p>
        <p class="project-tag">·</p>
        <p class="project-tag">5 min read</p>
    </div>
</a>
```

**`/blogs.html`** (root level) — add the same entry inside the `.projects` div there too. The path is the same since `blogs.html` is at the root and `blogs/` is a subfolder:

```html
<a href="blogs/your-post-slug/your-post-slug.html" class="project-row">
    <p class="project-row-title">Your Post Title Here</p>
    <div class="project-row-sub-title">
        <p class="project-tag">March 2026</p>
        <p class="project-tag">·</p>
        <p class="project-tag">Opinion</p>
        <p class="project-tag">·</p>
        <p class="project-tag">5 min read</p>
    </div>
</a>
```

---

## Checklist

- [ ] Created `blogs/your-post-slug/` folder
- [ ] Renamed main file to `your-post-slug.html`
- [ ] Updated `<title>`, `description`, `keywords` in `your-post-slug.html`
- [ ] Written article content using the correct CSS classes
- [ ] Updated `<base href>` and `<link rel="canonical" href="https://blogs.abseth.com/your-post-slug">` in `index.html`
- [ ] Verified `<link id="canonical-link" rel="canonical" href="">` is present at top of `your-post-slug.html` (do not hardcode the href — the IIFE script sets it dynamically)
- [ ] Updated `<title>` and meta tags in `index.html` to match
- [ ] Added images to `img/` if needed
- [ ] Added entry to `blogs/index.html` (path: `your-post-slug/your-post-slug.html`)
- [ ] Added entry to `/blogs.html` (path: `blogs/your-post-slug/your-post-slug.html`)
- [ ] Committed and pushed/deployed

---

## URL this post will be available at

| URL | File served |
|---|---|
| `abseth.com/blogs/your-post-slug` | `blogs/your-post-slug/your-post-slug.html` |
| `blogs.abseth.com/your-post-slug` | `blogs/your-post-slug/index.html` |
