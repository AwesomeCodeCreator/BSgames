# CLAUDE.md - Project-Specific Instructions for BSgames

## 🔴 MANDATORY: Test Commands - RUN EVERY TIME AFTER CHANGES

### Quick Test Suite (RUN THIS AFTER ANY MODIFICATION):
```bash
# 1. Start server (if not already running)
cd /mnt/c/Users/treyaris/Desktop/BSgames && python3 -m http.server 8000

# 2. Open test interface in browser
# http://localhost:8000/test-games.html

# 3. Test critical pages
# - Homepage: http://localhost:8000/
# - Random game: http://localhost:8000/game.html?id=cookieclicker
# - Test page: http://localhost:8000/test-games.html

# 4. Check games count (MUST be 42)
grep -c "title:" games.js  # Should return 42

# 5. Verify no broken links
ls games/*.swf | wc -l     # Should return 21
```

### IMPORTANT: After ANY code changes:
1. **ALWAYS** run the test commands above
2. **ALWAYS** check the browser console (F12) for errors
3. **ALWAYS** test at least one game from each category (Flash, HTML5, Unity, External)
4. **NEVER** commit without testing first

## Running the Local Server

### From Windows (Command Prompt or PowerShell):
```bash
# Navigate to project directory
cd C:\Users\treyaris\Desktop\BSgames

# Start Python server (Windows)
python -m http.server 8000
```

### From WSL (Windows Subsystem for Linux):
```bash
# Navigate to project directory through WSL mount
cd /mnt/c/Users/treyaris/Desktop/BSgames

# Start Python server (Linux)
S
```

## Testing URLs

Once server is running, open browser and go to:

### Main Site
- http://localhost:8000/

### Test All Games Page
- http://localhost:8000/test-games.html

### Game Player (supports all game types: Flash, HTML5, Unity, External)
- http://localhost:8000/game.html?id=cookieclicker
- http://localhost:8000/game.html?id=slope
- http://localhost:8000/game.html?id=amongus
- http://localhost:8000/game.html?id=bomber-at-war-2

### Test Popular New HTML5 Games
- http://localhost:8000/game.html?id=cookieclicker
- http://localhost:8000/game.html?id=amongus
- http://localhost:8000/game.html?id=slope
- http://localhost:8000/game.html?id=subwaysurfers
- http://localhost:8000/game.html?id=flappybird
- http://localhost:8000/game.html?id=tetris-html5

## Important File Locations

- **Games Database**: `games.js` (now contains all games: Flash, HTML5, Unity, External)
- **Game Player**: `game.html` (now supports all game types automatically)
- **Flash Games**: `/games/*.swf`
- **HTML5 Games**: `/games/html5/*/`
- **Unity Games**: `/games/unity/*/`
- **Thumbnails**: `/images/*.png`

## CRITICAL: Games Database Management

**NEVER CREATE NEW games.js FILES!** Always use the main `games.js` file located at the project root.

- **Single Source of Truth**: `/mnt/c/Users/treyaris/Desktop/BSgames/games.js`
- **No Variants**: Never create games-enhanced.js, games-backup.js, games-fixed.js, etc.
- **Always Edit Main File**: All game additions, modifications, and updates go in the main games.js
- **Backup Location**: Backup files moved to `/backup-games-js/` directory
- **Why**: Multiple games.js files cause confusion, cache issues, and inconsistent game displays

## CRITICAL: Project Rules & Guidelines

**Project Type**: Personal offline game website for Flash (.swf) games with HTML5 support

### Flash Game Implementation Rules:
- **Ruffle Emulator**: All Flash games use Ruffle (Rust-based Flash Player replacement)
- **Loading Method**: Games MUST be loaded through `<ruffle-embed>` elements, NOT direct iframe links
- **Direct SWF Links**: Will cause browsers to download files instead of running them
- **External Ruffle**: Loaded from `https://unpkg.com/@ruffle-rs/ruffle`
- **WebAssembly**: Ruffle converts Flash content to WebAssembly for browser compatibility

### File Structure Rules:
- **Flash Games**: `/games/*.swf` - Contains all .swf game files
- **HTML5 Games**: `/games/html5/*/` - Contains ported HTML5 games from nano-main
- **Unity Games**: `/games/unity/*/` - Contains Unity WebGL games
- **Thumbnails**: `/images/` - Contains game thumbnails (.png/.jpg)
- **Main Database**: `games.js` - ONLY file for game definitions
- **Game Player**: `game.html` - Universal player for all game types

