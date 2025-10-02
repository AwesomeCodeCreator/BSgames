#!/bin/bash

# Script to port games from nano-main to BSgames
# Usage: ./port-games.sh [game-name]

NANO_DIR="nano-main/games"
BSGAMES_HTML5_DIR="games/html5"
BSGAMES_UNITY_DIR="games/unity"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}BSgames Game Porter${NC}"
echo "====================="

# Function to port a single game
port_game() {
    local game_name=$1
    local source_dir="$NANO_DIR/$game_name"

    if [ ! -d "$source_dir" ]; then
        echo -e "${RED}Error: Game '$game_name' not found in nano-main${NC}"
        return 1
    fi

    echo -e "${YELLOW}Porting game: $game_name${NC}"

    # Determine game type
    if [ -f "$source_dir/Build/UnityLoader.js" ]; then
        # Unity WebGL game
        echo "Detected: Unity WebGL game"
        dest_dir="$BSGAMES_UNITY_DIR/$game_name"
    else
        # HTML5 game
        echo "Detected: HTML5 game"
        dest_dir="$BSGAMES_HTML5_DIR/$game_name"
    fi

    # Create destination directory
    mkdir -p "$dest_dir"

    # Copy game files (excluding preview folder)
    echo "Copying game files..."
    rsync -av --exclude='preview/' "$source_dir/" "$dest_dir/"

    # Copy thumbnail if it exists
    thumb_file="$NANO_DIR/libThumbs/${game_name}.jpg"
    if [ ! -f "$thumb_file" ]; then
        thumb_file="$NANO_DIR/libThumbs/${game_name}.png"
    fi

    if [ -f "$thumb_file" ]; then
        echo "Copying thumbnail..."
        cp "$thumb_file" "images/${game_name}.png"
    else
        echo -e "${YELLOW}Warning: No thumbnail found for $game_name${NC}"
    fi

    echo -e "${GREEN}✓ Game '$game_name' ported successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Add the game to games-enhanced.js with this structure:"
    echo ""

    if [ -f "$dest_dir/Build/UnityLoader.js" ]; then
        cat << EOF
'$game_name': {
    title: '${game_name^}',
    unityData: 'games/unity/$game_name/Build/[game].json',
    unityLoader: 'games/unity/$game_name/Build/UnityLoader.js',
    image: 'images/$game_name.png',
    description: 'Add description here',
    controls: 'Add controls here',
    width: '960px',
    height: '600px',
    plays: 0,
    rating: 4.0,
    featured: false
}
EOF
    else
        cat << EOF
'$game_name': {
    title: '${game_name^}',
    html5Path: 'games/html5/$game_name/index.html',
    image: 'images/$game_name.png',
    description: 'Add description here',
    controls: 'Add controls here',
    width: '800px',
    height: '600px',
    plays: 0,
    rating: 4.0,
    featured: false
}
EOF
    fi

    echo ""
    echo "2. Test the game at: http://localhost:8000/game-enhanced.html?id=$game_name"
}

# Function to list available games
list_games() {
    echo "Available games in nano-main:"
    echo "-----------------------------"
    ls -1 "$NANO_DIR" | grep -v "games.html" | grep -v "style.css" | grep -v "libThumbs"
}

# Main script logic
if [ "$1" == "--list" ]; then
    list_games
elif [ "$1" == "--all" ]; then
    echo "Porting all games (this may take a while)..."
    for game in $(ls -1 "$NANO_DIR" | grep -v "games.html" | grep -v "style.css" | grep -v "libThumbs"); do
        port_game "$game"
    done
elif [ -z "$1" ]; then
    echo "Usage: ./port-games.sh [game-name]"
    echo "       ./port-games.sh --list      (list available games)"
    echo "       ./port-games.sh --all       (port all games)"
    echo ""
    echo "Example: ./port-games.sh snake"
else
    port_game "$1"
fi