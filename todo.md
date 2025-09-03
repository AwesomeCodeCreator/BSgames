# BS Company Games - Todo List

## Project Overview
Personal offline game hosting website for Flash (.swf) games using HTML/CSS/JavaScript with Ruffle Flash emulation.

## Current Project State
- ✅ Basic HTML structure with index.html and game.html
- ✅ Game database (games.js) with 10 games configured
- ✅ **WORKING** Ruffle Flash emulator integration using direct API
- ✅ Basic CSS styling with yellow/black theme
- ✅ Game images and SWF files organized in folders
- ✅ **FIXED** - Games now load instantly through Ruffle (no more downloads!)
- ✅ **FIXED** - Game containers auto-fit to actual game dimensions
- ✅ Fullscreen mode with exit button and ESC key support
- ✅ All missing game files copied from Downloads folder
- ⚠️ **ISSUE**: Fullscreen stretching still not working properly
- ⚠️ Several HTML files deleted from git (shows in git status)

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
  - **URGENT**: Games still downloading .swf files instead of playing through Ruffle
  - Navigation links (Search/Games) are non-functional
  - HTML structure has some invalid nesting (h1 inside logo div)
  - TU-95 game missing thumbnail image (images/tu95.png)

---

## Current Objectives (Priority Order)

### 🔧 Critical Fixes - CURRENT
- [x] ~~**FIXED** - Flash game loading works with direct Ruffle API~~
- [x] ~~Added missing games from downloads folder~~
- [x] ~~All games now load instantly through Ruffle~~
- [ ] **FIX FULLSCREEN STRETCHING** - Games still show black bars instead of filling entire screen
- [ ] Fix invalid HTML structure in navigation (h1 nesting in index.html:140)
- [ ] Clean up git repository (handle deleted HTML files)

### 🎯 Core Features to Implement
- [ ] Implement functional Search feature
- [ ] Create dedicated Games page/listing
- [ ] Add proper error handling for failed game loads
- [ ] Add loading indicators for games
- [ ] Implement responsive design for mobile devices

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
Current games in database:
1. Bomber At War II ✅ **WORKING**
2. Warfare 1917 ✅ **WORKING** 
3. Warfare 1944 ✅ **WORKING**
4. Swords And Sandals ✅ **WORKING**
5. Sands of the Coliseum ✅ **WORKING**
6. The Peacekeeper ✅ **WORKING**
7. Learn to Fly 1 ✅ **WORKING**
8. Learn to Fly 2 ✅ **WORKING**
9. Learn to Fly 3 ✅ **WORKING**
10. TU-95 ✅ **WORKING** (placeholder image)

**Total**: 10 games configured and WORKING through Ruffle

## Recent Major Fixes Completed
- **Flash Loading Issue**: Switched from `<ruffle-embed>` tags to direct `RufflePlayer.createPlayer()` API
- **Download Problem**: Games no longer download .swf files - they load instantly in Ruffle
- **Missing Files**: Copied missing game files from Downloads folder
- **Container Sizing**: Games now auto-fit to their actual dimensions instead of fixed 800x600
- **Fullscreen Mode**: Added fullscreen toggle with exit button and ESC key support
- **User Experience**: Games load as fast as sites like CoolMathGames

---

*Last Updated: 2025-09-02*
*Next Review: When starting work on the project*