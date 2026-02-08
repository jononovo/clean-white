import { execSync } from "child_process";

async function buildAll() {
  console.log("building Next.js app...");
  execSync("npx next build", { stdio: "inherit" });
  console.log("Build complete!");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
