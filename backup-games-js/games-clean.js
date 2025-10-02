const gameDatabase = {
    'bomber-at-war-2': {
        title: 'Bomber At War 2',
        swfFile: 'games/bombatwar.swf',
        image: 'images/bomberatwar2.png',
        description: 'Strategic bombing game set in WWII',
        plays: 156,
        rating: 4.2,
        featured: true
    },
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
        description: 'Social deduction game',
        plays: 0,
        rating: 4.6,
        featured: true
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