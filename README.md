# BS Company Games

BS Company Games is a static browser game portal. It presents locally bundled Flash games through Ruffle, locally bundled HTML5/Unity games in the shared player, and explicitly external game links.

## Run locally

Windows PowerShell:
```powershell
cd %USERPROFILE%\Documents\BSgames
python -m http.server 8000
```

WSL:
```bash
cd /mnt/c/Users/<username>/Documents/BSgames
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Use `test-games.html` for catalog/type smoke tests. Games use `game.html?id=<catalog-id>`.

## Layout

- `index.html` — catalog homepage and search.
- `game.html` — shared player for Flash, local HTML5/Unity, and external content.
- `games.js` — single source of truth for catalog metadata.
- `games/` — bundled game files and assets.
- `images/` — thumbnails.
- `test-games.html` — catalog diagnostics and filters.
- `docs/maintenance.md` — validation and deployment procedures.
- `archive-*`, `backup-*`, and `nano-main/` — historical/vendor material, not active entry points.

## Adding a game

Add one unique entry to `games.js` with a title, explicit `type`, thumbnail, description, and path:

- `flash` uses `swfFile` and Ruffle.
- `html5` or `unity` uses local `localPath`.
- `external` uses `externalUrl` and is treated as untrusted third-party content.

Keep paths relative to the repository root. Do not create `games.js` variants.

## Canonical repository

The intended public repository is `https://github.com/BSGAMES2/BSgames`. Migration and publishing safeguards are documented in `docs/github-migration.md`.

## Deployment

This is a static site suitable for GitHub Pages. Publish the repository root; no build or package installation is required. Validate locally before publishing.

## Content and licensing

The repository contains third-party games, runtimes, and media. Verify source, redistribution permission, and availability before adding or publishing content. External games may change or stop allowing embedding.
