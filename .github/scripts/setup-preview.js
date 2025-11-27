const fs = require('fs');
// Only run in preview contexts
if (process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy') {
  console.log('🔒 Locking down SEO for Preview...');
  const robotsTxt = "User-agent: *\nDisallow: /";
  fs.writeFileSync('robots.txt', robotsTxt);
  console.log('✅ Created robots.txt (Disallow All)');
}
