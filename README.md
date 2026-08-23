# 🚀 News Gully - Zero-Cost Automated Blog Publishing Pipeline

An end-to-end automated publishing system for **News Gully** (`https://newsgully.blogspot.com`) leveraging **Jules (AI Writer) ➔ GitHub ➔ GitHub Pages ➔ Google Apps Script ➔ Blogger API v3**.

---

## 📁 Repository Structure

```
news-gully-blogs/
│
├── .github/
│   └── workflows/
│       └── auto-merge.yml          # Automatically approves & merges Jules blog PRs
│
├── content/                        # Served publicly via GitHub Pages
│   ├── index.json                  # Master registry tracking all queued/ready posts
│   │
│   └── 2026-08-23-jio-google-gemini-pro-free-offer/
│       ├── metadata.json           # Full JSON post metadata & configuration
│       └── blog-content.html       # Clean semantic HTML content
│
├── jules-prompt.md                 # Complete prompt to instruct Jules
├── apps-script-code.gs             # Google Apps Script code for Blogger API publishing
└── README.md                       # Setup and operational instructions
```

---

## 🛠️ Step-by-Step Deployment Guide

### Phase 1: GitHub Repository & Pages Setup

1. **Create a GitHub Repository:**
   - Name it `news-gully-blogs` (or your preferred repository name).
   - Push this workspace to your GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "feat: initial automated blog pipeline setup"
     git branch -M main
     git remote add origin https://github.com/YOURUSERNAME/news-gully-blogs.git
     git push -u origin main
     ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub: **Settings ➔ Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Choose `main` branch and `/ (root)` folder (or configure actions).
   - Click **Save**.
   - Your site will be available at: `https://YOURUSERNAME.github.io/news-gully-blogs/`.

3. **Configure Workflow Permissions for Auto-Merge:**
   - In GitHub repository: **Settings ➔ Actions ➔ General**.
   - Scroll down to **Workflow permissions**.
   - Select **Read and write permissions**.
   - Check the box: **Allow GitHub Actions to create and approve pull requests**.
   - Click **Save**.

---

### Phase 2: Google Apps Script Setup

1. **Open Google Apps Script:**
   - Navigate to [script.google.com](https://script.google.com) and click **New project**.
   - Rename the project to `News Gully Auto Publisher`.

2. **Paste Code:**
   - Replace the code in `Code.gs` with the contents of [`apps-script-code.gs`](file:///c:/zMyData/blogger-template/news-gully/news-gully-blogs/apps-script-code.gs).

3. **Update Configuration Variables:**
   - In `CONFIG`:
     ```javascript
     const CONFIG = {
       GITHUB_PAGES_BASE: 'https://YOURUSERNAME.github.io/news-gully-blogs',
       BLOG_ID: 'YOUR_BLOGGER_BLOG_ID', // Found in Blogger dashboard URL
       PUBLISH_STATUS: 'draft' // Change to 'live' when fully verified
     };
     ```
   - *How to find your Blogger Blog ID:* Look at your Blogger dashboard URL: `https://www.blogger.com/blog/posts/8472910482910294821` (the number at the end is your `BLOG_ID`).

4. **Enable Blogger API v3 Service:**
   - In the left sidebar of Google Apps Script, click **Services (+)**.
   - Search for **Blogger API** (v3).
   - Click **Add**.

5. **Test the Connection:**
   - Select the `testFetch` function from the top toolbar dropdown and click **Run**.
   - Check the execution log to verify that it successfully fetches `content/index.json`.
   - Run `checkAndPublishPosts` manually to publish your first post as a draft to Blogger.

6. **Enable Automated 15-Minute Trigger:**
   - Select `createAutomationTrigger` and click **Run**.
   - Your script will now automatically check for new posts every 15 minutes!

---

### Phase 3: Generating Content with Jules

1. Open **Jules** (or your preferred LLM agent).
2. Copy the entire contents of [`jules-prompt.md`](file:///c:/zMyData/blogger-template/news-gully/news-gully-blogs/jules-prompt.md).
3. Update `YOURUSERNAME` and `YOUR-REPO` in the prompt with your repository names.
4. Let Jules research trending topics, write the article, build `blog-content.html` & `metadata.json`, update `index.json`, and open a Pull Request.
5. GitHub Actions will auto-merge the PR into `main`.
6. GitHub Pages will build and serve the new files.
7. Google Apps Script will detect the new post, create the post in Blogger via API, and record it as published.

---

## 🔒 Duplicate Prevention & Safety

- Google Apps Script uses `PropertiesService.getScriptProperties()` to store the list of published post IDs (`publishedPosts`).
- Posts already in this list are never published twice.
- If you need to re-publish or reset the history, run the `resetPublishedList()` function.
