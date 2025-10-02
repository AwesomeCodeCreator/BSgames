// Enhanced game database with support for multiple game technologies
// Game types: flash (swf via Ruffle), html5 (iframe), unity (WebGL), external (iframe to external site)

const gameDatabase = {
    // === FLASH/RUFFLE GAMES (Original) ===
    'bomber-at-war-1': {
        title: 'Bomber At War 1',
        swfFile: 'games/bomber_at_war.swf',
        image: 'images/bomberatwar1.png',
        description: 'Original strategic bombing game',
        plays: 67,
        rating: 4.0,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'bomber-at-war-2': {
        title: 'Bomber At War 2',
        swfFile: 'games/bombatwar.swf',
        image: 'images/bomberatwar2.png',
        description: 'Strategic bombing game set in WWII',
        plays: 156,
        rating: 4.2,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'warfare-1917': {
        title: 'Warfare 1917',
        swfFile: 'games/warfare1917.swf',
        image: 'images/warfare1917.png',
        description: 'WWI trench warfare strategy game',
        plays: 243,
        rating: 4.5,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'warfare-1944': {
        title: 'Warfare 1944',
        swfFile: 'games/warfare1944.swf',
        image: 'images/warfare1944.png',
        description: 'WWII tactical warfare game',
        plays: 189,
        rating: 4.3,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'swords-and-sandals': {
        title: 'Swords And Sandals',
        swfFile: 'games/sands.swf',
        image: 'images/swordsandsandles.png',
        description: 'Gladiator arena combat game',
        plays: 201,
        rating: 4.1,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'sands-of-coliseum': {
        title: 'Sands of the Coliseum',
        swfFile: 'games/coliseum.swf',
        image: 'images/spqr.png',
        description: 'Epic Roman gladiator battles',
        plays: 134,
        rating: 4.4,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'learn-to-fly-1': {
        title: 'Learn to Fly 1',
        swfFile: 'games/learntofly.swf',
        image: 'images/learntofly1.png',
        description: 'Help a penguin learn to fly',
        plays: 312,
        rating: 4.6,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'learn-to-fly-2': {
        title: 'Learn to Fly 2',
        swfFile: 'games/learntofly2.swf',
        image: 'images/learntofly2.png',
        description: 'The penguin returns with more upgrades',
        plays: 287,
        rating: 4.7,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'learn-to-fly-3': {
        title: 'Learn to Fly 3',
        swfFile: 'games/learntofly3.swf',
        image: 'images/learntofly3.png',
        description: 'Reach space in this epic sequel',
        plays: 198,
        rating: 4.5,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'hex-empire': {
        title: 'Hex Empire',
        swfFile: 'games/hexempire.swf',
        image: 'images/hexempire.png',
        description: 'Turn-based strategy conquest game',
        plays: 145,
        rating: 4.2,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'bloons-td5': {
        title: 'Bloons Tower Defense 5',
        swfFile: 'games/btd5.swf',
        image: 'images/btd5.png',
        description: 'The ultimate tower defense game',
        plays: 412,
        rating: 4.8,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'age-of-war-2': {
        title: 'Age of War 2',
        swfFile: 'games/ageofwar2.swf',
        image: 'images/ageofwar2.png',
        description: 'Evolution-based strategy warfare',
        plays: 223,
        rating: 4.4,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'fly-simulation': {
        title: 'Fly Simulation',
        swfFile: 'games/flysimulation.swf',
        image: 'images/flysimulation.png',
        description: 'Experience life as a fly',
        plays: 89,
        rating: 3.8,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'learn-to-fly-idle': {
        title: 'Learn to Fly Idle',
        swfFile: 'games/learntoflyidle.swf',
        image: 'images/learntoflyidle.png',
        description: 'Idle clicker version of the classic',
        plays: 167,
        rating: 4.0,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'papas-pizzeria': {
        title: "Papa's Pizzeria",
        swfFile: 'games/papaspizzeria.swf',
        image: 'images/papaspizzeria.png',
        description: 'Manage your own pizza restaurant',
        plays: 334,
        rating: 4.3,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'awesome-tanks-2': {
        title: 'Awesome Tanks 2',
        swfFile: 'games/awesometanks2.swf',
        image: 'images/awesometanks2.png',
        description: 'Tank combat with upgrades',
        plays: 276,
        rating: 4.5,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'stick-war-legacy': {
        title: 'Stick War Legacy',
        swfFile: 'games/stickwarlegacy.swf',
        image: 'images/stickwarlegacy.png',
        description: 'Command stick figure armies',
        plays: 298,
        rating: 4.4,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'stick-war-2': {
        title: 'Stick War 2',
        swfFile: 'games/stickwar2.swf',
        image: 'images/stickwar2.png',
        description: 'Epic stick figure warfare sequel',
        plays: 312,
        rating: 4.6,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'endless-war-5': {
        title: 'Endless War 5',
        swfFile: 'games/endlesswar5.swf',
        image: 'images/endlesswar5.png',
        description: 'Allied Campaign - WWII battles',
        plays: 145,
        rating: 4.2,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'endless-war-6': {
        title: 'Endless War 6',
        swfFile: 'games/endlesswar6.swf',
        image: 'images/endlesswar6.png',
        description: 'Soviet Campaign - Eastern Front',
        plays: 132,
        rating: 4.1,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'endless-war-7': {
        title: 'Endless War 7',
        swfFile: 'games/endlesswar7.swf',
        image: 'images/endlesswar7.png',
        description: 'Axis Campaign - WWII strategy',
        plays: 128,
        rating: 4.0,
        featured: false,
        width: '800px',
        height: '600px'
    },

    // === EXTERNAL IFRAME GAMES (Original) ===
    'basket-bros': {
        title: 'Basket Bros',
        externalUrl: 'https://freegamesonlinee.github.io/basket-bros/',
        image: 'images/basketbros.png',
        description: 'Multiplayer basketball madness',
        plays: 523,
        rating: 4.7,
        featured: true,
        width: '1000px',
        height: '800px'
    },
    'crazy-cattle-3d': {
        title: 'Crazy Cattle 3D',
        externalUrl: 'https://nealfun.app/crazy-cattle-3d/',
        image: 'images/crazycattle.png',
        description: '3D cattle herding adventure',
        plays: 467,
        rating: 4.6,
        featured: true,
        width: '1000px',
        height: '800px'
    },
    'fnaf': {
        title: 'Five Nights at Freddys',
        externalUrl: 'https://scratch.mit.edu/projects/217319757/embed',
        image: 'images/fnaf.png',
        description: 'Survive five nights of horror',
        plays: 892,
        rating: 4.8,
        featured: true,
        width: '1000px',
        height: '800px'
    },

    // === HTML5 GAMES ===
    '1v1lol': {
        title: '1v1.LOL',
        html5Path: 'games/html5/1v1lol/index.html',
        image: 'images/1v1lol.png',
        description: 'Fast-paced 1v1 building and shooting game',
        controls: 'WASD to move, Mouse to aim/shoot, Q/E/R/F to build',
        plays: 0,
        rating: 4.5,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'amongus': {
        title: 'Among Us',
        html5Path: 'games/html5/amongus/index.html',
        image: 'images/amongus.png',
        description: 'Social deduction game - find the impostor',
        controls: 'Mouse to interact, Arrow keys to move',
        plays: 0,
        rating: 4.6,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'appel': {
        title: 'Appel',
        html5Path: 'games/html5/appel/index.html',
        image: 'images/appel.png',
        description: 'Puzzle platformer adventure game',
        controls: 'Arrow keys to move, Space to jump',
        plays: 0,
        rating: 4.2,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'basketbros': {
        title: 'Basket Bros',
        html5Path: 'games/html5/basketbros/index.html',
        image: 'images/basketbros.png',
        description: 'Arcade basketball game with friends',
        controls: 'Arrow keys to move, Space to shoot',
        plays: 0,
        rating: 4.4,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'breakout': {
        title: 'Breakout',
        html5Path: 'games/html5/breakout/index.html',
        image: 'images/breakout.png',
        description: 'Classic brick-breaking arcade game',
        controls: 'Mouse to move paddle',
        plays: 0,
        rating: 4.0,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'burritobison': {
        title: 'Burrito Bison',
        html5Path: 'games/html5/burritobison/index.html',
        image: 'images/burritobison.png',
        description: 'Launch and bouncing adventure game',
        controls: 'Mouse to click and launch',
        plays: 0,
        rating: 4.3,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'cookieclicker': {
        title: 'Cookie Clicker',
        html5Path: 'games/html5/cookieclicker/index.html',
        image: 'images/cookieclicker.png',
        description: 'The ultimate idle clicking game',
        controls: 'Mouse to click cookies and buy upgrades',
        plays: 0,
        rating: 4.7,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'cubefield': {
        title: 'Cubefield',
        html5Path: 'games/html5/cubefield/index.html',
        image: 'images/cubefield.png',
        description: 'Navigate through a field of cubes',
        controls: 'Arrow keys to steer',
        plays: 0,
        rating: 4.1,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'digdug': {
        title: 'Dig Dug',
        html5Path: 'games/html5/digdug/index.html',
        image: 'images/digdug.png',
        description: 'Classic arcade digging and monster game',
        controls: 'Arrow keys to move, Space to pump',
        plays: 0,
        rating: 4.2,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'fbwg': {
        title: 'Fireboy and Watergirl',
        html5Path: 'games/html5/fbwg/index.html',
        image: 'images/fbwg.png',
        description: 'Cooperative puzzle platformer',
        controls: 'WASD for Fireboy, Arrow keys for Watergirl',
        plays: 0,
        rating: 4.5,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'flappybird': {
        title: 'Flappy Bird',
        html5Path: 'games/html5/flappybird/index.html',
        image: 'images/flappybird.png',
        description: 'Tap to fly through pipes',
        controls: 'Space or click to flap',
        plays: 0,
        rating: 4.0,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'galaga': {
        title: 'Galaga',
        html5Path: 'games/html5/galaga/index.html',
        image: 'images/galaga.png',
        description: 'Classic space shooter arcade game',
        controls: 'Arrow keys to move, Space to shoot',
        plays: 0,
        rating: 4.4,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'gettingoverit': {
        title: 'Getting Over It',
        html5Path: 'games/html5/gettingoverit/index.html',
        image: 'images/gettingoverit.png',
        description: 'Frustrating climbing game with a hammer',
        controls: 'Mouse to move hammer',
        plays: 0,
        rating: 4.3,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'impossiblequiz': {
        title: 'The Impossible Quiz',
        html5Path: 'games/html5/impossiblequiz/index.html',
        image: 'images/impossiblequiz.png',
        description: 'Challenging quiz with trick questions',
        controls: 'Mouse to click answers',
        plays: 0,
        rating: 4.2,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'run3': {
        title: 'Run 3',
        html5Path: 'games/html5/run3/index.html',
        image: 'images/run3.png',
        description: 'Endless running through space tunnels',
        controls: 'Arrow keys to move and jump',
        plays: 0,
        rating: 4.5,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'shellshockers': {
        title: 'Shell Shockers',
        html5Path: 'games/html5/shellshockers/index.html',
        image: 'images/shellshockers.png',
        description: 'Multiplayer egg shooting game',
        controls: 'WASD to move, Mouse to aim and shoot',
        plays: 0,
        rating: 4.4,
        featured: true,
        width: '800px',
        height: '600px'
    },
    'snake-html5': {
        title: 'Snake Classic',
        html5Path: 'games/html5/snake/index.html',
        image: 'images/snake.png',
        description: 'Classic snake game rebuilt in HTML5',
        controls: 'Arrow keys to move',
        plays: 0,
        rating: 4.2,
        featured: false,
        width: '600px',
        height: '600px'
    },
    'tetris-html5': {
        title: 'Tetris',
        html5Path: 'games/html5/tetris/index.html',
        image: 'images/tetris.png',
        description: 'The classic block-stacking puzzle game',
        controls: 'Arrow keys to move/rotate, Space to drop',
        plays: 0,
        rating: 4.5,
        featured: false,
        width: '400px',
        height: '600px'
    },
    'thereisnogame': {
        title: 'There Is No Game',
        html5Path: 'games/html5/thereisnogame/index.html',
        image: 'images/thereisnogame.png',
        description: 'Meta puzzle game that breaks the fourth wall',
        controls: 'Mouse to interact with everything',
        plays: 0,
        rating: 4.6,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'townscaper': {
        title: 'Townscaper',
        html5Path: 'games/html5/townscaper/index.html',
        image: 'images/townscaper.png',
        description: 'Relaxing town building game',
        controls: 'Mouse to build and create',
        plays: 0,
        rating: 4.3,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'underrun': {
        title: 'Underrun',
        html5Path: 'games/html5/underrun/index.html',
        image: 'images/underrun.png',
        description: 'Cyberpunk hacking adventure',
        controls: 'Arrow keys to move, Space to interact',
        plays: 0,
        rating: 4.2,
        featured: false,
        width: '800px',
        height: '600px'
    },
    'uno': {
        title: 'UNO',
        html5Path: 'games/html5/uno/index.html',
        image: 'images/uno.png',
        description: 'Classic card matching game',
        controls: 'Mouse to play cards',
        plays: 0,
        rating: 4.4,
        featured: false,
        width: '800px',
        height: '600px'
    },

    // === UNITY WEBGL GAMES ===
    'slope': {
        title: 'Slope',
        unityData: 'games/html5/slope/Build/slope.json',
        unityLoader: 'games/html5/slope/TemplateData/UnityProgress.js',
        image: 'images/slope.png',
        description: 'High-speed 3D endless runner',
        controls: 'A/D or Arrow keys to steer',
        plays: 0,
        rating: 4.6,
        featured: true,
        width: '960px',
        height: '600px'
    },
    'subwaysurfers': {
        title: 'Subway Surfers',
        unityData: 'games/html5/subwaysurfers/Build/subway.json',
        unityLoader: 'games/html5/subwaysurfers/UnityLoader.2019.2.js',
        image: 'images/subwaysurfers.png',
        description: 'Endless runner through subway tracks',
        controls: 'Arrow keys to move, Space to activate hoverboard',
        plays: 0,
        rating: 4.7,
        featured: true,
        width: '960px',
        height: '600px'
    },
    'deathrun3d': {
        title: 'Deathrun 3D',
        unityData: 'games/unity/deathrun3d/Build/death_run_wasm_v1.json',
        unityLoader: 'games/unity/deathrun3d/Build/UnityLoader.js',
        image: 'images/deathrun3d.png',
        description: 'Dangerous 3D obstacle course runner',
        controls: 'Arrow keys to move and jump',
        plays: 0,
        rating: 4.4,
        featured: false,
        width: '960px',
        height: '600px'
    }
};

// Helper function to get game by ID
function getGameById(id) {
    return gameDatabase[id] || null;
}

// Helper function to get all games
function getAllGames() {
    return Object.keys(gameDatabase).map(id => ({
        id: id,
        ...gameDatabase[id]
    }));
}

// Helper function to get featured games
function getFeaturedGames() {
    return getAllGames().filter(game => game.featured);
}

// Helper function to get popular games (sorted by plays)
function getPopularGames(limit = 10) {
    return getAllGames()
        .sort((a, b) => b.plays - a.plays)
        .slice(0, limit);
}

// Helper function to get games by type
function getGamesByType(type) {
    return getAllGames().filter(game => {
        switch(type) {
            case 'flash':
                return game.swfFile && !game.externalUrl;
            case 'html5':
                return game.html5Path;
            case 'unity':
                return game.unityData;
            case 'external':
                return game.externalUrl;
            default:
                return false;
        }
    });
}

// Helper function to search games
function searchGames(query) {
    const lowercaseQuery = query.toLowerCase();
    return getAllGames().filter(game =>
        game.title.toLowerCase().includes(lowercaseQuery) ||
        (game.description && game.description.toLowerCase().includes(lowercaseQuery))
    );
}

// Helper function to increment play count
function incrementPlayCount(gameId) {
    if (gameDatabase[gameId]) {
        gameDatabase[gameId].plays++;
        // In a real app, you'd save this to localStorage or a backend
        localStorage.setItem(`game_plays_${gameId}`, gameDatabase[gameId].plays);
    }
}

// Load saved play counts from localStorage on startup
function loadSavedPlayCounts() {
    Object.keys(gameDatabase).forEach(id => {
        const savedPlays = localStorage.getItem(`game_plays_${id}`);
        if (savedPlays) {
            gameDatabase[id].plays = parseInt(savedPlays);
        }
    });
}

// Initialize on load
if (typeof window !== 'undefined') {
    loadSavedPlayCounts();
}