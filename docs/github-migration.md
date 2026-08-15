# GitHub Repository Migration

## Target identity

The canonical repository for this site is intended to be:

- **Owner:** `BSGAMES2`
- **Repository:** `BSgames`
- **URL:** `https://github.com/BSGAMES2/BSgames`
- **Visibility:** Public
- **Default branch:** `main`

The historical repository `AwesomeCodeCreator/BSgames` is not the target for future pushes. Leave it unchanged until the new repository and deployment have been verified.

## Pre-push privacy gate

Run the following from the repository root before staging:

```bash
git status --short --untracked-files=all
git ls-files --others --exclude-standard
find . -type f \( -name '.env*' -o -iname '*secret*' -o -iname '*credential*' -o -iname '*.pem' -o -iname '*.key' \) -not -path './.git/*'
```

Review every result. Never publish credentials, private keys, OAuth state, local assistant settings, personal session data, or local-only automation configuration.

After staging, repeat the review against the staged snapshot:

```bash
git diff --cached --name-only
git diff --cached --stat
# Review staged text for credential markers without printing secret values.
git grep --cached -nI -E 'BEGIN .*PRIVATE KEY|AKIA[0-9A-Z]{16}|ghp_|github_pat_|client_secret|access_token|refresh_token' -- . || true
```

The repository contains third-party game files and media. Privacy safety does not establish redistribution permission; review attribution and licensing separately.

## Migration procedure

1. Authenticate GitHub CLI as `BSGAMES2` and verify the active account:

   ```bash
   gh auth login -h github.com
   gh auth status
   ```

2. Create the empty public repository:

   ```bash
   gh repo create BSGAMES2/BSgames --public --description "BS Company Games static web game portal"
   gh repo view BSGAMES2/BSgames --json nameWithOwner,isPrivate,defaultBranchRef
   ```

3. Confirm the repository owner is `BSGAMES2`, `isPrivate` is `false`, and the repository is empty before the first push.

4. Set the local remote and verify it before pushing:

   ```bash
   git remote set-url origin git@github.com:BSGAMES2/BSgames.git
   git remote -v
   ```

5. Preserve the existing `main` history. Do not use `--force`:

   ```bash
   git push -u origin main
   ```

6. Verify the remote history and branch:

   ```bash
   git ls-remote origin HEAD refs/heads/main
   gh repo view BSGAMES2/BSgames --web
   ```

7. Configure GitHub Pages from the `main` branch and repository root. No build command is required.

8. Test the deployed Pages URL using the smoke-test list in `docs/maintenance.md`.

## Failure and rollback

- If account verification fails, stop before repository creation or pushing.
- If the repository already exists with unexpected content, stop and review it; do not overwrite it.
- If the staged scan finds a real credential, remove it from the publish set and rotate it if it was ever exposed.
- If history contains a real secret, do not push preserved history; obtain approval for history rewriting or create a clean snapshot.
- If deployment fails, leave the old repository unchanged and repair the new repository/Pages configuration first.
