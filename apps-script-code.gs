/**
 * ZERO-COST BLOGGER AUTO-PUBLISHER
 * Fetches blog data from GitHub Pages → Creates Blogger posts
 * 
 * Target Blog: News Gully (https://newsgully.blogspot.com)
 */

const CONFIG = {
  // Your GitHub Pages base URL (replace YOURUSERNAME and YOUR-REPO with your actual GitHub repo details)
  GITHUB_PAGES_BASE: 'https://nitinkanade.github.io/news-gully-blogs',
  
  // Your Blogger Blog ID (found in Blogger Dashboard URL / Settings)
  BLOG_ID: '2578040363867477079',
  
  // Set to 'draft' for review before going live, or 'live' for instant automated publishing
  PUBLISH_STATUS: 'draft'
};

/**
 * Main function - run this manually first to test, then set up the time-driven trigger.
 */
function checkAndPublishPosts() {
  const indexUrl = CONFIG.GITHUB_PAGES_BASE + '/content/index.json';
  const props = PropertiesService.getScriptProperties();
  
  // Get list of already published post IDs to prevent duplicate publishing
  let publishedPosts = [];
  try {
    publishedPosts = JSON.parse(props.getProperty('publishedPosts') || '[]');
  } catch (e) {
    publishedPosts = [];
  }
  
  try {
    // Fetch the master index from GitHub Pages
    const indexResponse = UrlFetchApp.fetch(indexUrl, {
      muteHttpExceptions: true,
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    if (indexResponse.getResponseCode() !== 200) {
      Logger.log('Failed to fetch index.json: ' + indexResponse.getContentText());
      return;
    }
    
    const index = JSON.parse(indexResponse.getContentText());
    
    if (!index.posts || index.posts.length === 0) {
      Logger.log('No posts found in index.');
      return;
    }
    
    // Process each post marked as ready
    for (let i = 0; i < index.posts.length; i++) {
      const postRef = index.posts[i];
      
      // Skip if not ready or already published
      if (postRef.status !== 'ready') continue;
      if (publishedPosts.indexOf(postRef.id) !== -1) continue;
      
      Logger.log('Processing post: ' + postRef.id);
      
      // Resolve metadata URL (handles placeholders or relative paths)
      const metadataUrl = resolveUrl(postRef.metadataUrl, postRef.id, 'metadata.json');
      Logger.log('Fetching metadata from: ' + metadataUrl);
      
      // Fetch metadata.json
      const metaResponse = UrlFetchApp.fetch(metadataUrl, {
        muteHttpExceptions: true,
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (metaResponse.getResponseCode() !== 200) {
        Logger.log('❌ Failed to fetch metadata for ' + postRef.id + ' (HTTP ' + metaResponse.getResponseCode() + ' from ' + metadataUrl + ')');
        continue;
      }
      
      const metadata = JSON.parse(metaResponse.getContentText());
      
      // Resolve HTML content URL
      const htmlUrl = resolveUrl(metadata.htmlUrlLocation, postRef.id, 'blog-content.html');
      Logger.log('Fetching HTML content from: ' + htmlUrl);
      
      // Fetch HTML content
      const htmlResponse = UrlFetchApp.fetch(htmlUrl, {
        muteHttpExceptions: true,
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (htmlResponse.getResponseCode() !== 200) {
        Logger.log('❌ Failed to fetch HTML for ' + postRef.id + ' (HTTP ' + htmlResponse.getResponseCode() + ' from ' + htmlUrl + ')');
        continue;
      }
      
      const htmlContent = htmlResponse.getContentText();
      
      // Build Blogger post payload
      const blogPost = {
        title: metadata.title,
        content: htmlContent,
        labels: metadata.labels || metadata.tags || [],
        status: CONFIG.PUBLISH_STATUS
      };
      
      // Publish to Blogger using the advanced Google Apps Script Blogger API service
      const result = Blogger.Posts.insert(blogPost, CONFIG.BLOG_ID);
      
      // Mark as published in persistent script properties
      publishedPosts.push(postRef.id);
      props.setProperty('publishedPosts', JSON.stringify(publishedPosts));
      
      Logger.log('✅ SUCCESS: Published "' + metadata.title + '"');
      Logger.log('   Blogger Post ID: ' + result.id);
      Logger.log('   URL: ' + result.url);
    }
    
  } catch (error) {
    Logger.log('❌ ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
  }
}

/**
 * Helper to safely resolve GitHub Pages URL
 */
function resolveUrl(url, postId, defaultFilename) {
  if (!url || url.includes('YOURUSERNAME') || url.includes('YOUR-REPO')) {
    return CONFIG.GITHUB_PAGES_BASE + '/content/' + postId + '/' + defaultFilename;
  }
  if (url.startsWith('/')) {
    return CONFIG.GITHUB_PAGES_BASE + url;
  }
  return url;
}

/**
 * Create a time-driven trigger (run once from the Apps Script editor to set up)
 */
function createAutomationTrigger() {
  // Delete existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkAndPublishPosts') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Run every 15 minutes
  ScriptApp.newTrigger('checkAndPublishPosts')
    .timeBased()
    .everyMinutes(15)
    .create();
  
  Logger.log('✅ Trigger created! Will check for new posts every 15 minutes.');
}

/**
 * Reset published posts list (use with caution if re-testing)
 */
function resetPublishedList() {
  PropertiesService.getScriptProperties().deleteProperty('publishedPosts');
  Logger.log('Published posts list cleared.');
}

/**
 * Test fetch without publishing to verify GitHub Pages connection
 */
function testFetch() {
  const indexUrl = CONFIG.GITHUB_PAGES_BASE + '/content/index.json';
  const response = UrlFetchApp.fetch(indexUrl, {
    muteHttpExceptions: true,
    headers: { 'Cache-Control': 'no-cache' }
  });
  Logger.log('Status Code: ' + response.getResponseCode());
  Logger.log(response.getContentText());
}
