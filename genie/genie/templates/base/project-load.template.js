#!/usr/bin/env node

/**
 * {{PROJECT_NAME}} Project Load Command
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
const ENV_FILE = path.join(PROJECT_ROOT, '.env');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Get current git branch
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'main';
  }
}

// Get git status summary
function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.split('\n').filter(line => line.trim());
    return {
      modified: lines.filter(l => l.startsWith(' M')).length,
      added: lines.filter(l => l.startsWith('??')).length,
      deleted: lines.filter(l => l.startsWith(' D')).length,
      total: lines.length
    };
  } catch {
    return { modified: 0, added: 0, deleted: 0, total: 0 };
  }
}

// Load project-specific status
{{PROJECT_STATUS_LOADERS}}

// Load session context
function loadSessionContext() {
  if (!fs.existsSync(SESSION_CONTEXT_FILE)) {
    return null;
  }

  const content = fs.readFileSync(SESSION_CONTEXT_FILE, 'utf8');
  const lines = content.split('\n');

  // Find the latest session entry
  let latestSession = null;
  let sessionStart = -1;

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('## Session ')) {
      sessionStart = i;
      break;
    }
  }

  if (sessionStart >= 0) {
    const sessionLines = lines.slice(sessionStart, Math.min(sessionStart + 30, lines.length));
    return sessionLines.join('\n');
  }

  return null;
}

// Load todos
function loadTodos() {
  if (!fs.existsSync(TODO_FILE)) {
    return { tasks: [], inProgress: {} };
  }

  try {
    const data = JSON.parse(fs.readFileSync(TODO_FILE, 'utf8'));
    return {
      tasks: data.tasks || [],
      inProgress: data.inProgress || {}
    };
  } catch {
    return { tasks: [], inProgress: {} };
  }
}

// Load projects
function loadProjects() {
  if (!fs.existsSync(PROJECTS_FILE)) {
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    return data.projects || [];
  } catch {
    return [];
  }
}

// Display header
function displayHeader() {
  console.log('\n' + '═'.repeat(70));
  console.log(`  ${colors.bright}${colors.cyan}{{PROJECT_NAME}} Project State${colors.reset} ${colors.dim}({{PROJECT_TYPE}})${colors.reset}`);
  console.log('═'.repeat(70) + '\n');
}

// Display git information
function displayGitInfo() {
  const branch = getCurrentBranch();
  const status = getGitStatus();

  console.log(`${colors.bright}📌 Git Information${colors.reset}`);
  console.log(`  Branch: ${colors.yellow}${branch}${colors.reset}`);

  if (status.total > 0) {
    console.log(`  Changes: ${colors.red}${status.total} files${colors.reset} (${status.modified}M, ${status.added}A, ${status.deleted}D)`);
  } else {
    console.log(`  Changes: ${colors.green}Working tree clean${colors.reset}`);
  }
  console.log('');
}

// Display project-specific status sections
{{PROJECT_STATUS_DISPLAYS}}

// Display active tasks
function displayTasks() {
  const { tasks, inProgress } = loadTodos();
  const activeTasks = tasks.filter(t => t.status !== 'completed');

  if (activeTasks.length > 0 || inProgress.currentFocus) {
    console.log(`${colors.bright}📋 Active Tasks${colors.reset}`);

    if (inProgress.currentFocus) {
      console.log(`  ${colors.cyan}Current Focus: ${inProgress.currentFocus}${colors.reset}`);
    }

    if (activeTasks.length > 0) {
      activeTasks.slice(0, 5).forEach(task => {
        const priority = task.priority === 'high' ? '🔴' :
                        task.priority === 'medium' ? '🟡' : '⚪';
        const status = task.status === 'in_progress' ? colors.yellow + ' [IN PROGRESS]' : '';
        console.log(`  ${priority} ${task.description || task.title || 'Unnamed task'}${status}${colors.reset}`);
      });

      if (activeTasks.length > 5) {
        console.log(`  ${colors.dim}... and ${activeTasks.length - 5} more${colors.reset}`);
      }
    }

    if (inProgress.notes && inProgress.notes.length > 0) {
      console.log(`  ${colors.dim}${inProgress.notes[0]}${colors.reset}`);
    }
    console.log('');
  }
}

// Display recent session
function displayRecentSession() {
  const session = loadSessionContext();

  if (session) {
    console.log(`${colors.bright}📝 Recent Session${colors.reset}`);
    const lines = session.split('\n').slice(0, 10);
    lines.forEach(line => {
      if (line.startsWith('##')) {
        console.log(`  ${colors.cyan}${line}${colors.reset}`);
      } else if (line.startsWith('**')) {
        console.log(`  ${colors.dim}${line}${colors.reset}`);
      } else if (line.startsWith('###')) {
        console.log(`  ${colors.yellow}${line.substring(4)}${colors.reset}`);
      } else {
        console.log(`  ${line}`);
      }
    });
    console.log('');
  }
}

// Display project summary
function displayProjectSummary() {
  const projects = loadProjects();
  const mainProject = projects.find(p => p.id === '{{PROJECT_ID}}');

  if (mainProject) {
    console.log(`${colors.bright}📊 Project Summary${colors.reset}`);
    console.log(`  Created: ${colors.cyan}${mainProject.created || 'Unknown'}${colors.reset}`);
    console.log(`  Last Updated: ${colors.cyan}${mainProject.lastUpdated || 'Unknown'}${colors.reset}`);
    if (mainProject.gitStatus) {
      console.log(`  Git Stats: ${mainProject.gitStatus.modified}M, ${mainProject.gitStatus.added}A, ${mainProject.gitStatus.deleted}D`);
    }
    console.log('');
  }
}

// Display footer with commands
function displayFooter() {
  console.log('═'.repeat(70));
  console.log(`${colors.dim}Commands: ${colors.bright}./save${colors.reset}${colors.dim} to update state | ${colors.bright}./load${colors.reset}${colors.dim} to refresh${colors.reset}`);
  {{PROJECT_FOOTER_COMMANDS}}
  console.log('═'.repeat(70) + '\n');
}

// Main execution
function main() {
  displayHeader();
  displayGitInfo();

  // Project-specific displays
  {{PROJECT_DISPLAY_CALLS}}

  displayTasks();
  displayRecentSession();
  displayProjectSummary();
  displayFooter();
}

// Run
main();