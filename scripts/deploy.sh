#!/usr/bin/env bash
# Deploys the main branch to Cloudflare Pages (project: sigmediausa).
# Usage: npm run deploy   (or: bash scripts/deploy.sh)
set -euo pipefail

cd "$(dirname "$0")/.."

# Warn about uncommitted work — the deploy ships what's in the working tree
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠ Working tree has uncommitted changes; they WILL be included in the build."
fi

# Always deploy from main
current=$(git branch --show-current)
if [ "$current" != "main" ]; then
  echo "▸ Switching from '$current' to main"
  git checkout main
fi

echo "▸ Pulling latest main from origin"
git pull --ff-only origin main

# Install deps when node_modules is missing or lockfile changed since last install
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "▸ Installing dependencies (npm ci)"
  npm ci
fi

echo "▸ Removing old build"
rm -rf dist

echo "▸ Building"
npm run build

echo "▸ Deploying to Cloudflare Pages"
npx wrangler pages deploy dist --project-name=sigmediausa --branch=main --commit-dirty=true

echo "✔ Live at https://sigmediausa.pages.dev"
