# ZERO-COST AUTOMATED BLOG PIPELINE - JULES PROMPT

## YOUR MISSION
Create a unique, trending, high-traffic SEO blog post and commit it to the GitHub repo in the exact structure below. DO NOT publish to Blogger — only prepare the files. Google Apps Script will handle publishing.

---

## STEP 1: DISCOVER A TRENDING TOPIC
Research CURRENT trending topics (last 24-48 hours) with HIGH traffic potential:
- Google Trends (Trending Now / Breaking Out)
- Twitter/X trending hashtags
- NewsAPI headlines  
- Reddit r/popular front page
- AnswerThePublic for question-based queries

**SELECTION CRITERIA (must meet ALL):**
- Trending UPWARD (not declining)
- Mass search appeal (news, tech, mobile, AI, finance, apps, viral stories)
- Can be rewritten 100% uniquely without copying source text
- NOT a topic already in repo's `content/index.json`
- Prefer: "How to", "What is", "Top X", "Breaking", "Everything You Need to Know"

---

## STEP 2: GENERATE UNIQUE SEO CONTENT
**CRITICAL: DO NOT COPY-PASTE FROM SOURCES.**
- Read sources for FACTS only
- Rewrite everything in your own words with original angles
- Add unique analysis, predictions, or actionable tips not in sources
- Target: 1,200–1,800 words
- Tone: Conversational expert, 2nd person ("you")
- Include: Hook, TOC, H2 sections, bullet lists, table, pro tip box, FAQ (3-5 Qs), conclusion with CTA

**SEO RULES:**
- Primary keyword in: H1, first 100 words, one H2, conclusion
- Meta title: 50-60 chars (primary keyword first)
- Meta description: 150-160 chars (primary + CTA)
- Keyword density: 1-2% primary, 0.5% secondary
- Readability: Flesch 60-70 (8th-9th grade)

---

## STEP 3: CREATE FILES

### File A: `content/YYYY-MM-DD-slug/blog-content.html`
Create ONLY the blog body HTML. NO `<html>`, `<head>`, `<body>` tags.

Structure:
```html
<article class="blog-post" data-slug="SLUG">
  <!-- Schema markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "TITLE",
    "description": "META_DESCRIPTION",
    "datePublished": "YYYY-MM-DDTHH:mm:ss+05:30",
    "dateModified": "YYYY-MM-DDTHH:mm:ss+05:30",
    "author": {"@type": "Person", "name": "News Gully Team"},
    "image": "FEATURED_IMAGE_URL"
  }
  </script>

  <h1>BLOG TITLE</h1>
  
  <p class="excerpt">META DESCRIPTION</p>
  
  <nav class="toc">
    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#section-1">Section 1 Title</a></li>
      <li><a href="#section-2">Section 2 Title</a></li>
      <li><a href="#faq-section">Frequently Asked Questions</a></li>
    </ul>
  </nav>

  <!-- Main content with H2s, H3s, lists, tables, images -->
  <h2 id="section-1">Section 1 Title</h2>
  <p>Content goes here...</p>

  <h2 id="section-2">Section 2 Title</h2>
  <p>Content goes here...</p>

  <div class="pro-tip">
    <strong>💡 Pro Tip:</strong> Helpful actionable tip here.
  </div>

  <section class="faq" id="faq-section" itemscope itemtype="https://schema.org/FAQPage">
    <h2>Frequently Asked Questions</h2>
    <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">Question 1?</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">Answer 1.</p>
      </div>
    </div>
  </section>
  
  <div class="cta-box">
    <p>Enjoyed this guide? Share it with your friends and bookmark News Gully for daily tech updates!</p>
  </div>
</article>
```

Use semantic tags: `<article>`, `<section>`, `<h1>`, `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<strong>`, `<blockquote>`, `<img loading="lazy" alt="..." width="800" height="450">`

### File B: `content/YYYY-MM-DD-slug/metadata.json`
```json
{
  "id": "YYYY-MM-DD-slug",
  "title": "Exact Blog Title",
  "slug": "url-friendly-slug",
  "url": "https://newsgully.blogspot.com/YYYY/MM/slug.html",
  "htmlUrlLocation": "https://nitinkanade.github.io/news-gully-blogs/content/YYYY-MM-DD-slug/blog-content.html",
  "metaTitle": "SEO Title (50-60 chars)",
  "metaDescription": "SEO Description (150-160 chars)",
  "primaryKeyword": "main keyword",
  "secondaryKeywords": ["keyword1", "keyword2", "keyword3"],
  "longTailKeywords": ["question 1", "question 2"],
  "labels": ["Tech", "News", "Guides"],
  "tags": ["Tech", "AI", "Mobile"],
  "category": "Tech",
  "author": "News Gully Team",
  "authorBio": "News Gully brings you the latest tech scoops, guides, and trending news.",
  "publishedDate": "YYYY-MM-DDTHH:mm:ss+05:30",
  "modifiedDate": "YYYY-MM-DDTHH:mm:ss+05:30",
  "featuredImage": "https://images.unsplash.com/photo-example?w=800&auto=format&fit=crop&q=80",
  "featuredImageAlt": "Descriptive alt text with keyword",
  "readingTime": "6 min",
  "wordCount": 1500,
  "language": "en",
  "status": "ready",
  "isTrending": true,
  "trendScore": 88,
  "bloggerApiPayload": {
    "kind": "blogger#post",
    "blog": {
      "id": "2578040363867477079"
    },
    "title": "Exact Blog Title",
    "content": "",
    "labels": ["Tech", "News", "Guides"],
    "status": "draft"
  }
}
```

### File C: Update `content/index.json`
Append the new post to the `posts` array. Create file if it doesn't exist.
```json
{
  "lastUpdated": "YYYY-MM-DDTHH:mm:ssZ",
  "posts": [
    {
      "id": "YYYY-MM-DD-slug",
      "metadataUrl": "https://nitinkanade.github.io/news-gully-blogs/content/YYYY-MM-DD-slug/metadata.json",
      "status": "ready",
      "addedAt": "YYYY-MM-DDTHH:mm:ssZ"
    }
  ]
}
```

---

## STEP 4: COMMIT TO GITHUB
1. Create a new branch: `blog/YYYY-MM-DD-slug`
2. Add the 3 files (or updates)
3. Commit with message: `📝 blog: YYYY-MM-DD-slug - [Topic Title]`
4. Push branch
5. Create Pull Request to `main`
6. The auto-merge workflow will merge it automatically

---

## CONSTRAINTS
- Current date: 2026-08-23
- ALL content must be unique — zero copied sentences
- HTML must be content-only (no full page wrapper)
- Every field in metadata.json must be populated with real values
- Use TODAY's date for publishedDate
- Trend score must be realistic (70-95 for high-trend topics)
