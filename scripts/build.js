/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    console.log("📦 Building React app with Vite...");
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ React build completed successfully!");

    // Fix the paths in index.html for Electron compatibility
    const indexHtmlPath = path.join(__dirname, "..", "dist", "index.html");
    if (fs.existsSync(indexHtmlPath)) {
      let content = fs.readFileSync(indexHtmlPath, "utf8");

      // Fix asset paths for Electron's file:// protocol
      content = content.replace(/\/assets\//g, "./assets/");
      content = content.replace(/(src|href)=["']\//g, '$1="./');
      content = content.replace(
        /(src|href)=["']\.\.\/assets\//g,
        '$1="./assets/',
      );

      fs.writeFileSync(indexHtmlPath, content);
      console.log(
        "🔄 Updated asset paths in index.html for Electron compatibility",
      );
    }

    console.log(
      "✨ Build completed successfully! You can run the app with 'npm start' or package it with 'npm run package'",
    );
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

main();
