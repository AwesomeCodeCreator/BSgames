#!/bin/bash

# Test script for Universal Save/Load Deployment System
# Tests deployment on different project types

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

DEPLOYER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEST_DIR="/tmp/save-load-tests-$(date +%s)"

echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${CYAN}  Universal Save/Load Deployment Tests${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}\n"

# Create test directory
mkdir -p "$TEST_DIR"
echo -e "Test directory: ${YELLOW}$TEST_DIR${RESET}\n"

# Test counter
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Test function
run_test() {
    local test_name=$1
    local project_type=$2
    local setup_function=$3

    ((TESTS_RUN++))
    echo -e "\n${CYAN}Test $TESTS_RUN: $test_name${RESET}"
    echo "────────────────────────────────────"

    # Create test project
    local project_dir="$TEST_DIR/$project_type-test"
    mkdir -p "$project_dir"
    cd "$project_dir"

    # Run setup
    $setup_function

    # Initialize git (required for deployment)
    git init --quiet
    git config user.name "Test User"
    git config user.email "test@example.com"

    # Run deployment
    echo -e "${YELLOW}Running deployment...${RESET}"
    if echo "Y" | node "$DEPLOYER_DIR/bin/deploy.js" > deployment.log 2>&1; then
        # Check if files were created
        if [ -f "./save" ] && [ -f "./load" ] &&
           [ -f "./scripts/project-save.js" ] && [ -f "./scripts/project-load.js" ] &&
           [ -f "./docs/project/session-context.md" ] && [ -f "./docs/project/todo.json" ]; then
            echo -e "${GREEN}✅ PASSED${RESET}: All files created successfully"

            # Test running save
            if ./save > /dev/null 2>&1; then
                echo -e "${GREEN}✅${RESET} Save command works"
            else
                echo -e "${RED}❌${RESET} Save command failed"
            fi

            # Test running load
            if ./load > /dev/null 2>&1; then
                echo -e "${GREEN}✅${RESET} Load command works"
            else
                echo -e "${RED}❌${RESET} Load command failed"
            fi

            ((TESTS_PASSED++))
        else
            echo -e "${RED}❌ FAILED${RESET}: Missing expected files"
            ls -la
            ((TESTS_FAILED++))
        fi
    else
        echo -e "${RED}❌ FAILED${RESET}: Deployment error"
        cat deployment.log
        ((TESTS_FAILED++))
    fi
}

# Setup functions for different project types
setup_aws_project() {
    cat > .env << 'EOF'
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=test
DATABASE_URL=postgresql://localhost/test
EOF

    cat > provision-lightsail.sh << 'EOF'
#!/bin/bash
echo "Mock provision script"
EOF
    chmod +x provision-lightsail.sh

    mkdir -p knowledge_base
    echo "Sample knowledge" > knowledge_base/test.txt
}

setup_react_project() {
    cat > package.json << 'EOF'
{
  "name": "test-react-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
EOF

    mkdir -p src public
    cat > src/App.js << 'EOF'
import React from 'react';
function App() {
  return <div>Test App</div>;
}
export default App;
EOF

    cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html><head><title>Test</title></head>
<body><div id="root"></div></body></html>
EOF
}

setup_node_api_project() {
    cat > package.json << 'EOF'
{
  "name": "test-api",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0"
  },
  "scripts": {
    "start": "node server.js"
  }
}
EOF

    cat > server.js << 'EOF'
const express = require('express');
const app = express();
app.listen(3000);
EOF

    mkdir -p routes controllers
    echo "module.exports = {};" > routes/index.js
}

setup_generic_project() {
    echo "# Test Project" > README.md
    mkdir -p src tests
    echo "console.log('test');" > src/index.js
}

# Run tests
run_test "AWS Cloud Project" "aws-cloud" setup_aws_project
run_test "React Application" "react-app" setup_react_project
run_test "Node.js API" "node-api" setup_node_api_project
run_test "Generic Project" "generic" setup_generic_project

# Summary
echo -e "\n${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${CYAN}  Test Summary${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "Tests Run:    ${TESTS_RUN}"
echo -e "Tests Passed: ${GREEN}${TESTS_PASSED}${RESET}"
echo -e "Tests Failed: ${RED}${TESTS_FAILED}${RESET}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}${BOLD}✅ All tests passed!${RESET}"
    EXITCODE=0
else
    echo -e "\n${RED}${BOLD}❌ Some tests failed${RESET}"
    EXITCODE=1
fi

# Cleanup option
echo -e "\n${YELLOW}Test files are in: $TEST_DIR${RESET}"
read -p "Remove test files? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    rm -rf "$TEST_DIR"
    echo -e "${GREEN}✅ Test files removed${RESET}"
fi

exit $EXITCODE