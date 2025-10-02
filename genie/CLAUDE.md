# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Genie is a deployment tool that generates complete, self-contained save/load implementations for other projects. It does NOT provide save/load functionality itself - it GENERATES customized implementations that get deployed to target projects.

## Core Architecture

### Three-Layer Template System

1. **Base Templates** (`templates/base/`): Complete 300+ line implementations with placeholders
   - `project-save.template.js`: Full save implementation with archiving logic
   - `project-load.template.js`: Full load/display implementation

2. **Feature Modules** (`templates/features/`): Project-type-specific enhancements
   - Each module exports: `projectFeatures`, `projectFeaturesDisplay`, `projectStatusLoaders`, `projectStatusDisplays`
   - Available types: aws-cloud, react-app, nextjs-app, node-api, python-ml, cli-tool, docker-project, generic

3. **Template Engine** (`utils/template-engine.js`): Combines base + features
   - Replaces placeholders with project-specific values
   - Injects feature-specific code blocks

### Module Communication Flow

```
bin/deploy.js (orchestrator)
    ├── utils/project-detector.js (analyzes target project)
    ├── utils/template-engine.js (generates scripts)
    └── utils/installer.js (deploys files)
```

Communication protocol:
- ProjectDetector returns: `{type, confidence, features, description}`
- TemplateEngine receives type → loads feature module → generates scripts
- Installer receives scripts → creates files with proper permissions

## Common Development Commands

### Deploy to a Project
```bash
# From target project directory
node /path/to/genie/bin/deploy.js

# Or using installer script (handles Node.js check)
bash /path/to/genie/install.sh
```

### Test Deployment
```bash
# Test specific project type deployment
./test/test-deployment.sh aws-cloud /tmp/test-project
./test/test-deployment.sh react-app /tmp/test-project
./test/test-deployment.sh node-api /tmp/test-project
```

### Run Deployment Without Installation
```bash
# Direct execution from any project
cd /your/target/project
node ~/genie/bin/deploy.js
```

## Adding New Project Types

1. **Create Feature Module** in `templates/features/[type].js`:
```javascript
module.exports = {
  projectFeatures: '// Feature detection code',
  projectFeaturesDisplay: '// Display code for save command',
  projectStatusLoaders: '// Status loading code for load command',
  projectStatusDisplays: '// Status display code for load command'
};
```

2. **Add Detection Method** in `utils/project-detector.js`:
```javascript
detectYourType() {
  let score = 0;
  const features = [];

  // Check for type-specific files/patterns
  if (this.hasFile('your-indicator-file')) {
    score += 30;
    features.push('indicator found');
  }

  return {
    type: 'your-type',
    score,
    confidence: Math.min(score / 100, 1),
    features,
    description: 'Your project type description'
  };
}
```

3. **Update Detection Runner** in `runAllDetections()` method
4. **Add Configuration** in `config/defaults.json` under `projectTypes`

## Placeholder System

Templates use `{{PLACEHOLDER_NAME}}` format for replacements:

Core placeholders:
- `{{PROJECT_NAME}}` - Target project name
- `{{PROJECT_TYPE}}` - Detected project type
- `{{GENERATED_DATE}}` - ISO timestamp of generation
- `{{SESSION_MAX_LINES}}` - Archive threshold for session context (default: 300)
- `{{JSON_MAX_LINES}}` - Archive threshold for JSON files (default: 400)

Feature injection placeholders:
- `{{PROJECT_FEATURES}}` - Feature detection code block
- `{{PROJECT_FEATURES_DISPLAY}}` - Feature display in save output
- `{{PROJECT_STATUS_LOADERS}}` - Status loading functions
- `{{PROJECT_STATUS_DISPLAYS}}` - Status display in load output

## Deployment Output Structure

Genie creates this structure in target projects:
```
target-project/
├── save                       # 2-line wrapper → scripts/project-save.js
├── load                       # 2-line wrapper → scripts/project-load.js
├── scripts/
│   ├── project-save.js      # Complete 300+ line implementation
│   └── project-load.js      # Complete 250+ line implementation
└── docs/project/
    ├── session-context.md    # Session tracking
    ├── todo.json            # Task management
    ├── projects.json        # Project metadata
    ├── .save-load-config.json  # Deployment configuration
    └── */logs/              # Archive directories (created as needed)
```

## Key Design Principles

### Self-Contained Deployments
Each project gets its OWN complete implementation (300+ lines) rather than calling shared scripts. This ensures:
- No external dependencies in deployed projects
- Customization happens at generation time, not runtime
- Projects can modify their generated scripts independently
- No need for Genie to remain installed after deployment

### Archive Strategy
Generated scripts include auto-archiving logic:
- Session context archives at 300 lines (configurable)
- JSON files archive at 400 lines (configurable)
- Archive naming: `{name}-{YYYYMMDD}-v{N}.{ext}`
- Archives stored in `docs/project/*/logs/` subdirectories

### Error Handling
Bulletproof deployment with:
- Line ending normalization (CRLF → LF)
- Permission setting (chmod +x)
- Directory creation with recursive mkdir
- Git initialization checks before hook installation
- Fallback for non-git repositories

## Project Type Detection Logic

Detection uses confidence scoring (0-100):
- Files/directories add points based on importance
- Best match selected if confidence > 0.3
- Falls back to 'generic' type if no confident match

Current detection criteria:
- **aws-cloud**: .env with AWS_, provision scripts, knowledge_base/
- **react-app**: package.json + src/App.js or src/App.jsx
- **nextjs-app**: next.config.js + (pages/ or app/)
- **node-api**: package.json + (server.js/app.js) + routes/
- **python-ml**: requirements.txt + (models/ or ml/ or data/)
- **cli-tool**: package.json with "bin" field
- **docker-project**: Dockerfile + docker-compose.yml
- **generic**: Default fallback with basic git/file tracking

## Testing Guidelines

When testing deployments:
1. Create temporary test directory
2. Initialize git (for hook testing): `git init`
3. Add indicator files for desired project type
4. Run deployment: `node /path/to/genie/bin/deploy.js`
5. Verify generated files exist and have execute permissions
6. Test commands: `./save` and `./load`
7. Check archive functionality after threshold reached

## Important Configuration Files

- `config/defaults.json`: Project type configurations, archive thresholds
- `hooks/pre-commit`: Git hook for security checks (no secrets)
- `hooks/prepare-commit-msg`: Removes Claude signatures from commits