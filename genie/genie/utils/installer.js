/**
 * Installer Utility
 * Handles file creation, permission setting, and deployment tasks
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class Installer {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.createdFiles = [];
    this.createdDirs = [];
    this.errors = [];
  }

  /**
   * Install complete save/load system
   */
  async install(scripts, files, config) {
    console.log('📦 Starting installation...\n');

    try {
      // Create directory structure
      await this.createDirectories(config.directories);

      // Write script files (only project-save.js and project-load.js now)
      await this.writeScripts(scripts);

      // Update or create package.json with npm scripts
      await this.updatePackageJson();

      // Create claude.json for quickCommands
      await this.createClaudeJson(config);

      // Write tracking files
      await this.writeTrackingFiles(files);

      // Install git hooks if requested
      if (config.installGitHooks) {
        await this.installGitHooks(config.hooks);
      }

      // Fix permissions
      await this.fixPermissions();

      // Fix line endings
      await this.fixLineEndings();

      // Verify installation
      const verified = await this.verifyInstallation();

      return {
        success: verified,
        createdFiles: this.createdFiles,
        createdDirs: this.createdDirs,
        errors: this.errors
      };
    } catch (error) {
      this.errors.push(error.message);
      return {
        success: false,
        createdFiles: this.createdFiles,
        createdDirs: this.createdDirs,
        errors: this.errors
      };
    }
  }

  /**
   * Create directory structure
   */
  async createDirectories(directories) {
    const defaultDirs = [
      'scripts',
      'docs/project/session-logs',
      'docs/project/todo-logs',
      'docs/project/projects-logs',
      'docs/current',
      'docs/technical'
    ];

    const dirsToCreate = directories || defaultDirs;

    for (const dir of dirsToCreate) {
      const fullPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        this.createdDirs.push(dir);
        console.log(`   Created: ${dir}/`);
      }
    }
  }

  /**
   * Write script files
   */
  async writeScripts(scripts) {
    // No longer creating wrapper scripts - only the actual implementation files
    const scriptFiles = [
      { path: 'scripts/project-save.js', content: scripts.projectSave },
      { path: 'scripts/project-load.js', content: scripts.projectLoad }
    ];

    for (const script of scriptFiles) {
      const fullPath = path.join(this.projectRoot, script.path);
      fs.writeFileSync(fullPath, script.content);
      this.createdFiles.push(script.path);

      // Make executable
      fs.chmodSync(fullPath, 0o755);

      const lines = script.content.split('\n').length;
      console.log(`   Created: ${script.path} (${lines} lines)`);
    }
  }

  /**
   * Write tracking files
   */
  async writeTrackingFiles(files) {
    const trackingFiles = [
      { path: 'docs/project/session-context.md', content: files['session-context.md'] },
      { path: 'docs/project/todo.json', content: files['todo.json'] },
      { path: 'docs/project/projects.json', content: files['projects.json'] },
      { path: 'docs/project/.save-load-config.json', content: files['.save-load-config.json'] }
    ];

    for (const file of trackingFiles) {
      const fullPath = path.join(this.projectRoot, file.path);

      // Don't overwrite existing tracking files
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, file.content);
        this.createdFiles.push(file.path);
        console.log(`   Initialized: ${file.path}`);
      } else {
        console.log(`   Skipped (exists): ${file.path}`);
      }
    }
  }

  /**
   * Install git hooks
   */
  async installGitHooks(hooks) {
    const gitDir = path.join(this.projectRoot, '.git');

    if (!fs.existsSync(gitDir)) {
      console.log('   ⚠️  No .git directory found - skipping hooks');
      return;
    }

    console.log('\n🔒 Installing git hooks...');

    const hooksDir = path.join(gitDir, 'hooks');
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Pre-commit hook
    if (hooks.preCommit) {
      const preCommitPath = path.join(hooksDir, 'pre-commit');
      fs.writeFileSync(preCommitPath, hooks.preCommit);
      fs.chmodSync(preCommitPath, 0o755);
      console.log('   Installed: .git/hooks/pre-commit');
    }

    // Prepare-commit-msg hook
    if (hooks.prepareCommitMsg) {
      const prepareCommitPath = path.join(hooksDir, 'prepare-commit-msg');
      fs.writeFileSync(prepareCommitPath, hooks.prepareCommitMsg);
      fs.chmodSync(prepareCommitPath, 0o755);
      console.log('   Installed: .git/hooks/prepare-commit-msg');
    }
  }

  /**
   * Update or create package.json with npm scripts
   */
  async updatePackageJson() {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    let packageJson = {};

    // Read existing package.json if it exists
    if (fs.existsSync(packageJsonPath)) {
      try {
        const content = fs.readFileSync(packageJsonPath, 'utf8');
        packageJson = JSON.parse(content);
      } catch (error) {
        console.log('   ⚠️  Could not parse existing package.json, creating new one');
        packageJson = {};
      }
    }

    // Ensure basic fields exist
    if (!packageJson.name) {
      packageJson.name = path.basename(this.projectRoot);
    }
    if (!packageJson.version) {
      packageJson.version = '1.0.0';
    }
    if (!packageJson.description) {
      packageJson.description = `${packageJson.name} project with save/load functionality`;
    }

    // Add or update scripts section
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    // Add save and load scripts
    packageJson.scripts.save = 'node ./scripts/project-save.js';
    packageJson.scripts.load = 'node ./scripts/project-load.js';

    // Write updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('   Updated: package.json with save/load scripts');
  }

  /**
   * Create claude.json with quickCommands
   */
  async createClaudeJson(config) {
    const claudeJsonPath = path.join(this.projectRoot, 'claude.json');

    // Check if claude.json already exists
    let claudeJson = {};
    if (fs.existsSync(claudeJsonPath)) {
      try {
        const content = fs.readFileSync(claudeJsonPath, 'utf8');
        claudeJson = JSON.parse(content);
        console.log('   Found existing claude.json, updating quickCommands');
      } catch (error) {
        console.log('   ⚠️  Could not parse existing claude.json, creating new one');
        claudeJson = {};
      }
    }

    // Add metadata if not exists
    if (!claudeJson.metadata) {
      claudeJson.metadata = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0],
        project: config.projectName || path.basename(this.projectRoot),
        description: config.description || 'Project with save/load functionality'
      };
    }

    // Add or update quickCommands
    if (!claudeJson.quickCommands) {
      claudeJson.quickCommands = {};
    }

    claudeJson.quickCommands.save = {
      description: 'Save project state and update tracking',
      actions: [
        'Append current state to docs/project/session-context.md',
        'Update todo.json with timestamp and progress',
        'Update projects.json with status',
        `Auto-archive session-context.md when > ${config.sessionMaxLines || 300} lines`,
        'Display summary of changes saved'
      ],
      command: 'npm run save'
    };

    claudeJson.quickCommands.load = {
      description: 'Load and display project state',
      actions: [
        'Show current git branch and changes',
        'Display session handoff notes',
        'List high-priority tasks',
        'Show project configuration status',
        'Display project-specific features'
      ],
      command: 'npm run load'
    };

    // Write claude.json
    fs.writeFileSync(claudeJsonPath, JSON.stringify(claudeJson, null, 2));
    console.log('   Created: claude.json with quickCommands');
  }

  /**
   * Fix file permissions
   */
  async fixPermissions() {
    const executableFiles = [
      'scripts/project-save.js',
      'scripts/project-load.js'
    ];

    for (const file of executableFiles) {
      const fullPath = path.join(this.projectRoot, file);
      if (fs.existsSync(fullPath)) {
        try {
          fs.chmodSync(fullPath, 0o755);
        } catch (error) {
          this.errors.push(`Failed to set permissions for ${file}: ${error.message}`);
        }
      }
    }
  }

  /**
   * Fix line endings (CRLF to LF)
   */
  async fixLineEndings() {
    const textFiles = [
      'scripts/project-save.js',
      'scripts/project-load.js',
      '.git/hooks/pre-commit',
      '.git/hooks/prepare-commit-msg',
      'package.json',
      'claude.json'
    ];

    for (const file of textFiles) {
      const fullPath = path.join(this.projectRoot, file);
      if (fs.existsSync(fullPath)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const fixedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
          fs.writeFileSync(fullPath, fixedContent);
        } catch (error) {
          // Silently continue - not critical
        }
      }
    }
  }

  /**
   * Verify installation
   */
  async verifyInstallation() {
    const requiredFiles = [
      'scripts/project-save.js',
      'scripts/project-load.js',
      'docs/project/session-context.md',
      'docs/project/todo.json',
      'docs/project/projects.json',
      'package.json',
      'claude.json'
    ];

    const missing = [];
    for (const file of requiredFiles) {
      const fullPath = path.join(this.projectRoot, file);
      if (!fs.existsSync(fullPath)) {
        missing.push(file);
      }
    }

    if (missing.length > 0) {
      this.errors.push(`Missing files: ${missing.join(', ')}`);
      return false;
    }

    // Try to run save command
    try {
      execSync(`cd "${this.projectRoot}" && node ./scripts/project-save.js > /dev/null 2>&1`);
      return true;
    } catch (error) {
      this.errors.push('Save command test failed');
      return false;
    }
  }

  /**
   * Uninstall save/load system
   */
  async uninstall() {
    const filesToRemove = [
      'scripts/project-save.js',
      'scripts/project-load.js',
      '.git/hooks/pre-commit',
      '.git/hooks/prepare-commit-msg',
      'claude.json'
    ];

    // Note: We don't remove package.json since it may contain other project scripts

    const removed = [];
    for (const file of filesToRemove) {
      const fullPath = path.join(this.projectRoot, file);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        removed.push(file);
      }
    }

    return {
      success: true,
      removed
    };
  }

  /**
   * Check prerequisites
   */
  checkPrerequisites() {
    const issues = [];

    // Check Node.js version
    try {
      const nodeVersion = process.version;
      const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
      if (majorVersion < 14) {
        issues.push(`Node.js version 14+ required (current: ${nodeVersion})`);
      }
    } catch {
      issues.push('Could not determine Node.js version');
    }

    // Check write permissions
    try {
      const testFile = path.join(this.projectRoot, '.save-load-test');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    } catch {
      issues.push('No write permissions in project directory');
    }

    return {
      ready: issues.length === 0,
      issues
    };
  }

  /**
   * Get installation summary
   */
  getSummary() {
    return {
      projectRoot: this.projectRoot,
      filesCreated: this.createdFiles.length,
      dirsCreated: this.createdDirs.length,
      errors: this.errors.length,
      files: this.createdFiles,
      directories: this.createdDirs,
      errorMessages: this.errors
    };
  }
}

module.exports = Installer;