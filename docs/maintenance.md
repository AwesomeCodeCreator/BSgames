# Maintenance Guide

Repository ownership, privacy scanning, and the GitHub migration procedure are documented in `docs/github-migration.md`.

## Pre-release checklist

1. Run catalog validation and JavaScript syntax checks.
2. Start a local HTTP server and open the homepage.
3. Check `test-games.html` counts and filters.
4. Smoke-test one Flash, local HTML5, Unity when available, and external entry.
5. Test invalid IDs, Reload, Fullscreen, Search, and browser back navigation.
6. Check the browser console and verify no game files were removed.

## Validation

```bash
cd /mnt/c/Users/<username>/Documents/BSgames
node --check games.js
node --check scripts/project-save.js
node --check scripts/project-load.js
python3 - <<'PY'
import re
from pathlib import Path
s = Path('games.js').read_text()
ids = re.findall(r"^\s*'([^']+)'\s*:\s*\{", s, re.M)
print(f'catalog entries: {len(ids)}')
assert len(ids) == len(set(ids)), 'duplicate catalog IDs'
PY
```

The explicit `type` field is authoritative. Local paths must exist; external URLs require manual review.

## Game types

| Type | Player behavior |
| --- | --- |
| `flash` | Ruffle player for a local `.swf`. |
| `html5` | Local game entry point in an iframe. |
| `unity` | Local Unity WebGL entry point in an iframe. |
| `external` | Third-party URL with an external-content notice. |

Do not classify local paths as `externalUrl`.

## Hosting

Use a web server instead of `file://`; games rely on relative URL loading. GitHub Pages serves the same repository-root paths. Ruffle is loaded from a pinned unpkg version in `game.html`; test Flash games when changing it.

## Troubleshooting

- Blank game: confirm the catalog path and inspect the console for 404 or iframe policy errors.
- Flash failure: confirm the pinned Ruffle script loaded and test another SWF.
- Local HTML5/Unity blank: open its `localPath` directly and inspect its asset paths.
- External blank: the provider may block framing; use its URL directly in a new tab.
- Fullscreen failure: interact with the page first; browsers require a user gesture.

## Content safety

External entries are untrusted third-party content. Review URLs, never place credentials in query strings, and keep the external notice. Review provenance and redistribution rights for bundled games, media, and runtimes before public deployment.
