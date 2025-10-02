# Porting Games from nano-main to BSgames

## ⚠️ IMPORTANT LEGAL CONSIDERATIONS

Before porting any games, understand these critical points:

### 1. **Copyright & Licensing**
- **Most games are copyrighted** by their original creators
- Check each game for license files (LICENSE, README, credits)
- Many HTML5 remakes are fan-made and may not have clear licenses
- **Personal/educational use** is generally safer than public distribution
- If hosting publicly on GitHub Pages, you may face DMCA takedowns

### 2. **Safe Games to Port**
Games that are generally safe to port:
- **Open source games** with permissive licenses (MIT, Apache, GPL)
- **Classic arcade games** remade in HTML5 (often fall under fair use for education)
- **Games with explicit permission** or public domain status

### 3. **Games to Avoid**
- Commercial games or direct copies
- Games with "All Rights Reserved" notices
- Unity games that may contain proprietary assets
- Games from major publishers (even if found online)

## Technical Porting Process

### Quick Port Using Script

1. **List available games:**
```bash
./port-games.sh --list
```

2. **Port a specific game:**
```bash
./port-games.sh snake
./port-games.sh tetris
./port-games.sh flappybird
```

3. **Port all games (use with caution):**
```bash
./port-games.sh --all
```

### Manual Porting Process

#### For HTML5 Games:
1. Copy game folder from `nano-main/games/[game]/` to `games/html5/[game]/`
2. Remove the `preview/` folder (not needed)
3. Copy thumbnail from `nano-main/games/libThumbs/` to `images/`
4. Add to `games-enhanced.js`:

```javascript
'game-name': {
    title: 'Game Title',
    html5Path: 'games/html5/game-name/index.html',
    image: 'images/game-name.png',
    description: 'Game description',
    controls: 'Arrow keys to move, etc',
    width: '800px',
    height: '600px',
    plays: 0,
    rating: 4.0,
    featured: false
}
```

#### For Unity WebGL Games:
1. Copy entire game folder to `games/unity/[game]/`
2. Find the Unity build files (usually in `Build/` folder)
3. Add to `games-enhanced.js` with Unity-specific config

## Recommended Games to Port

### Simple HTML5 Games (Lower Risk)
These are typically remakes of classic games:
- **snake** - Classic arcade game
- **tetris** - Public domain gameplay concept
- **breakout** - Classic Atari-style game
- **flappybird** - Simple mechanics, many clones exist
- **galaga** - Classic arcade shooter

### More Complex HTML5 Games
- **cookieclicker** - Check for specific license
- **uno** - Card game remake (be cautious of trademark)
- **thereisnogame** - Unique puzzle game

### Unity WebGL Games (Higher Risk)
These often contain more complex assets:
- **slope** - Popular endless runner
- **subwaysurfers** - May contain copyrighted assets
- **1v1lol** - May have server dependencies

## Testing Ported Games

1. **Start local server:**
```bash
python3 -m http.server 8000
```

2. **Test the game:**
```
http://localhost:8000/game-enhanced.html?id=[game-name]
```

3. **Check for issues:**
- Missing assets (images, sounds)
- Broken paths (may need to adjust)
- Screen sizing issues
- Performance problems

## Common Issues & Fixes

### Issue: Game doesn't load
**Fix:** Check browser console for errors, usually missing files or wrong paths

### Issue: Game is too small/large
**Fix:** Adjust width/height in games-enhanced.js

### Issue: Assets not loading
**Fix:** Check if game uses relative paths that need updating

### Issue: Game requires server
**Fix:** Some games need specific server features or external APIs

## Batch Porting Example

To port several safe classic games:

```bash
# Port classic arcade games
for game in snake tetris breakout galaga digdug; do
    ./port-games.sh $game
done
```

## Adding Custom Metadata

After porting, enhance the game entry in `games-enhanced.js`:

```javascript
'tetris': {
    title: 'Tetris Classic',
    html5Path: 'games/html5/tetris/index.html',
    image: 'images/tetris.png',
    description: 'The classic block-stacking puzzle game',
    controls: '← → to move, ↑ to rotate, ↓ to soft drop, Space to hard drop',
    width: '400px',
    height: '600px',
    plays: 0,
    rating: 4.8,
    featured: true,
    // Additional metadata
    author: 'Community Remake',
    year: '2022',
    category: 'Puzzle'
}
```

## Attribution Best Practices

If you port games, consider adding attribution:

1. Create an `attributions.txt` file
2. List each game and its original source
3. Include any license information found
4. Add a credits section to your site

Example:
```
Snake - HTML5 remake by [author]
Tetris - Based on the classic game by Alexey Pajitnov
Flappy Bird - HTML5 tribute to the original by Dong Nguyen
```

## Safer Alternatives

Instead of porting, consider:

1. **Linking to external games** (like you do with Basket Bros)
2. **Creating your own HTML5 games**
3. **Using clearly licensed open-source games**
4. **Embedding games that provide embed codes**

## Final Recommendations

1. **Start with 2-3 classic games** (Snake, Tetris, Breakout)
2. **Test thoroughly** before adding more
3. **Keep originals** in nano-main folder as reference
4. **Document sources** for your records
5. **Be prepared to remove** games if requested

Remember: This is for personal/educational use. If planning public distribution, ensure you have proper rights or stick to clearly open-source games.