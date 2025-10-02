const gameDatabase = {
    // ORIGINAL FLASH GAMES
    'bomber-at-war-1': {
        title: 'Bomber At War 1',
        swfFile: 'games/bomber_at_war.swf',
        image: 'images/bomberatwar1.png',
        description: 'Original strategic bombing game',
        plays: 67,
        rating: 4.0,
        featured: false
    },
    'bomber-at-war-2': {
        title: 'Bomber At War 2',
        swfFile: 'games/bombatwar.swf',
        image: 'images/bomberatwar2.png',
        description: 'Strategic bombing game set in WWII',
        plays: 156,
        rating: 4.2,
        featured: true
    },
    'warfare-1917': {
        title: 'Warfare 1917',
        swfFile: 'games/warfare1917.swf',
        image: 'images/warfare1917.png',
        description: 'WWI trench warfare strategy game',
        plays: 243,
        rating: 4.5,
        featured: true
    },
    'warfare-1944': {
        title: 'Warfare 1944',
        swfFile: 'games/warfare1944.swf',
        image: 'images/warfare1944.png',
        description: 'WWII tactical warfare game',
        plays: 189,
        rating: 4.3,
        featured: false
    },
    'swords-and-sandals': {
        title: 'Swords And Sandals',
        swfFile: 'games/sands.swf',
        image: 'images/swordsandsandles.png',
        description: 'Gladiator arena combat game',
        plays: 201,
        rating: 4.1,
        featured: false
    },
    'btd5': {
        title: 'Bloons Tower Defense 5',
        swfFile: 'games/btd5.swf',
        image: 'images/btd5.png',
        description: 'Popular tower defense game with balloons',
        plays: 389,
        rating: 4.9,
        featured: true
    },
    'papas-pizzeria': {
        title: 'Papa\'s Pizzeria',
        swfFile: 'games/papaspizzeria_v2.swf',
        image: 'images/papaspizzeria.png',
        description: 'Run your own pizza restaurant in this time management cooking game',
        plays: 412,
        rating: 4.6,
        featured: true
    },
    'stick-war-2': {
        title: 'Stick War 2',
        swfFile: 'games/stickwar2.swf',
        image: 'images/stickwar2.png',
        description: 'Epic sequel to the original stick figure strategy warfare game',
        plays: 298,
        rating: 4.5,
        featured: false
    },

    // ORIGINAL EXTERNAL GAMES
    'basket-bros': {
        title: 'Basket Bros',
        externalUrl: 'https://freegamesonlinee.github.io/game/basket-bros/',
        image: 'images/basketbros.png',
        description: 'Fast-paced basketball arcade game',
        plays: 423,
        rating: 4.8,
        featured: true
    },
    'crazy-cattle-3d': {
        title: 'Crazy Cattle 3D',
        externalUrl: 'https://nealfun.app/game/crazycattle3d/',
        image: 'images/crazycattle.png',
        description: '3D cattle racing adventure game',
        plays: 356,
        rating: 4.5,
        featured: true
    },
    'fnaf1': {
        title: 'Five Nights at Freddys',
        externalUrl: 'https://scratch.mit.edu/projects/675553295/embed',
        image: 'images/fnaf1.png',
        description: 'Horror survival game - survive five nights',
        plays: 3,
        rating: 3.8,
        featured: false
    },

    // ALL NANO-MAIN HTML5 GAMES
    'cookieclicker': {
        title: 'Cookie Clicker',
        html5Path: 'games/html5/cookieclicker/index.html',
        image: 'images/cookieclicker.png',
        description: 'The ultimate idle clicking game',
        plays: 0,
        rating: 4.7,
        featured: true
    },
    'amongus': {
        title: 'Among Us',
        html5Path: 'games/html5/amongus/index.html',
        image: 'images/amongus.png',
        description: 'Social deduction game - find the impostor',
        plays: 0,
        rating: 4.6,
        featured: true
    },
    'slope': {
        title: 'Slope',
        html5Path: 'games/html5/slope/index.html',
        image: 'images/slope.png',
        description: 'High-speed 3D endless runner',
        plays: 0,
        rating: 4.6,
        featured: true
    },
    'subwaysurfers': {
        title: 'Subway Surfers',
        html5Path: 'games/html5/subwaysurfers/index.html',
        image: 'images/subwaysurfers.png',
        description: 'Endless runner through subway tracks',
        plays: 0,
        rating: 4.7,
        featured: true
    },
    '1v1lol': {
        title: '1v1.LOL',
        html5Path: 'games/html5/1v1lol/index.html',
        image: 'images/1v1lol.png',
        description: 'Fast-paced 1v1 building and shooting game',
        plays: 0,
        rating: 4.5,
        featured: true
    },
    'appel': {
        title: 'Appel',
        html5Path: 'games/html5/appel/index.html',
        image: 'images/appel.png',
        description: 'Puzzle platformer adventure game',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'basketbros-html5': {
        title: 'Basket Bros HTML5',
        html5Path: 'games/html5/basketbros/index.html',
        image: 'images/basketbros.png',
        description: 'Arcade basketball game with friends',
        plays: 0,
        rating: 4.4,
        featured: false
    },
    'breakout': {
        title: 'Breakout',
        html5Path: 'games/html5/breakout/index.html',
        image: 'images/breakout.png',
        description: 'Classic brick-breaking arcade game',
        plays: 0,
        rating: 4.0,
        featured: false
    },
    'burritobison': {
        title: 'Burrito Bison',
        html5Path: 'games/html5/burritobison/index.html',
        image: 'images/burritobison.png',
        description: 'Launch and bouncing adventure game',
        plays: 0,
        rating: 4.3,
        featured: false
    },
    'cubefield': {
        title: 'Cubefield',
        html5Path: 'games/html5/cubefield/index.html',
        image: 'images/cubefield.png',
        description: 'Navigate through a field of cubes',
        plays: 0,
        rating: 4.1,
        featured: false
    },
    'deathrun3d': {
        title: 'Deathrun 3D',
        html5Path: 'games/unity/deathrun3d/index.html',
        image: 'images/deathrun3d.png',
        description: 'Dangerous 3D obstacle course runner',
        plays: 0,
        rating: 4.4,
        featured: false
    },
    'digdug': {
        title: 'Dig Dug',
        html5Path: 'games/html5/digdug/index.html',
        image: 'images/digdug.png',
        description: 'Classic arcade digging and monster game',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'fbwg': {
        title: 'Fireboy and Watergirl',
        html5Path: 'games/html5/fbwg/index.html',
        image: 'images/fbwg.png',
        description: 'Cooperative puzzle platformer',
        plays: 0,
        rating: 4.5,
        featured: true
    },
    'flappybird': {
        title: 'Flappy Bird',
        html5Path: 'games/html5/flappybird/index.html',
        image: 'images/flappybird.png',
        description: 'Tap to fly through pipes',
        plays: 0,
        rating: 4.0,
        featured: false
    },
    'galaga': {
        title: 'Galaga',
        html5Path: 'games/html5/galaga/index.html',
        image: 'images/galaga.png',
        description: 'Classic space shooter arcade game',
        plays: 0,
        rating: 4.4,
        featured: false
    },
    'gettingoverit': {
        title: 'Getting Over It',
        html5Path: 'games/html5/gettingoverit/index.html',
        image: 'images/gettingoverit.png',
        description: 'Frustrating climbing game with a hammer',
        plays: 0,
        rating: 4.3,
        featured: false
    },
    'impossiblequiz': {
        title: 'The Impossible Quiz',
        html5Path: 'games/html5/impossiblequiz/index.html',
        image: 'images/impossiblequiz.png',
        description: 'Challenging quiz with trick questions',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'run3': {
        title: 'Run 3',
        html5Path: 'games/html5/run3/index.html',
        image: 'images/run3.png',
        description: 'Endless running through space tunnels',
        plays: 0,
        rating: 4.5,
        featured: true
    },
    'shellshockers': {
        title: 'Shell Shockers',
        html5Path: 'games/html5/shellshockers/index.html',
        image: 'images/shellshockers.png',
        description: 'Multiplayer egg shooting game',
        plays: 0,
        rating: 4.4,
        featured: true
    },
    'snake-html5': {
        title: 'Snake Classic',
        html5Path: 'games/html5/snake/index.html',
        image: 'images/snake.png',
        description: 'Classic snake game rebuilt in HTML5',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'tetris-html5': {
        title: 'Tetris HTML5',
        html5Path: 'games/html5/tetris/index.html',
        image: 'images/tetris.png',
        description: 'The classic block-stacking puzzle game',
        plays: 0,
        rating: 4.5,
        featured: false
    },
    'thereisnogame': {
        title: 'There Is No Game',
        html5Path: 'games/html5/thereisnogame/index.html',
        image: 'images/thereisnogame.png',
        description: 'Meta puzzle game that breaks the fourth wall',
        plays: 0,
        rating: 4.6,
        featured: false
    },
    'townscaper': {
        title: 'Townscaper',
        html5Path: 'games/html5/townscaper/index.html',
        image: 'images/townscaper.png',
        description: 'Relaxing town building game',
        plays: 0,
        rating: 4.3,
        featured: false
    },
    'underrun': {
        title: 'Underrun',
        html5Path: 'games/html5/underrun/index.html',
        image: 'images/underrun.png',
        description: 'Cyberpunk hacking adventure',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'uno': {
        title: 'UNO',
        html5Path: 'games/html5/uno/index.html',
        image: 'images/uno.png',
        description: 'Classic card matching game',
        plays: 0,
        rating: 4.4,
        featured: false
    }
};

function getGameById(gameId) {
    return gameDatabase[gameId] || null;
}

function getAllGames() {
    return Object.keys(gameDatabase).map(id => ({
        id,
        ...gameDatabase[id]
    }));
}

function getPopularGames(limit = 12) {
    return getAllGames()
        .sort((a, b) => b.plays - a.plays)
        .slice(0, limit);
}

function getFeaturedGames() {
    return getAllGames()
        .filter(game => game.featured)
        .sort((a, b) => b.rating - a.rating);
}

function getTopRatedGames(limit = 12) {
    return getAllGames()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

function getGamesByCategory(category) {
    return getAllGames().filter(game => game.category === category);
}