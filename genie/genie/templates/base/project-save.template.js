#!/usr/bin/env node

/**
 * {{PROJECT_NAME}} Project Save Command
 * Auto-generated from Genie by TEDDYMEGACORP
 * Generated: {{GENERATED_DATE}}
 * Project Type: {{PROJECT_TYPE}}
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const SESSION_CONTEXT_FILE = path.join(PROJECT_ROOT, 'docs', 'project', 'session-context.md');
const TODO_FILE = path.join(PROJECT_ROOT, 'docs', 'project', 'todo.json');
const PROJECTS_FILE = path.join(PROJECT_ROOT, 'docs', 'project', 'projects.json');
const SESSION_LOGS_DIR = path.join(PROJECT_ROOT, 'docs', 'project', 'session-logs');
const TODO_LOGS_DIR = path.join(PROJECT_ROOT, 'docs', 'project', 'todo-logs');
const PROJECTS_LOGS_DIR = path.join(PROJECT_ROOT, 'docs', 'project', 'projects-logs');
const SESSION_MAX_LINES = {{SESSION_MAX_LINES}};
const JSON_MAX_LINES = {{JSON_MAX_LINES}};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  magenta: '\x1b[35m'
};

// Ensure directories exist
function ensureDirectories() {
  const dirs = [
    path.join(PROJECT_ROOT, 'docs', 'project'),
    SESSION_LOGS_DIR,
    TODO_LOGS_DIR,
    PROJECTS_LOGS_DIR
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Get current git branch
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'main';
  }
}

// Get git status
function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.split('\n').filter(line => line.trim());

    const files = lines.map(line => ({
      status: line.substring(0, 2).trim(),
      file: line.substring(3).trim()
    }));

    return {
      modified: files.filter(f => f.status === 'M').map(f => f.file),
      added: files.filter(f => f.status === '??').map(f => f.file),
      deleted: files.filter(f => f.status === 'D').map(f => f.file),
      total: files.length
    };
  } catch {
    return { modified: [], added: [], deleted: [], total: 0 };
  }
}

// Get recent git commits
function getRecentCommits(limit = 5) {
  try {
    const commits = execSync(`git log --oneline -${limit}`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(line => line.length > 0)
      .map(line => {
        const [hash, ...message] = line.split(' ');
        return {
          hash: hash,
          message: message.join(' ')
        };
      });
    return commits;
  } catch {
    return [];
  }
}

// Generate archive filename with versioning
function getArchiveFilename(baseName, archiveDir) {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  let version = 1;
  let filename;

  do {
    const versionStr = version.toString().padStart(2, '0');
    const ext = baseName.endsWith('.json') ? '.json' : '.md';
    const nameWithoutExt = baseName.replace(/\.(json|md)$/, '');
    filename = `${nameWithoutExt}-${date}-${versionStr}${ext}`;
    version++;
  } while (fs.existsSync(path.join(archiveDir, filename)));

  return filename;
}

// Archive file if needed
function archiveFile(filePath, archiveDir, baseName) {
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');
  const archiveFilename = getArchiveFilename(baseName, archiveDir);
  const archivePath = path.join(archiveDir, archiveFilename);

  fs.writeFileSync(archivePath, content);
  return archiveFilename;
}

// Count lines in file
function countFileLines(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  if (filePath.endsWith('.json')) {
    try {
      const json = JSON.parse(content);
      const formatted = JSON.stringify(json, null, 2);
      return formatted.split('\n').length;
    } catch {
      return content.split('\n').length;
    }
  }
  return content.split('\n').length;
}

// Analyze project-specific state
function analyzeProjectState() {
  const branch = getCurrentBranch();
  const gitStatus = getGitStatus();
  const commits = getRecentCommits(5);

  // Project-specific feature detection
  const features = {
    {{PROJECT_FEATURES}}
  };

  return {
    projectType: '{{PROJECT_TYPE}}',
    branch,
    gitStatus,
    commits,
    features,
    timestamp: new Date().toISOString()
  };
}

// Update session context
function updateSessionContext(state) {
  ensureDirectories();

  // Check if archiving needed
  const currentLines = countFileLines(SESSION_CONTEXT_FILE);
  if (currentLines > SESSION_MAX_LINES && fs.existsSync(SESSION_CONTEXT_FILE)) {
    const archiveFilename = archiveFile(SESSION_CONTEXT_FILE, SESSION_LOGS_DIR, 'session-context.md');
    if (archiveFilename) {
      console.log(`${colors.yellow}📦 Archived session context to ${archiveFilename} (${currentLines} lines)${colors.reset}`);
    }
  }

  const now = new Date();
  const timestamp = now.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  let content = '';
  if (fs.existsSync(SESSION_CONTEXT_FILE) && currentLines <= SESSION_MAX_LINES) {
    content = fs.readFileSync(SESSION_CONTEXT_FILE, 'utf8');
    // Remove footer if present
    content = content.replace(/\n---\n\*For archived sessions.*$/s, '');
  } else {
    content = `# {{PROJECT_NAME}} Session Context

## Project Overview
{{PROJECT_DESCRIPTION}}

## Current Status
- Project type: {{PROJECT_TYPE}}
- Save/Load tools version: 1.0.0
- Generated from Genie

---
`;
  }

  // Build session update
  const sessionUpdate = [`
## Session ${timestamp}
**Branch**: ${state.branch}
**Git Status**: ${state.gitStatus.total} files changed (${state.gitStatus.modified.length}M, ${state.gitStatus.added.length}A, ${state.gitStatus.deleted.length}D)
`];

  if (state.gitStatus.modified.length > 0) {
    sessionUpdate.push('### Files Modified:');
    state.gitStatus.modified.slice(0, 10).forEach(f => sessionUpdate.push(`- ${f}`));
    if (state.gitStatus.modified.length > 10) {
      sessionUpdate.push(`- ... and ${state.gitStatus.modified.length - 10} more`);
    }
  }

  if (state.gitStatus.added.length > 0) {
    sessionUpdate.push('\n### Files Added:');
    state.gitStatus.added.slice(0, 10).forEach(f => sessionUpdate.push(`- ${f}`));
    if (state.gitStatus.added.length > 10) {
      sessionUpdate.push(`- ... and ${state.gitStatus.added.length - 10} more`);
    }
  }

  if (state.commits.length > 0) {
    sessionUpdate.push('\n### Recent Commits:');
    state.commits.forEach(c => sessionUpdate.push(`- ${c.hash} ${c.message}`));
  }

  // Add project-specific features section
  sessionUpdate.push('\n### Project Features:');
  {{PROJECT_FEATURES_DISPLAY}}

  sessionUpdate.push('\n---');

  // Add footer with archive reference
  const footer = `\n---\n*For archived sessions, see ./docs/project/session-logs/*`;

  content += sessionUpdate.join('\n') + footer;

  fs.writeFileSync(SESSION_CONTEXT_FILE, content);

  return { lines: content.split('\n').length };
}

// Update todo.json
function updateTodoFile(state) {
  ensureDirectories();

  // Check if archiving needed
  const currentLines = countFileLines(TODO_FILE);
  if (currentLines > JSON_MAX_LINES && fs.existsSync(TODO_FILE)) {
    const archiveFilename = archiveFile(TODO_FILE, TODO_LOGS_DIR, 'todo.json');
    if (archiveFilename) {
      console.log(`${colors.yellow}📦 Archived todo.json to ${archiveFilename} (${currentLines} lines)${colors.reset}`);
      // Start fresh
      fs.writeFileSync(TODO_FILE, JSON.stringify({
        metadata: {},
        tasks: [],
        inProgress: {},
        _archive_note: "Previous todos archived in ./docs/project/todo-logs/"
      }, null, 2));
    }
  }

  let todoData = {
    tasks: [],
    metadata: {},
    inProgress: {}
  };

  if (fs.existsSync(TODO_FILE)) {
    try {
      todoData = JSON.parse(fs.readFileSync(TODO_FILE, 'utf8'));
    } catch (e) {
      console.error(`${colors.yellow}Warning: Could not parse todo.json${colors.reset}`);
    }
  }

  // Update metadata
  todoData.metadata = {
    ...todoData.metadata,
    lastUpdated: new Date().toLocaleDateString(),
    lastSync: new Date().toISOString(),
    projectName: '{{PROJECT_NAME}}',
    projectType: '{{PROJECT_TYPE}}',
    branch: state.branch
  };

  // Add save note
  if (!todoData.inProgress) {
    todoData.inProgress = {};
  }
  todoData.inProgress.notes = [
    `Last save: ${new Date().toLocaleString()}`
  ];
  todoData.inProgress.currentFocus = todoData.inProgress.currentFocus || '{{PROJECT_NAME}} development';

  // Ensure archive reference
  todoData._archive_note = "For archived todos, see ./docs/project/todo-logs/";

  fs.writeFileSync(TODO_FILE, JSON.stringify(todoData, null, 2));
}

// Update projects.json
function updateProjectsFile(state) {
  ensureDirectories();

  // Check if archiving needed
  const currentLines = countFileLines(PROJECTS_FILE);
  if (currentLines > JSON_MAX_LINES && fs.existsSync(PROJECTS_FILE)) {
    const archiveFilename = archiveFile(PROJECTS_FILE, PROJECTS_LOGS_DIR, 'projects.json');
    if (archiveFilename) {
      console.log(`${colors.yellow}📦 Archived projects.json to ${archiveFilename} (${currentLines} lines)${colors.reset}`);
      // Start fresh
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify({
        metadata: {},
        projects: [],
        _archive_note: "Previous projects archived in ./docs/project/projects-logs/"
      }, null, 2));
    }
  }

  let projectsData = {
    projects: [],
    metadata: {
      version: '1.0.0',
      projectRoot: PROJECT_ROOT
    }
  };

  if (fs.existsSync(PROJECTS_FILE)) {
    try {
      projectsData = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    } catch (e) {
      console.error(`${colors.yellow}Warning: Could not parse projects.json${colors.reset}`);
    }
  }

  // Update metadata
  projectsData.metadata.lastUpdated = new Date().toLocaleDateString();
  projectsData.metadata.lastSync = new Date().toISOString();
  projectsData.metadata.projectName = '{{PROJECT_NAME}}';
  projectsData.metadata.projectType = '{{PROJECT_TYPE}}';
  projectsData.metadata.gitBranch = state.branch;

  // Update or create main project entry
  const mainProject = projectsData.projects.find(p => p.id === '{{PROJECT_ID}}');
  if (mainProject) {
    mainProject.lastUpdated = new Date().toLocaleDateString();
    mainProject.gitStatus = {
      modified: state.gitStatus.modified.length,
      added: state.gitStatus.added.length,
      deleted: state.gitStatus.deleted.length
    };
  } else {
    projectsData.projects.push({
      id: '{{PROJECT_ID}}',
      name: '{{PROJECT_NAME}}',
      type: '{{PROJECT_TYPE}}',
      created: new Date().toLocaleDateString(),
      lastUpdated: new Date().toLocaleDateString(),
      gitStatus: {
        modified: state.gitStatus.modified.length,
        added: state.gitStatus.added.length,
        deleted: state.gitStatus.deleted.length
      }
    });
  }

  // Ensure archive reference
  projectsData._archive_note = "For archived projects, see ./docs/project/projects-logs/";

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsData, null, 2));
}

// Main execution
function main() {
  console.log(`${colors.bright}${colors.cyan}💾 Saving {{PROJECT_NAME}} state...${colors.reset}\n`);
  console.log(`${colors.gray}Analyzing project state...${colors.reset}`);

  const state = analyzeProjectState();

  console.log(`${colors.gray}Updating tracking files...${colors.reset}`);

  const contextResult = updateSessionContext(state);
  updateTodoFile(state);
  updateProjectsFile(state);

  // Display results
  console.log('═══════════════════════════════════════════════════');
  console.log(`${colors.green}${colors.bright}✅ Save Complete${colors.reset}`);
  console.log('═══════════════════════════════════════════════════\n');

  console.log(`${colors.bright}📁 Project:${colors.reset} ${colors.cyan}{{PROJECT_NAME}}${colors.reset} (${colors.yellow}{{PROJECT_TYPE}}${colors.reset})`);
  console.log(`${colors.bright}📝 Session Context:${colors.reset} Updated with ${state.gitStatus.total} file changes`);
  console.log(`${colors.bright}✔️  Todo:${colors.reset} Tasks and metadata updated`);
  console.log(`${colors.bright}📊 Projects:${colors.reset} Project status synchronized\n`);

  console.log(`${colors.bright}🌿 Branch:${colors.reset} ${colors.yellow}${state.branch}${colors.reset}`);
  console.log(`${colors.bright}⏰ Time:${colors.reset} ${new Date().toLocaleTimeString()}\n`);

  // Show line counts
  console.log(`${colors.bright}📏 File Sizes:${colors.reset}`);
  console.log(`  Session: ${countFileLines(SESSION_CONTEXT_FILE)}/${SESSION_MAX_LINES} lines`);
  console.log(`  Todo: ${countFileLines(TODO_FILE)}/${JSON_MAX_LINES} lines`);
  console.log(`  Projects: ${countFileLines(PROJECTS_FILE)}/${JSON_MAX_LINES} lines\n`);

  // Show project-specific status
  {{PROJECT_STATUS_DISPLAY}}

  if (state.gitStatus.total > 0) {
    console.log(`${colors.bright}📄 Changed Files:${colors.reset}`);
    if (state.gitStatus.modified.length > 0) {
      console.log(`  Modified: ${state.gitStatus.modified.slice(0, 3).join(', ')}${state.gitStatus.modified.length > 3 ? ` (+${state.gitStatus.modified.length - 3} more)` : ''}`);
    }
    if (state.gitStatus.added.length > 0) {
      console.log(`  Added: ${state.gitStatus.added.slice(0, 3).join(', ')}${state.gitStatus.added.length > 3 ? ` (+${state.gitStatus.added.length - 3} more)` : ''}`);
    }
    if (state.gitStatus.deleted.length > 0) {
      console.log(`  Deleted: ${state.gitStatus.deleted.slice(0, 3).join(', ')}${state.gitStatus.deleted.length > 3 ? ` (+${state.gitStatus.deleted.length - 3} more)` : ''}`);
    }
  }

  console.log('═══════════════════════════════════════════════════');
}

// Run
main();