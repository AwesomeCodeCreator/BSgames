# Quick Start Guide - Genie

**Author:** TEDDYMEGACORP

## 🚀 Install in Any Project (30 seconds)

### Method 1: Direct Installation
```bash
cd /path/to/your/project
bash /home/neo/genie/install.sh
```

### Method 2: Using Node.js Directly
```bash
cd /path/to/your/project
node /home/neo/genie/bin/deploy.js
```

## 📋 What Gets Installed

The system will:
1. ✅ Detect your project type automatically
2. ✅ Generate 300+ line project-save.js and project-load.js (complete implementations)
3. ✅ Update/create package.json with npm scripts
4. ✅ Create claude.json with quickCommands
5. ✅ Create tracking files (session-context.md, todo.json, projects.json)
6. ✅ Install git security hooks
7. ✅ Set proper permissions
8. ✅ Fix line endings

## 🎯 Project Types Detected

| Type | Detection | Features Tracked |
|------|-----------|------------------|
| **aws-cloud** | .env + AWS scripts | AWS status, deployments, costs |
| **react-app** | package.json + src/App.js | Bundle size, tests, components |
| **node-api** | server.js/app.js + routes/ | Endpoints, database, auth |
| **python-ml** | requirements.txt + models/ | Training, metrics, datasets |
| **generic** | Default fallback | Basic tracking |

## 💻 Usage After Installation

### Using NPM Scripts
```bash
# Save project state
npm run save

# View project status
npm run load
```

### Using Claude Quick Commands
```bash
# In Claude Code, just type:
save    # Triggers npm run save
load    # Triggers npm run load
```

## 🧪 Test the System

```bash
# Run comprehensive tests
bash /home/neo/genie/test/test-deployment.sh
```

## 📁 File Structure Created

```
your-project/
├── package.json            # NPM scripts (save, load, etc.)
├── claude.json             # Claude AI configuration
├── scripts/
│   ├── project-save.js     # 300+ lines (complete)
│   └── project-load.js     # 250+ lines (complete)
├── docs/project/
│   ├── session-context.md  # Session tracking
│   ├── todo.json           # Task management
│   ├── projects.json       # Project metadata
│   ├── session-logs/       # Archives
│   ├── todo-logs/          # Archives
│   └── projects-logs/      # Archives
└── .git/hooks/
    ├── pre-commit          # Security checks
    └── prepare-commit-msg  # Claude signature removal
```

## ⚙️ Customization

The installer offers two modes:

### Quick Setup (Default)
- Press Enter/Y when prompted
- Uses smart defaults for your project type
- Takes 10 seconds

### Custom Setup
- Press 'n' for custom configuration
- Choose archive thresholds
- Select features to track
- Configure git hooks

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "npm: command not found" | Install Node.js/npm |
| "Missing script: save" | Check package.json scripts section |
| Line ending errors | Files auto-fixed during install |
| Git hooks not working | Run `git init` first |
| Node.js not found | Install Node.js 14+ |

## 🎯 Key Benefits

1. **Self-Contained**: Each project gets complete implementations
2. **No Dependencies**: Uses only Node.js built-ins
3. **Project-Aware**: Detects and tracks what matters for YOUR project
4. **Bulletproof**: Proven implementation pattern
5. **Zero Friction**: One command, done

## 📚 Philosophy

Unlike other approaches that use generic scripts, this system:
- **GENERATES** complete implementations per project
- **CUSTOMIZES** based on detected project type
- **MAINTAINS** independence (no external dependencies)
- **PRESERVES** proven implementation patterns

## 🆘 Support

- Full documentation: [README.md](README.md)
- Architecture: [UNIVERSAL-SAVE-DEPLOY-ARCHITECTURE.md](../UNIVERSAL-SAVE-DEPLOY-ARCHITECTURE.md)
- Porting guide: [SAVE-LOAD-COMPLETE-PORTING-GUIDE.md](../SAVE-LOAD-COMPLETE-PORTING-GUIDE.md)

---

**Remember**: Genie DEPLOYS save/load systems to projects, it doesn't try to BE save/load!