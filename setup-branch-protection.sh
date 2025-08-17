#!/bin/bash
# Branch Protection Setup Script
# Run this after installing GitHub CLI: brew install gh

echo "Setting up branch protection for main branch..."

gh api repos/javideros/toolbox/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test","build"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null

echo "Branch protection rules applied successfully!"
echo "Main branch is now protected with:"
echo "- Required PR reviews (1 approval)"
echo "- Required status checks (test, build)"
echo "- Dismiss stale reviews on new commits"