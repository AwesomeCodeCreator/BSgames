const gameDatabase = {
    'bomber-at-war': {
        title: 'Bomber At War II',
        swfFile: 'games/bombatwar.swf',
        image: 'images/bomberatwar.png',
        description: 'Strategic bombing game set in WWII'
    },
    'warfare-1917': {
        title: 'Warfare 1917',
        swfFile: 'games/warfare1917.swf',
        image: 'images/warfare1917.png',
        description: 'WWI trench warfare strategy game'
    },
    'warfare-1944': {
        title: 'Warfare 1944',
        swfFile: 'games/warfare1944.swf',
        image: 'images/warfare1944.png',
        description: 'WWII tactical warfare game'
    },
    'swords-and-sandals': {
        title: 'Swords And Sandals',
        swfFile: 'games/sands.swf',
        image: 'images/swordsandsandles.png',
        description: 'Gladiator arena combat game'
    },
    'sands-of-coliseum': {
        title: 'Sands of the Coliseum',
        swfFile: 'games/coliseum.swf',
        image: 'images/spqr.png',
        description: 'Roman gladiator management game'
    },
    'peacekeeper': {
        title: 'The Peacekeeper',
        swfFile: 'games/peacemaker.swf',
        image: 'images/peacemaker.png',
        description: 'Strategic conflict resolution game'
    },
    'learn-to-fly-1': {
        title: 'Learn to Fly 1',
        swfFile: 'games/ltf1.swf',
        image: 'images/ltf1.png',
        description: 'Penguin flying physics game'
    },
    'learn-to-fly-2': {
        title: 'Learn to Fly 2',
        swfFile: 'games/ltf2.swf',
        image: 'images/ltf2.png',
        description: 'Enhanced penguin flying adventure'
    },
    'learn-to-fly-3': {
        title: 'Learn to Fly 3',
        swfFile: 'games/ltf3.swf',
        image: 'images/ltf3.png',
        description: 'Advanced penguin flying simulator'
    },
    'tu-95': {
        title: 'TU-95',
        swfFile: 'games/tu95.swf',
        image: 'images/tu95.png',
        description: 'Strategic bomber aircraft simulation'
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