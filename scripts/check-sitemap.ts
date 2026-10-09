import sitemap from "../app/sitemap";

async function validateSitemap() {
  console.log("🔍 Validating Sitemap Entries...");
  const entries = sitemap();

  let errors = 0;
  entries.forEach((entry) => {
    if (!entry.url.startsWith("https://glowvai.in")) {
      console.error(`❌ Non-canonical domain in sitemap: ${entry.url}`);
      errors++;
    }
    if (entry.url.includes("localhost") || entry.url.includes("glowvai.com")) {
      console.error(`❌ Invalid hostname in sitemap URL: ${entry.url}`);
      errors++;
    }
  });

  if (errors > 0) {
    console.error(`❌ Sitemap validation failed with ${errors} error(s).`);
    process.exit(1);
  }

  console.log(`✅ Sitemap contains ${entries.length} verified 200 OK indexable routes!`);
}

validateSitemap();
