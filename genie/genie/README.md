# Genie - Universal Save/Load Deployment System

**Author:** TEDDYMEGACORP

## 🎯 Philosophy
Genie is a universal save and load deployment system for managing context, todo, and projects within project-level folders. It DEPLOYS complete, self-contained save/load implementations to projects. It does NOT create generic wrappers or dependencies on external scripts.

## Key Principle
**Each project gets its OWN complete implementation**, not a generic wrapper. Genie's job is to GENERATE these implementations, not to BE the implementation.

## Why This Approach?
- **Self-contained projects** (OPTIMAL): Complete project-save.js and project-load.js with npm scripts and Claude integration
- **External dependencies** (SUBOPTIMAL): Rely on external scripts, less focused

## Quick Start
```bash
# Local installation from genie directory
cd /path/to/your/project
bash /home/neo/genie/install.sh

# Or using Node.js directly
cd /path/to/your/project
node /home/neo/genie/bin/deploy.js
```

## What Gets Deployed
```
your-project/
├── package.json                  # NPM scripts (save, load, etc.)
├── claude.json                   # Claude AI configuration with quickCommands
├── scripts/
│   ├── project-save.js          # COMPLETE 300+ line implementation
│   └── project-load.js          # COMPLETE 300+ line implementation
├── docs/project/
│   ├── session-context.md
│   ├── todo.json
│   └── projects.json
└── .git/hooks/
    ├── pre-commit               # Security checks
    └── prepare-commit-msg       # Claude signature removal
```

### NPM Scripts Added to package.json:
- `npm run save` - Save project state
- `npm run load` - Load project state

### Claude.json QuickCommands:
- When user types "save" → executes `npm run save`
- When user types "load" → executes `npm run load`

## Project Type Detection & Customization

### Automatic Detection
The tool analyzes your project and generates customized implementations:

| Project Type | Detection Criteria | Custom Features |
|-------------|-------------------|-----------------|
| AWS Cloud | `.env` + AWS scripts + `knowledge_base/` | AWS status, deployment readiness, costs |
| React App | `package.json` + `src/App.js` | Bundle size, test coverage, performance |
| Next.js App | `next.config.js` + `pages/` or `app/` | Routes, API endpoints, build status |
| Node API | `routes/` or `app.js` + `package.json` | Endpoints, database, auth status |
| Python ML | `requirements.txt` + `models/` | Training status, metrics, datasets |
| CLI Tool | `bin/` + CLI libs in package.json | Commands, config, global install |
| Docker | `Dockerfile` + `docker-compose.yml` | Containers, images, volumes |
| Generic | Default fallback | Basic git and file tracking |

## Architecture
```
genie/
├── bin/
│   └── deploy.js                # Main deployment orchestrator
├── templates/
│   ├── base/                    # Complete base implementations
│   │   ├── project-save.template.js
│   │   └── project-load.template.js
│   └── features/                # Project-specific feature modules
│       ├── aws-cloud.js         # AWS cloud project features
│       ├── react-app.js         # React application features
│       ├── nextjs-app.js        # Next.js application features
│       ├── node-api.js          # Node.js API features
│       ├── python-ml.js         # Python ML project features
│       ├── cli-tool.js          # CLI tool features
│       ├── docker-project.js    # Docker project features
│       └── generic.js           # Generic project fallback
├── utils/
│   ├── project-detector.js     # Analyzes project type
│   ├── template-engine.js      # Generates customized scripts
│   └── installer.js           # Handles file creation
├── config/
│   └── defaults.json          # Default configurations
├── hooks/
│   ├── pre-commit             # Git security hook template
│   └── prepare-commit-msg     # Claude signature removal
└── install.sh                 # One-command installer

```

## How It Works

1. **Detection Phase**
   - Analyzes project structure
   - Identifies project type
   - Determines feature requirements

2. **Generation Phase**
   - Loads base templates (full implementations)
   - Inserts project-specific features
   - Customizes detection logic

3. **Deployment Phase**
   - Creates directory structure
   - Writes customized scripts
   - Sets permissions
   - Installs git hooks
   - Initializes tracking files

4. **Verification Phase**
   - Tests save/load commands
   - Verifies file creation
   - Confirms git integration

## Features

### ✅ Bulletproof Deployment
- Complete error handling
- Line ending fixes (CRLF → LF)
- Permission setting (chmod +x)
- Directory creation
- Git initialization checks

### ✅ Self-Contained Scripts
- No external dependencies
- All logic included
- Project-specific optimizations
- Complete implementations (300+ lines)

### ✅ Smart Customization
- Detects project type automatically
- Adds relevant feature detection
- Customizes output display
- Tracks domain-specific metrics

### ✅ Zero Dependencies
- Uses only Node.js built-ins
- No npm packages required
- No external script calls
- Completely portable

## Comparison with Other Approaches

| Aspect | This Tool (Optimal) | Universal-save.js (Suboptimal) |
|--------|--------------------|---------------------------------|
| Implementation | Generates complete scripts | Generic script called by all |
| Customization | Project-specific at generation | Runtime detection |
| Performance | Fast (all logic local) | Slower (detection every run) |
| Maintainability | Easy (isolated implementations) | Hard (one script for all) |
| Flexibility | Full (can edit generated scripts) | Limited (changes affect all) |

## Testing

```bash
# Run test suite
cd genie/test
./run-tests.sh

# Test on specific project type
./test-deployment.sh aws-cloud /tmp/test-aws
./test-deployment.sh react-app /tmp/test-react
./test-deployment.sh node-api /tmp/test-api
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "command not found" | Run `chmod +x save load` |
| Line ending errors | Run `dos2unix` or `sed -i 's/\r$//'` |
| Git hooks not working | Check `.git/` exists, run `git init` |
| Files not created | Check permissions, run as user (not root) |

## Contributing

To add a new project type:
1. Create detection logic in `utils/project-detector.js`
2. Add feature module in `templates/features/`
3. Update project type mapping
4. Test deployment

## License

MIT License - Copyright (c) 2025 TEDDYMEGACORP

Use freely in your projects