### Navigation Rules:
- **Search/Games Links**: Only enabled when 15+ games (currently enabled - 48 games)
- **Homepage**: Dynamic loading from games.js database
- **Game URLs**: Format `game.html?id=GAMEID` for all games

## Common Issues

### 404 Error
- Make sure you're in the correct directory before starting server
- On Windows: Use `python` not `python3`
- On WSL/Linux: Use `python3` not `python`

### Games Not Loading
- Check browser console (F12) for errors
- Verify game files exist in correct folders
- Make sure using correct game ID in URL

## Quick Commands

### Windows Quick Start:
```cmd
cd C:\Users\treyaris\Desktop\BSgames && python -m http.server 8000
```

### WSL Quick Start:
```bash
cd /mnt/c/Users/treyaris/Desktop/BSgames && python3 -m http.server 8000
```

## Project Structure
```
BSgames/
├── index.html              # Homepage with dynamic game loading
├── game.html              # Universal game player (Flash, HTML5, Unity, External)
├── test-games.html        # Game testing interface
├── games.js               # SINGLE games database (42 games total)
├── TODO.md                # Project status and development notes
├── CLAUDE.md              # Instructions for Claude (this file)
├── save                   # Genie save command (project state tracking)
├── load                   # Genie load command (project state display)
├── scripts/
│   ├── project-save.js   # Complete save implementation (459 lines)
│   └── project-load.js   # Complete load implementation (332 lines)
├── docs/project/          # Genie tracking files
│   ├── session-context.md      # Session tracking
│   ├── todo.json               # Task management
│   ├── projects.json           # Project metadata
│   ├── .save-load-config.json  # Genie configuration
│   └── */logs/                 # Archive directories
├── games/
│   ├── *.swf             # Flash games (21 games)
│   ├── html5/            # HTML5 games (24 games from nano)
│   └── unity/            # Unity WebGL games
├── images/               # Game thumbnails (.png/.jpg)
├── genie/                # Genie deployment system
├── nano-main/            # Original nano repository
├── backup-games-js/      # Backup/old games.js variants
├── archive-docs/         # Archived guides and documentation
└── archive-html/         # Archived/unused HTML files
```

## Current Website Structure & Status

### Game Library Status:
- **Total Games**: 42 high-quality games fully integrated and working
- **Flash Games**: 21 games via Ruffle emulator (.swf files)
- **HTML5 Games**: 8 games from nano-main integration (quality filtered)
- **Unity Games**: 1 game (Death Run 3D)
- **Google Games**: 10 external Google Doodle games (baseball, snake, pac-man, etc.)
- **External Games**: 2 iframe games (Basket Bros, Crazy Cattle 3D)
- **Navigation**: Search and Games links enabled (15+ games threshold met)
- **Homepage**: Dynamic loading showing all games with popularity sorting

### Website Pages & Functionality:
- **Homepage (`index.html`)**:
  - Dynamic game grid loaded from games.js
  - Shows games by popularity (configurable: popular, featured, rated, all)
  - Search functionality with real-time filtering
  - Yellow/black theme with responsive design

- **Game Player (`game.html`)**:
  - Universal player supporting all game types automatically
  - Detects game type from games.js (swfFile, externalUrl, etc.)
  - Fullscreen support with ESC key exit
  - Navigation breadcrumbs back to homepage

- **Test Interface (`test-games.html`)**:
  - Lists all 48 games with statistics
  - Filter by game type (Flash, HTML5, Unity, External)
  - Click to test games in new tabs
  - Game count and type breakdown

### Game Database Structure (`games.js`):
```javascript
const gameDatabase = {
    'game-id': {
        title: 'Game Title',
        swfFile: 'games/file.swf',           // For Flash games
        externalUrl: 'games/html5/game/',   // For HTML5/External games
        image: 'images/game.jpg',
        description: 'Game description',
        plays: 123,                         // For popularity sorting
        rating: 4.5,                        // Out of 5 stars
        featured: true                      // Boolean for featured games
    }
};
```

## Technical Implementation Details

### Game Loading System:
- **Flash Games**: Loaded via Ruffle `<ruffle-embed>` elements from .swf files
- **HTML5 Games**: Loaded via iframe from `/games/html5/gamename/index.html`
- **External Games**: Loaded via iframe from external URLs
- **Automatic Detection**: JavaScript detects game type based on games.js properties
- **Universal Player**: Single game.html handles all game types seamlessly

### Performance & Compatibility:
- **Ruffle Integration**: External CDN `https://unpkg.com/@ruffle-rs/ruffle`
- **Browser Support**: Modern browsers with WebAssembly support
- **Mobile Compatibility**: Responsive design with touch controls
- **Caching**: Browser cache management with cache-busting headers
- **Error Handling**: Graceful fallbacks for failed game loads

