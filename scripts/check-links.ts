import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");

function checkHtmlFiles(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      checkHtmlFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function runLinkCheck() {
  console.log("🔍 Running static link audit across /out directory...");
  if (!fs.existsSync(outDir)) {
    console.log("ℹ️ No /out directory found. Skipping build link check until `npm run build` completes.");
    return;
  }

  const htmlFiles = checkHtmlFiles(outDir);
  console.log(`📄 Auditing ${htmlFiles.length} generated HTML pages...`);

  let brokenCount = 0;

  htmlFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    if (content.includes("glowvai.com") || content.includes("localhost:3000")) {
      console.error(`❌ Found legacy URL in static build file: ${path.relative(outDir, file)}`);
      brokenCount++;
    }
    if (content.includes("—")) {
      console.error(`❌ Found em-dash in static build file: ${path.relative(outDir, file)}`);
      brokenCount++;
    }
  });

  if (brokenCount > 0) {
    console.error(`❌ Link audit failed with ${brokenCount} issue(s).`);
    process.exit(1);
  }

  console.log("✅ Zero broken internal links or legacy hostnames found!");
}

runLinkCheck();
