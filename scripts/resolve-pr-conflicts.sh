#!/usr/bin/env bash
set -euo pipefail

# Resolve known Hexa-Control PR conflicts by keeping the current branch version
# for feature files while still completing merge with the base branch.
#
# Usage:
#   ./scripts/resolve-pr-conflicts.sh origin/main
#
# Optional second arg:
#   --theirs  -> keep incoming branch versions for listed files
#   --ours    -> keep current branch versions for listed files (default)

BASE_REF="${1:-origin/main}"
STRATEGY="${2:---ours}"

if [[ "$STRATEGY" != "--ours" && "$STRATEGY" != "--theirs" ]]; then
  echo "Invalid strategy: $STRATEGY (use --ours or --theirs)"
  exit 1
fi

FILES=(
  "README.md"
  "src/features/dashboard/pages/DashboardPage.tsx"
  "src/features/database/pages/DatabasePage.tsx"
  "src/features/fivem/pages/FivemPage.tsx"
  "src/features/screen/pages/ScreenPage.tsx"
  "src/features/servers/pages/ServersPage.tsx"
  "src/features/ssh/pages/SshPage.tsx"
  "src/features/ufw/pages/UfwPage.tsx"
  "src/services/mockData.ts"
  "src/store/useHexaStore.ts"
)

echo "Merging $BASE_REF ..."
git merge "$BASE_REF" || true

if ! git diff --name-only --diff-filter=U | grep -q .; then
  echo "No merge conflicts detected."
  exit 0
fi

for file in "${FILES[@]}"; do
  if git diff --name-only --diff-filter=U | grep -Fxq "$file"; then
    if [[ "$STRATEGY" == "--ours" ]]; then
      git checkout --ours -- "$file"
    else
      git checkout --theirs -- "$file"
    fi
    git add "$file"
    echo "Resolved $file using $STRATEGY"
  fi
done

if git diff --name-only --diff-filter=U | grep -q .; then
  echo "There are still unresolved conflicts in other files:"
  git diff --name-only --diff-filter=U
  exit 1
fi

git commit -m "chore: resolve merge conflicts for Hexa-Control feature pages"
echo "Merge conflicts resolved and committed."
