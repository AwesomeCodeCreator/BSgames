# BS Company Games - Todo List

## Project Overview
Personal offline game hosting website for Flash (.swf) games using HTML/CSS/JavaScript with Ruffle Flash emulation.

## Current Project State
- ✅ Dynamic HTML structure with index.html and game.html
- ✅ Game database (games.js) with **21 games** configured and working
- ✅ **WORKING** Ruffle Flash emulator integration using RufflePlayer API
- ✅ Dynamic homepage with popularity tracking system (hidden until needed)
- ✅ Clean CSS styling with yellow/black theme
- ✅ Game images and SWF files organized in folders
- ✅ **FIXED** - Games load instantly through Ruffle emulator
- ✅ **FIXED** - Bottom white bar display issue resolved
- ✅ Fullscreen mode with exit button and ESC key support
- ✅ All working games integrated and tested
- ✅ Repository cleanup completed

## Important Notes for Claude
- **Project Type**: Personal offline game website hosted on GitHub
- **Flash Games**: Uses .swf files with Ruffle emulator for modern browser compatibility
- **CRITICAL - How Flash Games Work**: 
  - **Ruffle** is the main Flash emulator that powers all games on this site
  - Ruffle is a Rust-based Flash Player replacement that runs in modern browsers
  - Games must be loaded through `<ruffle-embed>` elements, NOT direct iframe links
  - Direct .swf file links cause browsers to download files instead of running them
  - Ruffle converts Flash content to WebAssembly for browser compatibility
- **File Structure**: 
  - `/games/` - Contains .swf game files
  - `/images/` - Contains game thumbnails
  - `/ruffle/` - Contains Ruffle Flash emulator files (local installation)
  - External Ruffle loaded from: `https://unpkg.com/@ruffle-rs/ruffle`
- **Current Issues**: 
  - Stick War 2 has positioning issues (game appears off-center)
  - Potential alternate ruffle-embed approach documented in alternate-framing.md
  - Search/Games navigation intentionally hidden until 15+ games threshold

---

## Current Objectives (Priority Order)

### 🔧 Critical Fixes - COMPLETED ✅
- [x] ~~**FIXED** - Flash game loading works with direct Ruffle API~~
- [x] ~~Added missing games from downloads folder~~
- [x] ~~All games now load instantly through Ruffle~~
- [x] ~~**FIXED** - Fullscreen working (native browser API with expected black bars)~~
- [x] ~~Fix invalid HTML structure in navigation (h1 nesting)~~
- [x] ~~Clean up git repository (handle deleted HTML files)~~

### 🎯 Core Features - COMPLETED ✅ 
- [x] ~~Implement functional Search feature~~ **HIDDEN until more games added**
- [x] ~~Create dedicated Games page/listing~~ **HIDDEN until more games added**
- [x] ~~Add proper error handling for failed game loads~~
- [x] ~~Add loading indicators for games~~
- [ ] Implement responsive design for mobile devices

### 📝 FUTURE FEATURES - TO RE-ENABLE WHEN NEEDED
**Re-enable Search & Games Tab when:**
- Game library reaches 15+ games 
- Users request search functionality
- Categories/genres are needed for organization

**To re-enable:** Uncomment navigation links in index.html and game.html:
```html
<!-- <li><a href="#" onclick="toggleSearch()">Search</a></li> -->
<!-- <li><a href="games.html">Games</a></li> -->
```

### ✨ Enhancement Features
- [ ] Add game categories/tags system
- [ ] Implement favorites/bookmark system
- [ ] Add game descriptions on hover/click
- [ ] Create game rating/review system
- [ ] Add fullscreen mode for games
- [ ] Implement keyboard shortcuts for navigation

---

## Future Objectives

### 🎮 Content Expansion
- [ ] Research and add more classic Flash games
- [ ] Organize games by genre/category
- [ ] Add HTML5 games support alongside Flash games
- [ ] Create game submission system for community additions

### 🎨 UI/UX Improvements
- [ ] Redesign with modern CSS Grid/Flexbox layout
- [ ] Add dark/light theme toggle
- [ ] Implement smooth animations and transitions
- [ ] Add game preview videos/GIFs
- [ ] Create better game detail pages

### 🔧 Technical Enhancements
- [ ] Add service worker for offline caching
- [ ] Implement lazy loading for images
- [ ] Add analytics tracking (if desired)
- [ ] Optimize for SEO (meta tags, structured data)
- [ ] Add PWA capabilities (manifest, install prompt)

### 📱 Platform Support
- [ ] Optimize mobile gaming experience
- [ ] Add touch controls documentation for mobile games
- [ ] Test cross-browser compatibility
- [ ] Add support for game saves/progress (if possible)

---

## Technical Debt
- [ ] Remove unused JavaScript code in index.html (XLSX-related functions)
- [ ] Standardize CSS class naming conventions
- [ ] Add proper error boundaries and fallbacks
- [ ] Implement proper build/deployment process
- [ ] Add linting and code formatting rules

---

## Testing & Quality Assurance
- [ ] Test all games functionality across browsers
- [ ] Verify responsive design on various screen sizes
- [ ] Check accessibility compliance (WCAG guidelines)
- [ ] Performance optimization (loading times, bundle size)
- [ ] Cross-platform compatibility testing

---

## Deployment & Maintenance
- [ ] Set up proper GitHub Pages deployment
- [ ] Create backup strategy for game files
- [ ] Document setup/maintenance procedures
- [ ] Monitor and update Ruffle emulator versions
- [ ] Regular security audits for dependencies

