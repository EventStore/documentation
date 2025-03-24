const fs = require("fs");
const path = require("path");
const del = require("del");
const repos = require("./repos.json");

async function safeRmdir(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log("Removing", dirPath);
    await del(dirPath, { force: true });
  } else {
    console.log("Directory", dirPath, "does not exist, skipping.");
  }
}

async function cleanImportedFiles() {
  // Remove imported docs for each repository.
  for (const repo of repos) {
    const repoPath = path.join("docs", repo.basePath);
    await safeRmdir(repoPath);
  }
  
  // Remove the shared samples directory.
  const samplesPath = path.join("docs", "samples");
  await safeRmdir(samplesPath);
}

cleanImportedFiles()
  .then(() => console.log("Clean complete!"))
  .catch((err) => console.error("Clean encountered an error:", err));
