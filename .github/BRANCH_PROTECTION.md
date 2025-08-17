# Branch Protection Setup

## Recommended Branch Protection Rules

### Main Branch Protection
Configure these settings in GitHub Settings > Branches > Add rule:

**Branch name pattern:** `main`

**Protect matching branches:**
- [x] Require a pull request before merging
  - [x] Require approvals: 1
  - [x] Dismiss stale PR approvals when new commits are pushed
  - [x] Require review from code owners
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Required status checks:
    - `test` (from CI workflow)
    - `build` (from CI workflow)
- [x] Require conversation resolution before merging
- [x] Require signed commits
- [x] Include administrators
- [x] Allow force pushes: Never
- [x] Allow deletions: Never

### Auto-merge Configuration
For Dependabot PRs, enable auto-merge with these conditions:
- Status checks pass
- No conflicts
- Security updates: Auto-merge immediately
- Minor/patch updates: Auto-merge after 24 hours

## GitHub CLI Setup (Optional)
```bash
# Install GitHub CLI and authenticate
gh auth login

# Apply branch protection rules
gh api repos/javideros/toolbox/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test","build"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

## Benefits
- **Quality Assurance**: All changes go through CI/CD
- **Code Review**: Ensures integration patterns are followed
- **Security**: Prevents direct pushes to main branch
- **Automation**: Dependabot updates are safely automated