### Known Issues & Limitations:
- **Stick War 2**: Has positioning issues (game appears off-center)
- **Mobile Flash**: Some Flash games may have touch control limitations
- **External Dependencies**: Relies on external Ruffle CDN availability
- **File Size**: Large game files may affect loading times on slow connections

### Development Features:
- **Debug Mode**: Console logging for game loading diagnostics
- **Test Interface**: Comprehensive game testing and statistics
- **Hot Reload**: Changes to games.js reflect immediately
- **Cache Busting**: Prevents browser caching issues during development

## Key Files to Never Modify
- **games.js**: Single source of truth for all game data
- **index.html**: Homepage with dynamic game grid
- **game.html**: Universal game player for all game types

## Maintenance Commands
```bash
# Start development server
cd /mnt/c/Users/treyaris/Desktop/BSgames
python3 -m http.server 8000

# Test all games
curl -s "http://localhost:8000/test-games.html"

# Check games database integrity
grep -c "title:" games.js  # Should return 42
ls games/html5/ | wc -l    # Should return 24 (directories, but only 8 games used)
ls games/*.swf | wc -l     # Should return 21 (Flash games)
grep -c "google-" games.js # Should return 10 (Google games)

# Verify project structure
ls -la | grep -E "\\.html|\\.js|\\.md"  # Should show only essential files

# Genie Save/Load System
./save                     # Save current project state and track changes
./load                     # Display project status and recent activity
```

## Genie Save/Load System

### Purpose & Features:
- **Project State Tracking**: Automatically tracks file changes, git status, and project evolution
- **Session Management**: Maintains context of work sessions with timestamps
- **Auto-Archiving**: Archives logs when they exceed configured thresholds (300/400 lines)
- **Git Integration**: Includes security hooks to prevent committing secrets
- **Zero Dependencies**: Self-contained implementation with no external requirements

### Usage:
```bash
./save    # Saves current state:
         # - Tracks file changes
         # - Updates session context
         # - Records git status
         # - Archives old logs if needed

./load    # Displays project status:
         # - Current git branch and changes
         # - Recent session activity
         # - Project statistics
         # - Configuration status
```

### Generated Files:
- `save` & `load` - Command wrappers (executable)
- `scripts/project-save.js` - Complete save implementation (459 lines)
- `scripts/project-load.js` - Complete load implementation (332 lines)
- `docs/project/session-context.md` - Session tracking file
- `docs/project/todo.json` - Task management data
- `docs/project/projects.json` - Project metadata
- `docs/project/.save-load-config.json` - Configuration file

## Operational Procedures

### Adding New Games:
1. **ONLY edit games.js** - Never create new games database files
2. **Add game files** to appropriate directory (`/games/`, `/games/html5/`, etc.)
3. **Add thumbnail** to `/images/` directory (preferably .jpg format)
4. **Update games.js** with new game entry following existing format
5. **Test thoroughly** using test-games.html interface

## Game Implementation Guide

This section provides detailed instructions for implementing different types of games in the BSgames website.

### 1. Flash Games (.swf) Implementation

**Requirements:**
- `.swf` file (Flash game file)
- Game thumbnail image (300x200px recommended, .png or .jpg)
- Ruffle emulator (already integrated via CDN)

**Step-by-Step Process:**

1. **Copy SWF file to games directory:**
   ```bash
   cp /path/to/game.swf /mnt/c/Users/treyaris/Desktop/BSgames/games/
   ```

2. **Add or create thumbnail image:**
   ```bash
   # Place in images directory with descriptive name
   cp /path/to/thumbnail.png /mnt/c/Users/treyaris/Desktop/BSgames/images/gamename.png

   # Or create placeholder thumbnail:
   convert -size 300x200 -background "#87CEEB" -fill "#2F4F4F" \
           -font DejaVu-Sans-Bold -pointsize 24 -gravity center \
           label:"Game\nName" /mnt/c/Users/treyaris/Desktop/BSgames/images/gamename.png
   ```

3. **Add entry to games.js:**
   ```javascript
   'game-id': {
       title: 'Game Title',
       swfFile: 'games/game.swf',           // Path to SWF file
       image: 'images/gamename.png',        // Thumbnail path
       description: 'Game description here',
       plays: 0,                            // Initial play count
       rating: 4.0,                         // Rating out of 5
       featured: false                      // Featured status
   }
   ```

