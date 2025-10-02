#!/usr/bin/env node

/**
 * Genie Deployment Orchestrator
 * Author: TEDDYMEGACORP
 * Deploys complete, self-contained save/load implementations to projects
 * Universal save and load deployment system for managing context, todo, and projects
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Load utility modules
const ProjectDetector = require('../utils/project-detector');
const TemplateEngine = require('../utils/template-engine');
const Installer = require('../utils/installer');

class SaveLoadDeployer {
  constructor() {
    this.projectRoot = process.cwd();
    this.projectName = path.basename(this.projectRoot);
    this.deployerRoot = path.join(__dirname, '..');
    this.templatesDir = path.join(this.deployerRoot, 'templates');

    // Initialize utility modules
    this.detector = new ProjectDetector(this.projectRoot);
    this.templateEngine = new TemplateEngine(this.templatesDir);
    this.installer = new Installer(this.projectRoot);

    this.colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      cyan: '\x1b[36m',
      red: '\x1b[31m',
      magenta: '\x1b[35m'
    };
  }

  async run() {
    console.log(`${this.colors.cyan}${this.colors.bright}
╔════════════════════════════════════════════╗
║                Genie System                ║
║   Universal Save/Load Deployment Tool      ║
╚════════════════════════════════════════════╝
${this.colors.reset}`);

    // Check if already installed
    if (this.checkExistingInstallation()) {
      const overwrite = await this.askYesNo('Save/load already installed. Overwrite?');
      if (!overwrite) {
        console.log('Deployment cancelled.');
        return;
      }
    }

    // Detect project type using the detector module
    console.log(`\n${this.colors.cyan}📋 Analyzing project...${this.colors.reset}`);
    const detection = this.detector.detect();
    const projectType = detection.type;
    console.log(`   Type detected: ${this.colors.bright}${projectType}${this.colors.reset}`);
    console.log(`   Confidence: ${this.colors.bright}${Math.round(detection.confidence * 100)}%${this.colors.reset}`);
    console.log(`   Description: ${detection.description}`);

    // Quick or custom setup
    const useQuick = await this.askYesNo('\nUse quick setup with smart defaults?');

    const config = useQuick
      ? this.getQuickConfig(projectType)
      : await this.runCustomWizard(projectType);

    // Deploy
    console.log(`\n${this.colors.cyan}🚀 Deploying save/load tools...${this.colors.reset}`);
    const success = await this.deployTools(projectType, config);

    if (success) {
      console.log(`\n${this.colors.green}${this.colors.bright}✅ Deployment Complete!${this.colors.reset}`);
      this.showPostInstallInstructions();
    } else {
      console.log(`\n${this.colors.red}${this.colors.bright}❌ Deployment Failed${this.colors.reset}`);
      console.log('Please check the error messages above and try again.');
      process.exit(1);
    }
  }

  checkExistingInstallation() {
    // Check for scripts or package.json with our scripts
    if (fs.existsSync(path.join(this.projectRoot, 'scripts', 'project-save.js'))) {
      return true;
    }

    // Check if package.json has our save/load scripts
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return pkg.scripts && (pkg.scripts.save || pkg.scripts.load);
      } catch {}
    }

    return false;
  }

  // DEPRECATED - Now using ProjectDetector module
  detectProjectType_OLD() {
    const detections = [
      {
        type: 'aws-cloud',
        score: 0,
        checks: [
          { file: '.env', weight: 2, content: 'AWS' },
          { file: 'provision-lightsail.sh', weight: 3 },
          { file: 'docker-compose.yml', weight: 2 },
          { file: 'knowledge_base', weight: 2, isDir: true },
          { file: 'deploy.sh', weight: 2 }
        ]
      },
      {
        type: 'react-app',
        score: 0,
        checks: [
          { file: 'package.json', weight: 1, content: 'react' },
          { file: 'src/App.js', weight: 3 },
          { file: 'src/App.tsx', weight: 3 },
          { file: 'public/index.html', weight: 2 },
          { file: '.next', weight: 3, isDir: true }
        ]
      },
      {
        type: 'node-api',
        score: 0,
        checks: [
          { file: 'package.json', weight: 1, content: 'express' },
          { file: 'server.js', weight: 3 },
          { file: 'app.js', weight: 3 },
          { file: 'routes', weight: 2, isDir: true },
          { file: 'controllers', weight: 2, isDir: true }
        ]
      },
      {
        type: 'python-ml',
        score: 0,
        checks: [
          { file: 'requirements.txt', weight: 2 },
          { file: 'models', weight: 3, isDir: true },
          { file: 'notebooks', weight: 3, isDir: true },
          { file: 'data', weight: 2, isDir: true },
          { file: 'train.py', weight: 3 }
        ]
      }
    ];

    // Score each project type
    for (const detection of detections) {
      for (const check of detection.checks) {
        const filePath = path.join(this.projectRoot, check.file);
        const exists = check.isDir ? fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
                                   : fs.existsSync(filePath);

        if (exists) {
          detection.score += check.weight;

          // Check content if specified
          if (check.content && !check.isDir) {
            try {
              const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
              if (content.includes(check.content.toLowerCase())) {
                detection.score += 1;
              }
            } catch {}
          }
        }
      }
    }

    // Return highest scoring type, or 'generic' if no clear match
    const bestMatch = detections.reduce((a, b) => a.score > b.score ? a : b);
    return bestMatch.score >= 3 ? bestMatch.type : 'generic';
  }

  getQuickConfig(projectType) {
    const configs = {
      'aws-cloud': {
        projectName: this.projectName,
        projectType: 'aws-cloud',
        description: 'AWS cloud deployment project',
        sessionMaxLines: 300,
        jsonMaxLines: 400,
        installGitHooks: true
      },
      'react-app': {
        projectName: this.projectName,
        projectType: 'react-app',
        description: 'React web application',
        sessionMaxLines: 300,
        jsonMaxLines: 400,
        installGitHooks: true
      },
      'node-api': {
        projectName: this.projectName,
        projectType: 'node-api',
        description: 'Node.js API service',
        sessionMaxLines: 300,
        jsonMaxLines: 400,
        installGitHooks: true
      },
      'python-ml': {
        projectName: this.projectName,
        projectType: 'python-ml',
        description: 'Python machine learning project',
        sessionMaxLines: 300,
        jsonMaxLines: 400,
        installGitHooks: true
      },
      'generic': {
        projectName: this.projectName,
        projectType: 'generic',
        description: 'Software development project',
        sessionMaxLines: 300,
        jsonMaxLines: 400,
        installGitHooks: true
      }
    };

    return configs[projectType] || configs.generic;
  }

  async runCustomWizard(projectType) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const ask = (question) => new Promise(resolve => {
      rl.question(question, resolve);
    });

    console.log(`\n${this.colors.cyan}Custom Configuration${this.colors.reset}`);

    const config = {
      projectName: await ask(`Project name (${this.projectName}): `) || this.projectName,
      projectType: projectType,
      description: await ask('Project description: ') || `${projectType} project`,
      sessionMaxLines: parseInt(await ask('Session archive threshold (300): ') || '300'),
      jsonMaxLines: parseInt(await ask('JSON archive threshold (400): ') || '400'),
      installGitHooks: (await ask('Install git hooks? (Y/n): ')).toLowerCase() !== 'n'
    };

    rl.close();
    return config;
  }

  async deployTools(projectType, config) {
    // Use the Installer module for complete installation
    // No longer need wrapper scripts - just the actual implementations
    const scripts = {
      projectSave: this.templateEngine.generateSaveScript(projectType, config),
      projectLoad: this.templateEngine.generateLoadScript(projectType, config)
    };

    const files = this.templateEngine.generateInitFiles(config);

    const hooks = config.installGitHooks ? {
      preCommit: fs.readFileSync(path.join(this.deployerRoot, 'hooks', 'pre-commit'), 'utf8'),
      prepareCommitMsg: fs.readFileSync(path.join(this.deployerRoot, 'hooks', 'prepare-commit-msg'), 'utf8')
    } : null;

    const installConfig = {
      directories: ['scripts', 'docs/project/session-logs', 'docs/project/todo-logs', 'docs/project/projects-logs'],
      installGitHooks: config.installGitHooks,
      hooks
    };

    const result = await this.installer.install(scripts, files, installConfig);

    if (!result.success) {
      console.log(`${this.colors.red}❌ Installation failed:${this.colors.reset}`);
      result.errors.forEach(err => console.log(`   ${err}`));
      return false;
    }

    return true;
  }

  createDirectories() {
    const dirs = [
      'scripts',
      'docs/project/session-logs',
      'docs/project/todo-logs',
      'docs/project/projects-logs',
      'docs/current',
      'docs/technical'
    ];

    for (const dir of dirs) {
      const fullPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`   Created: ${dir}/`);
      }
    }
  }

  // DEPRECATED - Now using TemplateEngine module
  generateSaveScript_OLD(projectType, config) {
    // Load base template
    let template = fs.readFileSync(
      path.join(this.templatesDir, 'base', 'project-save.template.js'),
      'utf8'
    );

    // Load feature module if exists
    let features = {};
    const featureFile = path.join(this.templatesDir, 'features', `${projectType}.js`);
    if (fs.existsSync(featureFile)) {
      features = require(featureFile);
    } else {
      // Use generic features
      features = require(path.join(this.templatesDir, 'features', 'generic.js'));
    }

    // Replace placeholders
    template = template
      .replace(/{{PROJECT_NAME}}/g, config.projectName)
      .replace(/{{PROJECT_TYPE}}/g, config.projectType)
      .replace(/{{PROJECT_DESCRIPTION}}/g, config.description)
      .replace(/{{PROJECT_ID}}/g, config.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      .replace(/{{GENERATED_DATE}}/g, new Date().toISOString())
      .replace(/{{SESSION_MAX_LINES}}/g, config.sessionMaxLines)
      .replace(/{{JSON_MAX_LINES}}/g, config.jsonMaxLines)
      .replace(/{{PROJECT_FEATURES}}/g, features.projectFeatures || '')
      .replace(/{{PROJECT_FEATURES_DISPLAY}}/g, features.projectFeaturesDisplay || '')
      .replace(/{{PROJECT_STATUS_DISPLAY}}/g, features.projectStatusDisplay || '');

    // Write the file
    const savePath = path.join(this.projectRoot, 'scripts', 'project-save.js');
    fs.writeFileSync(savePath, template);
    fs.chmodSync(savePath, 0o755);
    console.log(`   Generated: scripts/project-save.js (${template.split('\n').length} lines)`);
  }

  // DEPRECATED - Now using TemplateEngine module
  generateLoadScript_OLD(projectType, config) {
    // Load base template
    let template = fs.readFileSync(
      path.join(this.templatesDir, 'base', 'project-load.template.js'),
      'utf8'
    );

    // Load feature module
    let features = {};
    const featureFile = path.join(this.templatesDir, 'features', `${projectType}.js`);
    if (fs.existsSync(featureFile)) {
      features = require(featureFile);
    } else {
      features = require(path.join(this.templatesDir, 'features', 'generic.js'));
    }

    // Replace placeholders
    template = template
      .replace(/{{PROJECT_NAME}}/g, config.projectName)
      .replace(/{{PROJECT_TYPE}}/g, config.projectType)
      .replace(/{{PROJECT_ID}}/g, config.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      .replace(/{{GENERATED_DATE}}/g, new Date().toISOString())
      .replace(/{{PROJECT_STATUS_LOADERS}}/g, features.projectStatusLoaders || '')
      .replace(/{{PROJECT_STATUS_DISPLAYS}}/g, features.projectStatusDisplays || '')
      .replace(/{{PROJECT_DISPLAY_CALLS}}/g, features.projectDisplayCalls || '')
      .replace(/{{PROJECT_FOOTER_COMMANDS}}/g, features.projectFooterCommands || '');

    // Write the file
    const loadPath = path.join(this.projectRoot, 'scripts', 'project-load.js');
    fs.writeFileSync(loadPath, template);
    fs.chmodSync(loadPath, 0o755);
    console.log(`   Generated: scripts/project-load.js (${template.split('\n').length} lines)`);
  }

  // DEPRECATED - No longer using wrapper scripts
  // Now using npm scripts in package.json instead
  createWrappers_DEPRECATED() {
    // Wrapper scripts have been replaced with npm scripts
    // This method is kept for reference but not used
  }

  initializeTrackingFiles(config) {
    // Initialize session-context.md
    const sessionFile = path.join(this.projectRoot, 'docs', 'project', 'session-context.md');
    if (!fs.existsSync(sessionFile)) {
      const sessionContent = `# ${config.projectName} Session Context

## Project Overview
${config.description}

## Current Status
- Save/Load tools installed via Genie
- Project type: ${config.projectType}
- Ready for session tracking

---

*For archived sessions, see ./docs/project/session-logs/*
`;
      fs.writeFileSync(sessionFile, sessionContent);
      console.log(`   Initialized: docs/project/session-context.md`);
    }

    // Initialize todo.json
    const todoFile = path.join(this.projectRoot, 'docs', 'project', 'todo.json');
    if (!fs.existsSync(todoFile)) {
      const todoContent = {
        tasks: [],
        metadata: {
          projectName: config.projectName,
          projectType: config.projectType,
          lastUpdated: new Date().toLocaleDateString(),
          deployedOn: new Date().toISOString()
        },
        inProgress: {
          currentFocus: `${config.projectName} development`,
          notes: [`Save/Load tools deployed on ${new Date().toLocaleString()}`]
        },
        _archive_note: "For archived todos, see ./docs/project/todo-logs/"
      };
      fs.writeFileSync(todoFile, JSON.stringify(todoContent, null, 2));
      console.log(`   Initialized: docs/project/todo.json`);
    }

    // Initialize projects.json
    const projectsFile = path.join(this.projectRoot, 'docs', 'project', 'projects.json');
    if (!fs.existsSync(projectsFile)) {
      const projectsContent = {
        projects: [{
          id: config.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: config.projectName,
          type: config.projectType,
          created: new Date().toLocaleDateString(),
          lastUpdated: new Date().toLocaleDateString()
        }],
        metadata: {
          version: '1.0.0',
          projectName: config.projectName,
          deployedOn: new Date().toISOString()
        },
        _archive_note: "For archived projects, see ./docs/project/projects-logs/"
      };
      fs.writeFileSync(projectsFile, JSON.stringify(projectsContent, null, 2));
      console.log(`   Initialized: docs/project/projects.json`);
    }
  }

  installGitHooks() {
    console.log(`\n${this.colors.cyan}🔒 Installing git hooks...${this.colors.reset}`);

    // Pre-commit hook
    const preCommitPath = path.join(this.projectRoot, '.git', 'hooks', 'pre-commit');
    const preCommitContent = fs.readFileSync(
      path.join(this.deployerRoot, 'hooks', 'pre-commit'),
      'utf8'
    );
    fs.writeFileSync(preCommitPath, preCommitContent);
    fs.chmodSync(preCommitPath, 0o755);
    console.log(`   Installed: .git/hooks/pre-commit`);

    // Prepare-commit-msg hook
    const prepareCommitPath = path.join(this.projectRoot, '.git', 'hooks', 'prepare-commit-msg');
    const prepareCommitContent = fs.readFileSync(
      path.join(this.deployerRoot, 'hooks', 'prepare-commit-msg'),
      'utf8'
    );
    fs.writeFileSync(prepareCommitPath, prepareCommitContent);
    fs.chmodSync(prepareCommitPath, 0o755);
    console.log(`   Installed: .git/hooks/prepare-commit-msg`);
  }

  fixLineEndings() {
    const files = [
      'save',
      'load',
      'scripts/project-save.js',
      'scripts/project-load.js'
    ];

    for (const file of files) {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const fixedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
          fs.writeFileSync(filePath, fixedContent);
        } catch {}
      }
    }
  }

  saveDeploymentConfig(config) {
    const configPath = path.join(this.projectRoot, 'docs', 'project', '.save-load-config.json');
    const deploymentConfig = {
      ...config,
      deployed: new Date().toISOString(),
      version: '2.0.0',
      deployer: 'genie',
      basedOn: 'proven-implementation-patterns'
    };
    fs.writeFileSync(configPath, JSON.stringify(deploymentConfig, null, 2));
    console.log(`   Saved config: docs/project/.save-load-config.json`);
  }

  showPostInstallInstructions() {
    console.log(`
${this.colors.cyan}═══════════════════════════════════════════════════${this.colors.reset}
${this.colors.bright}📚 How to Use:${this.colors.reset}

  ${this.colors.bright}npm run save${this.colors.reset} - Save current project state
  ${this.colors.bright}npm run load${this.colors.reset} - Display project status

${this.colors.bright}🤖 Claude Quick Commands:${this.colors.reset}

  Type ${this.colors.bright}save${this.colors.reset} in Claude Code → runs npm run save
  Type ${this.colors.bright}load${this.colors.reset} in Claude Code → runs npm run load

${this.colors.bright}📁 Files Created:${this.colors.reset}

  package.json                  - NPM scripts added
  claude.json                   - Claude quickCommands
  scripts/project-save.js       - Complete save implementation
  scripts/project-load.js       - Complete load implementation
  docs/project/                 - Tracking files

${this.colors.bright}✨ Features:${this.colors.reset}

  • Auto-archiving at configured thresholds
  • Project-specific feature detection
  • Git integration with security hooks
  • Colored terminal output
  • Zero external dependencies

${this.colors.cyan}═══════════════════════════════════════════════════${this.colors.reset}
`);
  }

  async askYesNo(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {
      rl.question(`${question} (Y/n): `, answer => {
        rl.close();
        resolve(answer.toLowerCase() !== 'n');
      });
    });
  }
}

// Main execution
if (require.main === module) {
  const deployer = new SaveLoadDeployer();
  deployer.run().catch(error => {
    console.error(`\n${deployer.colors.red}Error: ${error.message}${deployer.colors.reset}`);
    process.exit(1);
  });
}

module.exports = SaveLoadDeployer;