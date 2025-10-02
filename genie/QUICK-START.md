# Quick Start Guide - Genie

**Author:** TEDDYMEGACORP

## 🚀 Install in Any Project (30 seconds)

### Method 1: Direct Installation
```bash
cd /path/to/your/project
bash %HOME/user/genie/install.sh
```

### Method 2: Using Node.js Directly
```bash
cd /path/to/your/project
node %HOME/user/genie/bin/deploy.js
```

## 📋 What Gets Installed

The system will:
1. ✅ Detect your project type automatically
2. ✅ Generate 300+ line save.js and load.js (complete implementations)
3. ✅ Create tracking files (session-context.md, todo.json, projects.json)
4. ✅ Install git security hooks
5. ✅ Set proper permissions
6. ✅ Fix line endings

## 🎯 Project Types Detected

| Type | Detection | Features Tracked |
|------|-----------|------------------|
| **aws-cloud** | .env + AWS scripts | AWS status, deployments, costs |
| **react-app** | package.json + src/App.js | Bundle size, tests, components |
| **node-api** | server.js/app.js + routes/ | Endpoints, database, auth |
| **python-ml** | requirements.txt + models/ | Training, metrics, datasets |
| **generic** | Default fallback | Basic tracking |

## 💻 Usage After Installation

```bash
# Save project state
./save

# View project status
./load
```

## 🧪 Test the System

```bash
# Run comprehensive tests
bash %HOME/user/genie/test/test-deployment.sh
```

## 📁 File Structure Created

```
your-project/
├── save                     # Command to save state
├── load                     # Command to load status
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
| "command not found" | Run `chmod +x save load` |
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
- **PRESERVES** the AAE-Bot prime pattern (the best working example)

## 🆘 Support

- Full documentation: [README.md](README.md)
- Architecture: [UNIVERSAL-SAVE-DEPLOY-ARCHITECTURE.md](../UNIVERSAL-SAVE-DEPLOY-ARCHITECTURE.md)
- Porting guide: [SAVE-LOAD-COMPLETE-PORTING-GUIDE.md](../SAVE-LOAD-COMPLETE-PORTING-GUIDE.md)

---

**Remember**: Genie DEPLOYS save/load systems to projects, it doesn't try to BE save/load!