4. **Test the game:**
   ```bash
   # Start server
   python3 -m http.server 8000

   # Visit: http://localhost:8000/game.html?id=game-id
   # Check browser console (F12) for errors
   ```

**Technical Details:**
- Flash games are loaded via `<ruffle-embed>` elements (NOT iframes)
- Ruffle converts Flash/SWF to WebAssembly for modern browser compatibility
- Games display at 800x600px by default in game.html
- Fullscreen mode automatically scales to viewport

### 2. HTML5 Games Implementation

**Requirements:**
- HTML5 game folder with `index.html` entry point
- Game assets (JavaScript, CSS, images, sounds)
- Game thumbnail image

**Directory Structure:**
```
/games/html5/gamename/
├── index.html          # Main entry point (REQUIRED)
├── *.js               # JavaScript game files
├── *.css              # Stylesheets
├── img/               # Images directory (optional)
├── assets/            # Assets directory (optional)
└── snd/               # Sounds directory (optional)
```

**Step-by-Step Process:**

1. **Create game directory:**
   ```bash
   mkdir -p /mnt/c/Users/treyaris/Desktop/BSgames/games/html5/gamename
   ```

2. **Copy game files to directory:**
   ```bash
   # Copy entire game folder contents
   cp -r /path/to/game/* /mnt/c/Users/treyaris/Desktop/BSgames/games/html5/gamename/

   # Verify index.html exists
   ls /mnt/c/Users/treyaris/Desktop/BSgames/games/html5/gamename/index.html
   ```

3. **Add thumbnail image:**
   ```bash
   cp /path/to/thumbnail.png /mnt/c/Users/treyaris/Desktop/BSgames/images/gamename.png
   ```

4. **Add entry to games.js:**
   ```javascript
   'game-id': {
       title: 'Game Title',
       externalUrl: 'games/html5/gamename/index.html',  // Path to index.html
       image: 'images/gamename.png',
       description: 'HTML5 game description',
       plays: 0,
       rating: 4.0,
       featured: false
   }
   ```

5. **Test the game:**
   ```bash
   # Test game directly
   # Visit: http://localhost:8000/games/html5/gamename/index.html

   # Test via game player
   # Visit: http://localhost:8000/game.html?id=game-id
   ```

**Technical Details:**
- HTML5 games load in an iframe at 1000x800px
- Game must be self-contained (all assets relative to index.html)
- No external dependencies should be required
- Cross-origin restrictions apply for external resources

**Common HTML5 Game Examples:**
- **Cookie Clicker**: `/games/html5/cookieclicker/`
- **Plants vs Zombies**: `/games/html5/pvz/`
- **Among Us**: `/games/html5/amongus/`
- **Slope**: `/games/html5/slope/`

### 3. Unity WebGL Games Implementation

**Requirements:**
- Unity WebGL build folder
- Build/ directory with Unity loader and .wasm files
- index.html from Unity export
- Game thumbnail image

**Unity Build Directory Structure:**
```
/games/unity/gamename/
├── index.html              # Unity-generated entry point
├── Build/
│   ├── UnityLoader.js     # Unity loader script
│   ├── *.wasm.code.unityweb
│   ├── *.wasm.framework.unityweb
│   ├── *.data.unityweb
│   └── *.json
├── TemplateData/          # Unity template resources
└── img/                   # Optional images
```

**Step-by-Step Process:**

1. **Export game from Unity:**
   - In Unity Editor: File → Build Settings
   - Select "WebGL" platform
   - Click "Build" and export to a folder
   - Unity will generate all required files

2. **Copy Unity build to games directory:**
   ```bash
   # Copy entire Unity WebGL build
   cp -r /path/to/unity-build /mnt/c/Users/treyaris/Desktop/BSgames/games/unity/gamename

   # Verify structure
   ls /mnt/c/Users/treyaris/Desktop/BSgames/games/unity/gamename/
   # Should show: index.html, Build/, TemplateData/
   ```

3. **Add thumbnail image:**
   ```bash
   cp /path/to/thumbnail.png /mnt/c/Users/treyaris/Desktop/BSgames/images/gamename.png
   ```

4. **Add entry to games.js:**
   ```javascript
   'game-id': {
       title: 'Unity Game Title',
       externalUrl: 'games/unity/gamename/index.html',  // Path to Unity index.html
       image: 'images/gamename.png',
       description: 'Unity WebGL game description',
       plays: 0,
       rating: 4.0,
       featured: false
   }
   ```

