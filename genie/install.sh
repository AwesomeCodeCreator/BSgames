#!/bin/bash

# Genie One-Command Installer
# Author: TEDDYMEGACORP
# Usage: bash install.sh
# Or: curl -sL https://example.com/install-save-load.sh | bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
RESET='\033[0m'

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${CYAN}${BOLD}"
echo "╔════════════════════════════════════════════╗"
echo "║   Universal Save/Load Installation        ║"
echo "║          Based on AAE-Bot Prime           ║"
echo "╚════════════════════════════════════════════╝"
echo -e "${RESET}"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed${RESET}"
    echo "Please install Node.js (version 14 or higher) and try again"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo -e "${YELLOW}⚠️  Node.js version 14 or higher recommended${RESET}"
    echo "Current version: $(node -v)"
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Not in a git repository${RESET}"
    read -p "Initialize git repository? (Y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        git init
        echo -e "${GREEN}✅ Git repository initialized${RESET}"
    fi
fi

# Run the Node.js deployer
echo -e "\n${CYAN}Starting deployment...${RESET}\n"

if [ -f "$SCRIPT_DIR/bin/deploy.js" ]; then
    # Running from the genie directory
    node "$SCRIPT_DIR/bin/deploy.js"
else
    # Try to find deploy.js in common locations
    if [ -f "%HOME/user/genie/bin/deploy.js" ]; then
        node "%HOME/user/genie/bin/deploy.js"
    else
        echo -e "${RED}❌ Could not find deploy.js${RESET}"
        echo "Please ensure the genie package is properly installed"
        exit 1
    fi
fi

# Check if deployment was successful
if [ -f "./save" ] && [ -f "./load" ]; then
    echo -e "\n${GREEN}${BOLD}✅ Installation Complete!${RESET}"
    echo -e "\n${CYAN}Quick Test:${RESET}"
    echo -e "  Try running: ${BOLD}./save${RESET}"
    echo -e "  Then run: ${BOLD}./load${RESET}"
    echo ""
else
    echo -e "\n${RED}❌ Installation may have failed${RESET}"
    echo "Check the output above for errors"
    exit 1
fi