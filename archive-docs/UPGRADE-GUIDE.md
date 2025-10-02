# BSgames Multi-Technology Upgrade Guide

## Overview
This guide helps you upgrade your BSgames website to support HTML5 and Unity WebGL games while maintaining your efficient single-page dynamic structure.

## New Features
- **Multi-technology support**: Flash (Ruffle), HTML5, Unity WebGL, and External games
- **Automatic game type detection**: System automatically detects and loads games based on their configuration
- **Enhanced game information**: Display technology badges, controls, and descriptions
- **Maintained efficiency**: Keep your single-page dynamic loading system

## File Structure

```
BSgames/
├── game-enhanced.html        # New enhanced game player (test version)
├── games-enhanced.js          # New enhanced game database
├── games/
│   ├── *.swf                 # Your existing Flash games
│   ├── html5/                # NEW: HTML5 games folder
│   │   └── snake/
│   │       └── index.html
│   └── unity/                # NEW: Unity WebGL games folder
│       └── [game-name]/
│           ├── Build/
│           │   ├── *.json
│           │   ├── *.js
│           │   └── *.data
│           └── index.html
└── images/                    # Game thumbnails
```

## Migration Steps

### Step 1: Test the Enhanced System
1. Keep your current `game.html` and `games.js` intact
2. Test with the new files:
   - Use `game-enhanced.html` instead of `game.html`
   - Use `games-enhanced.js` instead of `games.js`

### Step 2: Add HTML5 Games
For each HTML5 game, add to `games-enhanced.js`:
```javascript
'game-id': {
    title: 'Game Title',
    html5Path: 'games/html5/game-folder/index.html',
    image: 'images/game-thumbnail.png',
    description: 'Game description',
    controls: 'Keyboard/mouse controls info',
    width: '800px',
    height: '600px',
    plays: 0,
    rating: 4.5,
    featured: false
}
```

### Step 3: Add Unity WebGL Games
For Unity games, you need:
1. Export from Unity as WebGL build
2. Place build files in `games/unity/[game-name]/`
3. Add to `games-enhanced.js`:
```javascript
'game-id': {
    title: 'Game Title',
    unityData: 'games/unity/game/Build/game.json',
    unityLoader: 'games/unity/game/Build/UnityLoader.js',
    image: 'images/game-thumbnail.png',
    description: 'Game description',
    controls: 'WASD to move, etc',
    width: '960px',
    height: '600px',
    plays: 0,
    rating: 4.5,
    featured: false
}
```

### Step 4: Update Your Homepage
In your `index.html`, update the game loading to use enhanced files:
```html
<script src="games-enhanced.js"></script>
```

And update game links to use enhanced player:
```javascript
window.location.href = `game-enhanced.html?id=${gameId}`;
```

## Game Type Configuration

### Flash Games (Existing)
```javascript
{
    title: 'Game Name',
    swfFile: 'games/game.swf',
    image: 'images/game.png',
    width: '800px',
    height: '600px'
}
```

### HTML5 Games
```javascript
{
    title: 'Game Name',
    html5Path: 'games/html5/game/index.html',
    image: 'images/game.png',
    width: '100%',
    height: '600px'
}
```

### Unity WebGL Games
```javascript
{
    title: 'Game Name',
    unityData: 'games/unity/game/Build/game.json',
    unityLoader: 'games/unity/game/Build/UnityLoader.js',
    image: 'images/game.png',
    width: '960px',
    height: '600px'
}
```

### External Games (Existing)
```javascript
{
    title: 'Game Name',
    externalUrl: 'https://example.com/game',
    image: 'images/game.png',
    width: '1000px',
    height: '800px'
}
```

## Benefits of This Approach

1. **Keep your structure**: No need to reorganize everything like nano-main
2. **Easy migration**: Test with enhanced files before replacing originals
3. **Backwards compatible**: All your existing Flash and external games still work
4. **Future-proof**: Ready for HTML5 and Unity games
5. **Single point of management**: Still just update `games.js` to add new games

## Testing Checklist

- [ ] Test existing Flash games with `game-enhanced.html`
- [ ] Test existing external iframe games
- [ ] Test the new HTML5 Snake game example
- [ ] Verify game type badges display correctly
- [ ] Check fullscreen works for all game types
- [ ] Confirm game info panel shows when available
- [ ] Test reload functionality for each game type

## Final Migration

Once testing is complete:
1. Backup current `game.html` as `game-original.html`
2. Backup current `games.js` as `games-original.js`
3. Rename `game-enhanced.html` to `game.html`
4. Rename `games-enhanced.js` to `games.js`
5. Update any remaining references

## Adding Popular HTML5/Unity Games

Here are some popular games you could add:

**HTML5 Games:**
- 2048
- Flappy Bird HTML5
- Pac-Man
- Space Invaders
- Tetris

**Unity WebGL Games:**
- Slope
- Subway Surfers
- Temple Run
- Crossy Road
- Stack

## Resources

- **HTML5 Game Sources**: GitHub, itch.io, CodePen
- **Unity WebGL Builds**: Unity Play, itch.io, GameDistribution
- **Game Assets**: OpenGameArt, Kenney.nl, itch.io

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify file paths are correct
3. Ensure Unity builds include all required files
4. Test games in isolation first before integrating

Remember: The enhanced system maintains your efficient single-page approach while adding support for modern game technologies!