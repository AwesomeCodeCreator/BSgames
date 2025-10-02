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

      // Write script files
      await this.writeScripts(scripts);

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
    const scriptFiles = [
      { path: 'save', content: scripts.save },
      { path: 'load', content: scripts.load },
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
   * Fix file permissions
   */
  async fixPermissions() {
    const executableFiles = [
      'save',
      'load',
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
      'save',
      'load',
      'scripts/project-save.js',
      'scripts/project-load.js',
      '.git/hooks/pre-commit',
      '.git/hooks/prepare-commit-msg'
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
      'save',
      'load',
      'scripts/project-save.js',
      'scripts/project-load.js',
      'docs/project/session-context.md',
      'docs/project/todo.json',
      'docs/project/projects.json'
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
      'save',
      'load',
      'scripts/project-save.js',
      'scripts/project-load.js',
      '.git/hooks/pre-commit',
      '.git/hooks/prepare-commit-msg'
    ];

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