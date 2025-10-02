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

# 4. Check games count (MUST be 29)
grep -c "title:" games.js  # Should return 29

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
python3 -m http.server 8000
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
- **Search/Games Links**: Only enabled when 15+ games (currently enabled - 29 games)
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
├── games.js               # SINGLE games database (29 games total)
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
- **Total Games**: 29 high-quality games fully integrated and working
- **Flash Games**: 21 games via Ruffle emulator (.swf files)
- **HTML5 Games**: 6 games from nano-main integration (quality filtered)
- **Unity Games**: 1 game (Death Run 3D)
- **External Games**: 1 iframe game (Basket Bros)
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
  - Lists all 29 games with statistics
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

### Emergency Fixes:
- **Cache Issues**: Add cache-busting headers to HTML files
- **Games Not Loading**: Check browser console for JavaScript errors
- **Database Corruption**: Restore from `/backup-games-js/` directory
- **Missing Files**: Check file paths match games.js entries exactly

### Project Status Verification:
- **Homepage**: Should show all 29 games dynamically
- **Navigation**: Search and Games links should be active
- **Game Player**: Should handle all game types (Flash, HTML5, Unity, External)
- **Test Interface**: Should list 29 games with proper categorization

### Folder Organization Rules:
- **Keep Clean Root**: Only essential files in project root
- **Use Archives**: Old/backup files go in `archive-*` folders
- **Maintain Structure**: Never reorganize core game directories
- **Document Changes**: Update CLAUDE.md for any structural changes