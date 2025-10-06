const gameDatabase = {
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
    'sands-of-coliseum': {
        title: 'Sands of the Coliseum',
        swfFile: 'games/coliseum.swf',
        image: 'images/spqr.png',
        description: 'Roman gladiator management game',
        plays: 134,
        rating: 3.9,
        featured: false
    },
    'learn-to-fly-1': {
        title: 'Learn to Fly 1',
        swfFile: 'games/ltf1.swf',
        image: 'images/ltf1.png',
        description: 'Penguin flying physics game',
        plays: 312,
        rating: 4.6,
        featured: true
    },
    'learn-to-fly-2': {
        title: 'Learn to Fly 2',
        swfFile: 'games/ltf2.swf',
        image: 'images/ltf2.png',
        description: 'Enhanced penguin flying adventure',
        plays: 287,
        rating: 4.7,
        featured: true
    },
    'learn-to-fly-3': {
        title: 'Learn to Fly 3',
        swfFile: 'games/ltf3.swf',
        image: 'images/ltf3.png',
        description: 'Advanced penguin flying simulator',
        plays: 198,
        rating: 4.4,
        featured: false
    },
    'ltf-idle': {
        title: 'Learn to Fly Idle',
        swfFile: 'games/learntoflyidle.swf',
        image: 'images/ltfidle.png',
        description: 'Idle version of the Learn to Fly series',
        plays: 234,
        rating: 4.3,
        featured: false
    },
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
    'hex-empire': {
        title: 'Hex Empire',
        swfFile: 'games/Hex-Empire.swf',
        image: 'images/hexempire.png',
        description: 'Strategic hex-based empire building game',
        plays: 45,
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
    'age-of-war-2': {
        title: 'Age of War 2',
        swfFile: 'games/age-of-war-2-5933395b.swf',
        image: 'images/ageofwar2.png',
        description: 'Epic strategy defense game through the ages',
        plays: 15,
        rating: 4.4,
        featured: false
    },
    'fly-simulation': {
        title: 'Fly Simulation',
        swfFile: 'games/fly_simulation.swf',
        image: 'images/flysimulation.png',
        description: 'Realistic flying simulation game',
        plays: 112,
        rating: 3.9,
        featured: false
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
    'cookieclicker': {
        title: 'Cookie Clicker',
        externalUrl: 'games/html5/cookieclicker/index.html',
        image: 'images/cookieclicker.jpg',
        description: 'The ultimate idle clicking game',
        plays: 267,
        rating: 4.7,
        featured: true
    },
    'pvz': {
        title: 'Plants vs. Zombies',
        externalUrl: 'games/html5/pvz/index.html',
        image: 'images/pvz.png',
        description: 'Defend your home from zombies with an army of plants - 252+ levels!',
        plays: 0,
        rating: 4.7,
        featured: true,
        width: 900,
        height: 600
    },
    'amongus': {
        title: 'Among Us',
        externalUrl: 'games/html5/amongus/index.html',
        image: 'images/amongus.jpg',
        description: 'Social deduction game',
        plays: 198,
        rating: 4.6,
        featured: true
    },
    'slope': {
        title: 'Slope',
        externalUrl: 'games/html5/slope/index.html',
        image: 'images/slope.jpg',
        description: 'High-speed 3D endless runner',
        plays: 154,
        rating: 4.6,
        featured: true
    },
    'run3': {
        title: 'Run 3',
        externalUrl: 'games/html5/run3/index.html',
        image: 'images/run3.png',
        description: 'Endless running through space tunnels',
        plays: 189,
        rating: 4.5,
        featured: true
    },
    'deathrun3d': {
        title: 'Death Run 3D',
        externalUrl: 'games/unity/deathrun3d/index.html',
        image: 'images/deathrun3d.jpg',
        description: 'Challenging 3D obstacle course runner',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'fbwg': {
        title: 'Fireboy and Watergirl',
        externalUrl: 'games/html5/fbwg/index.html',
        image: 'images/fbwg.jpg',
        description: 'Cooperative puzzle platformer adventure',
        plays: 132,
        rating: 4.4,
        featured: true
    },
    'subwaysurfers': {
        title: 'Subway Surfers',
        externalUrl: 'games/html5/subwaysurfers/index.html',
        image: 'images/subwaysurfers.jpg',
        description: 'Endless running through subway tracks',
        plays: 145,
        rating: 4.5,
        featured: true
    },
    'thereisnogame': {
        title: 'There Is No Game',
        externalUrl: 'games/html5/thereisnogame/index.html',
        image: 'images/thereisnogame.jpg',
        description: 'Interactive puzzle that breaks the fourth wall',
        plays: 0,
        rating: 4.3,
        featured: false
    },
    'townscaper': {
        title: 'Townscaper',
        externalUrl: 'games/html5/townscaper/index.html',
        image: 'images/townscaper.jpg',
        description: 'Relaxing town building and design game',
        plays: 0,
        rating: 4.4,
        featured: false
    },
    'underrun': {
        title: 'Underrun',
        externalUrl: 'games/html5/underrun/index.html',
        image: 'images/underrun.jpg',
        description: 'Retro-style space corridor shooter',
        plays: 0,
        rating: 4.2,
        featured: false
    },
    'penguin-diner': {
        title: 'Penguin Diner',
        swfFile: 'games/penguin_diner.swf',
        image: 'images/penguindiner.png',
        description: 'Serve hungry penguins at your diner in Antarctica',
        plays: 0,
        rating: 4.3,
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