---

## Game Database Status
**Current games in database:** 23 games total

**Flash Games (SWF via Ruffle):**
1. Bomber At War II ✅ **WORKING**
2. Warfare 1917 ✅ **WORKING** 
3. Warfare 1944 ✅ **WORKING**
4. Swords And Sandals ✅ **WORKING**
5. Sands of the Coliseum ✅ **WORKING**
6. Learn to Fly 1 ✅ **WORKING**
7. Learn to Fly 2 ✅ **WORKING**
8. Learn to Fly 3 ✅ **WORKING**
9. Hex Empire ✅ **WORKING**
10. Bomber At War (Alternative) ✅ **WORKING**
11. Bloons Tower Defense 5 ✅ **WORKING**
12. Age of War 2 ✅ **WORKING**
13. Fly Simulation ✅ **WORKING**
14. Learn to Fly Idle ✅ **WORKING**
15. Papa's Pizzeria ✅ **WORKING**
16. Awesome Tanks 2 ✅ **WORKING**
17. Stick War Legacy ✅ **WORKING**
18. Stick War 2 ✅ **WORKING**
19. Endless War 5 - Allied Campaign ✅ **WORKING**
20. Endless War 6 - Soviet Campaign ✅ **WORKING**
21. Endless War 7 - Axis Campaign ✅ **WORKING**

**External Iframe Games:**
- Basket Bros ✅ **WORKING** (freegamesonlinee.github.io)
- Crazy Cattle 3D ✅ **WORKING** (nealfun.app)
- Five Nights at Freddys ✅ **WORKING** (scratch.mit.edu)

**Total**: 22 games configured and WORKING (19 SWF + 3 external iframe)

## Recent Major Changes Completed
- **Dynamic Homepage**: Converted from hardcoded HTML to dynamic game loading system
- **Game Library Expansion**: Added 9 new games (Papa's Pizzeria, Stick War series, BTD5, etc.)
- **Popularity System**: Built rating/play tracking system (hidden until needed)
- **Display Issues**: Fixed bottom white bar problem in game.html
- **Repository Management**: Removed broken games, cleaned up unused files
- **Alternate Framing**: Documented ruffle-embed approach for positioning issues

---

## Version History
### Version 1.02 - Current (2025-09-04)
**Major Refactor & Feature Implementation**
- ✅ Unified game system (replaced 23+ individual HTML files)
- ✅ Dynamic game loading with games.js database
- ✅ Search functionality (hidden until needed - uncomment when 15+ games)
- ✅ Dedicated Games page (hidden until needed - uncomment when 15+ games) 
- ✅ Loading indicators with animated spinner and error handling
- ✅ Repository cleanup and organization (committed all changes)
- ✅ **POPULAR GAMES RESTORED**: Basket Bros & Crazy Cattle 3D via external iframes
- ✅ Mixed game support: SWF (Ruffle) + External iframe games (1000x800px sizing)
- ✅ Fixed HTML validation issues and removed unused XLSX code
- ✅ Working fullscreen mode (native browser API with expected black bars)
- ✅ Proper thumbnails for all games including new external games
- ✅ Debug logging for troubleshooting game loading issues

### Version 1.00 - Previous Release
- Individual HTML files for each game
- Basic Flash game support via Ruffle
- Manual game loading system
- Included Basket Bros & Crazy Cattle 3D (most popular with testers)

---

## Game Acquisition Resources (for personal/educational use)
**Legitimate Sources for Flash Games:**
- **Internet Archive Flash Collection** - archive.org/details/softwarelibrary_flash
- **Newgrounds** - Many creators allow embedding/personal use
- **GitHub Flash Game Repos** - Search "flash-games" or "swf-games"  
- **BlueMaxima's Flashpoint** - Massive preservation project with 100k+ games
- **Open Source Game Collections** - Look for CC/MIT licensed games

**External Game Hosting (iframe-friendly):**
- **itch.io** - Indie games, many allow embedding
- **CrazyGames.com** - Provides embed codes for some games
- **Poki.com** - Some games allow iframe embedding
- **GitHub Pages game hosts** - Community-hosted game collections

**Note**: Current implementation uses games for personal/friend group only, non-commercial use from publicly available sources.

---

## Quick Commands Reference

**Start localhost server:**
```bash
cd /mnt/c/Users/treyaris/Desktop/BSgames
python3 -m http.server 8000
# Then go to: http://localhost:8000
```

**Download game with wget:**
```bash
cd /mnt/c/Users/treyaris/Desktop/BSgames/downloaded/
wget -r -np -k -E -p https://example.com/game-url
```

**Navigate to project in WSL:**
```bash
cd /mnt/c/Users/treyaris/Desktop/BSgames
# OR create alias:
alias games='cd /mnt/c/Users/treyaris/Desktop/BSgames'
```

**Hard refresh to clear cache:**
- `Ctrl+F5` or `Ctrl+Shift+R`

---

*Last Updated: 2025-09-04*
*Current Version: 1.02*
*Next Review: When implementing alternate framing or adding more games*

---

## ⚠️ IMPORTANT MAINTENANCE NOTE FOR CLAUDE
**ALWAYS UPDATE THIS FILE** when making significant changes to the project:
- Update game count in "Game Database Status" section
- Add new games to the numbered list
- Update "Current Project State" section  
- Update "Recent Major Changes Completed" section
- Update version number and last updated date
- Note any new issues or fixes in "Current Issues" section