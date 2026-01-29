---
description: How to create a new blog post with Apple-style design
---

# Creating a New Blog Post

Follow these steps to create a new blog post in the MediaKids website.

## Step 1: Create the folder and file

```
blogs/[blog-slug]/index.html
```

Use lowercase with hyphens for the folder name (e.g., `my-new-blog-post`).

## Step 2: Add basePath to components.js

Open `js/components.js` and add the new blog path to the Level 2 deep section (around line 19-25):

```javascript
// Level 2 deep: ../../
else if (path.includes('/curriculum/sem1/') ||
    path.includes('/curriculum/sem2/') ||
    path.includes('/blogs/top-10-myths/') ||
    path.includes('/blogs/teach-in-thailand-guide/') ||
    path.includes('/blogs/[NEW-BLOG-SLUG]/') ||  // ADD THIS LINE
    path.includes('/teach-and-earn/apply/')) {
    basePath = '../../';
}
```

## Step 3: Use the Apple-style blog template

The blog must include:

### Required CSS/Scripts in `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C3WTLTZ1Y1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-C3WTLTZ1Y1');
</script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<link rel="stylesheet" href="../../css/style.css?v=1.0.2">
```

### Required scripts at bottom (before closing `</body>`):
```html
<!-- IMPORTANT: Dynamic version loader - ensures cache busting works -->
<script>document.write('<script src="../../js/version.js?v=' + Date.now() + '"><\/script>');</script>

<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script src="../../js/components.js?v=1.0.2"></script>
<script src="../../js/script.js?v=1.0.2"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script>
    const lenis = new Lenis({
        lerp: 0.1,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
</script>
```


### Design specifications:
- **Font**: Inter from Google Fonts
- **Header**: gradient from #f5f5f7 to #fff
- **h1**: font-size: clamp(2.5rem, 5vw, 3.5rem), letter-spacing: -0.03em
- **h2**: font-size: 1.75rem, letter-spacing: -0.02em, margin-top: 4rem
- **p**: font-size: 1.0625rem, line-height: 1.75
- **Images**: width: calc(100% + 80px), margin-left: -40px (bleeds outside content)
- **Bullet points**: Blue dots (#0066cc), not black
- **CTA button**: border-radius: 980px (pill shape), blue gradient background
- **No card/box styling** - keep it simple with just headings and paragraphs
- **Lenis scroll fix CSS**: 
```css
html.lenis, html.lenis body {
    scroll-behavior: auto !important;
}
```

## Step 4: Add the blog card to blogs/index.html

Add a new blog card with an image cover:

```html
<a href="[blog-slug]/" class="blog-card group" data-aos="fade-up" data-aos-delay="XXX">
    <div class="relative h-52 overflow-hidden">
        <img src="../assets/images/general/mkXX.webp" alt="Blog title"
            class="w-full h-full object-cover">
        <div class="absolute top-4 left-4">
            <span class="category-badge px-4 py-2 rounded-full text-sm font-semibold bg-white/90">
                <i class="fas fa-[icon] mr-1"></i> Category
            </span>
        </div>
    </div>
    <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
            Blog Title Here
        </h3>
        <p class="text-gray-500 text-sm mb-4 line-clamp-2">
            Short description of the blog post.
        </p>
        <div class="flex items-center justify-between">
            <span class="text-xs text-gray-400">X min read</span>
            <span class="text-indigo-600 font-semibold text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                Read More <i class="fas fa-arrow-right text-xs"></i>
            </span>
        </div>
    </div>
</a>
```

## Step 5: Use company images

Use images from `assets/images/general/` (mk1.webp - mk24.webp) for blog content and cover images.

## Step 6: Update sitemap.xml

เพิ่ม URL ใหม่ใน `sitemap.xml`:

```xml
<url>
  <loc>https://www.mediakidsacademy.com/blogs/[blog-slug]/</loc>
  <lastmod>[YYYY-MM-DD]</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

## Checklist before publishing:

- [ ] Google Analytics code added in `<head>`
- [ ] basePath added to components.js
- [ ] AOS CSS and JS included
- [ ] Lenis scroll included with correct config
- [ ] Lenis CSS fix included
- [ ] All paths use `../../` prefix
- [ ] Blog card added to blogs/index.html with image cover
- [ ] Images use company assets from /general/ folder
- [ ] URL added to sitemap.xml