5. **Test the game:**
   ```bash
   # Test Unity build directly
   # Visit: http://localhost:8000/games/unity/gamename/index.html

   # Test via game player
   # Visit: http://localhost:8000/game.html?id=game-id
   ```

**Technical Details:**
- Unity games use WebAssembly (.wasm) for performance
- UnityLoader.js initializes the game engine
- Games load in iframe at 1000x800px
- May require WebGL 2.0 support in browser
- Larger file sizes (typical: 2-10MB)

**Unity Game Example:**
- **Death Run 3D**: `/games/unity/deathrun3d/`

### 4. External/Iframe Games Implementation

**Requirements:**
- External game URL (must be HTTPS and allow iframe embedding)
- Game thumbnail image
- Verify CORS policy allows embedding

**Step-by-Step Process:**

1. **Verify game URL is embeddable:**
   ```bash
   # Check if site allows iframe embedding
   curl -I https://example.com/game/ | grep -i "x-frame-options"
   # Should NOT return "DENY" or "SAMEORIGIN"
   ```

2. **Add thumbnail image:**
   ```bash
   cp /path/to/thumbnail.png /mnt/c/Users/treyaris/Desktop/BSgames/images/gamename.png
   ```

3. **Add entry to games.js:**
   ```javascript
   'game-id': {
       title: 'External Game Title',
       externalUrl: 'https://example.com/game/',  // Full external URL
       image: 'images/gamename.png',
       description: 'External game description',
       plays: 0,
       rating: 4.0,
       featured: false
   }
   ```

4. **Test the game:**
   ```bash
   # Visit: http://localhost:8000/game.html?id=game-id
   # Check for CORS errors in browser console
   ```

**Technical Details:**
- External games load in iframe at 1000x800px
- Site must not block iframe embedding (X-Frame-Options)
- HTTPS required for security
- External site downtime affects game availability

**External Game Examples:**
- **Basket Bros**: `https://freegamesonlinee.github.io/game/basket-bros/`
- **Crazy Cattle 3D**: `https://nealfun.app/game/crazycattle3d/`

### Game Type Detection (Automatic)

The `game.html` player automatically detects game type based on games.js properties:

```javascript
// Game type detection logic in game.html:
if (currentGame.externalUrl) {
    // Load as iframe (HTML5, Unity, or External)
    iframe.src = currentGame.externalUrl;
} else if (currentGame.swfFile) {
    // Load as Flash game via Ruffle
    embed.setAttribute('src', currentGame.swfFile);
}
```

### Testing Checklist

After adding any game type:

- [ ] Game loads without errors in browser console (F12)
- [ ] Game displays correctly at intended resolution
- [ ] Fullscreen mode works (for applicable games)
- [ ] Reload button functions properly
- [ ] Game appears in test-games.html list
- [ ] Game appears on homepage (if plays > 0 or featured)
- [ ] Thumbnail displays correctly
- [ ] Game plays smoothly without lag

### Troubleshooting

**Flash Games:**
- **Not loading**: Check Ruffle CDN is accessible, verify .swf file path
- **Black screen**: Wait 3-5 seconds for Ruffle initialization
- **Controls not working**: Some Flash games have keyboard/mouse compatibility issues

**HTML5 Games:**
- **404 errors**: Verify index.html exists in game directory
- **Assets not loading**: Check all paths are relative, not absolute
- **Blank iframe**: Check browser console for JavaScript errors

**Unity Games:**
- **Slow loading**: Unity games are large (2-10MB), wait for full download
- **WebGL errors**: Browser must support WebGL 2.0
- **Black screen**: Check Build/ folder contains all .unityweb files

**External Games:**
- **Refused to connect**: Site blocks iframe embedding (X-Frame-Options)
- **CORS errors**: External site doesn't allow cross-origin requests
- **Blank page**: External URL may be incorrect or site is down

### Emergency Fixes:
- **Cache Issues**: Add cache-busting headers to HTML files
- **Games Not Loading**: Check browser console for JavaScript errors
- **Database Corruption**: Restore from `/backup-games-js/` directory
- **Missing Files**: Check file paths match games.js entries exactly

### Project Status Verification:
- **Homepage**: Should show all 48 games dynamically
- **Navigation**: Search and Games links should be active
- **Game Player**: Should handle all game types (Flash, HTML5, External)
- **Test Interface**: Should list 48 games with proper categorization

### Folder Organization Rules:
- **Keep Clean Root**: Only essential files in project root
- **Use Archives**: Old/backup files go in `archive-*` folders
- **Maintain Structure**: Never reorganize core game directories
- **Document Changes**: Update CLAUDE.md for any structural changes