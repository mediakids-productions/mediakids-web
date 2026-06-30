(function () {
    'use strict';

    const grid = document.getElementById('blog-grid');
    const tabs = document.getElementById('blog-category-tabs');
    const resultCount = document.getElementById('blog-result-count');

    if (!grid || !tabs) return;

    const iconByCategory = {
        'teacher-guide': 'fa-compass',
        'esl-teaching-tips': 'fa-chalkboard-user',
        'life-in-thailand': 'fa-sun',
        'teaching-in-thailand': 'fa-school',
        'mediakids-academy': 'fa-people-group'
    };

    let posts = [];
    let activeCategory = new URLSearchParams(window.location.search).get('category') || 'all';

    const escapeHtml = (value) => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    function renderTabs() {
        const categoryCounts = posts.reduce((counts, post) => {
            const id = post.category.id;
            if (!counts.has(id)) {
                counts.set(id, { label: post.category.label, count: 0 });
            }
            counts.get(id).count += 1;
            return counts;
        }, new Map());

        if (activeCategory !== 'all' && !categoryCounts.has(activeCategory)) {
            activeCategory = 'all';
        }

        const categoryItems = [
            { id: 'all', label: 'All Articles', count: posts.length, icon: 'fa-layer-group' },
            ...Array.from(categoryCounts, ([id, value]) => ({
                id,
                label: value.label,
                count: value.count,
                icon: iconByCategory[id] || 'fa-folder-open'
            }))
        ];

        tabs.innerHTML = categoryItems.map((category) => `
            <button
                type="button"
                class="blog-category-tab${category.id === activeCategory ? ' is-active' : ''}"
                role="tab"
                aria-selected="${category.id === activeCategory}"
                data-category="${escapeHtml(category.id)}"
            >
                <i class="fas ${category.icon}" aria-hidden="true"></i>
                <span>${escapeHtml(category.label)}</span>
                <span class="blog-category-count">${category.count}</span>
            </button>
        `).join('');
    }

    function renderPosts() {
        const visiblePosts = activeCategory === 'all'
            ? posts
            : posts.filter((post) => post.category.id === activeCategory);

        if (resultCount) {
            resultCount.textContent = `${visiblePosts.length} ${visiblePosts.length === 1 ? 'article' : 'articles'}`;
        }

        grid.innerHTML = visiblePosts.map((post) => `
            <article class="blog-card group">
                <a href="${encodeURI(post.slug)}/" class="blog-card-link" aria-label="Read ${escapeHtml(post.title)}">
                    <div class="blog-card-media">
                        <img
                            src="${escapeHtml(post.image)}"
                            alt="${escapeHtml(post.imageAlt)}"
                            width="1600"
                            height="900"
                            loading="lazy"
                        >
                        <span class="blog-card-category">${escapeHtml(post.category.label)}</span>
                    </div>
                    <div class="blog-card-body">
                        <div class="blog-card-meta">
                            <time datetime="${escapeHtml(post.publishedAt)}">${escapeHtml(post.displayDate)}</time>
                            <span aria-hidden="true">·</span>
                            <span>${escapeHtml(post.readTime)}</span>
                        </div>
                        <h2>${escapeHtml(post.title)}</h2>
                        <p>${escapeHtml(post.excerpt)}</p>
                        <span class="blog-card-action">
                            Read article <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </span>
                    </div>
                </a>
            </article>
        `).join('');

        if (window.AOS) {
            window.AOS.refreshHard();
        }
    }

    function setCategory(categoryId, updateHistory = true) {
        activeCategory = categoryId;
        renderTabs();
        renderPosts();

        if (updateHistory) {
            const url = new URL(window.location.href);
            if (categoryId === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', categoryId);
            }
            window.history.pushState({ category: categoryId }, '', url);
        }
    }

    tabs.addEventListener('click', (event) => {
        const button = event.target.closest('[data-category]');
        if (button) setCategory(button.dataset.category);
    });

    tabs.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

        const buttons = Array.from(tabs.querySelectorAll('[data-category]'));
        const currentIndex = buttons.indexOf(document.activeElement);
        if (currentIndex < 0) return;

        event.preventDefault();
        let nextIndex = currentIndex;
        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % buttons.length;
        if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = buttons.length - 1;

        buttons[nextIndex].focus();
        setCategory(buttons[nextIndex].dataset.category);
    });

    window.addEventListener('popstate', () => {
        setCategory(new URLSearchParams(window.location.search).get('category') || 'all', false);
    });

    fetch('../assets/data/blogs.json', { cache: 'no-store' })
        .then((response) => {
            if (!response.ok) throw new Error(`Blog data returned ${response.status}`);
            return response.json();
        })
        .then((data) => {
            posts = data
                .filter((post) => post && post.slug && post.category)
                .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            renderTabs();
            renderPosts();
        })
        .catch((error) => {
            console.error('Could not load blog data:', error);
            grid.innerHTML = '<p class="blog-empty-state">Articles are temporarily unavailable. Please try again shortly.</p>';
        });
})();
