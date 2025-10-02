/**
 * CLI Tool Project Features
 * For command-line tools and terminal applications
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasBinDirectory: fs.existsSync(path.join(PROJECT_ROOT, 'bin')),
    hasCLIEntry: fs.existsSync(path.join(PROJECT_ROOT, 'cli.js')) ||
                 fs.existsSync(path.join(PROJECT_ROOT, 'cli.ts')),
    hasCommands: fs.existsSync(path.join(PROJECT_ROOT, 'commands')),
    hasPlugins: fs.existsSync(path.join(PROJECT_ROOT, 'plugins')),
    hasConfig: fs.existsSync(path.join(PROJECT_ROOT, 'config')) ||
               fs.existsSync(path.join(PROJECT_ROOT, '.config')),
    hasTests: fs.existsSync(path.join(PROJECT_ROOT, 'test')) ||
             fs.existsSync(path.join(PROJECT_ROOT, '__tests__'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.yellow + '○';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}⚡ CLI Tool Status:\${colors.reset}\`);
  if (state.features.hasBinDirectory) {
    console.log(\`  \${colors.green}✓\${colors.reset} Executable configured\`);
  }
  if (state.features.hasCommands) {
    console.log(\`  \${colors.green}✓\${colors.reset} Commands available\`);
  }
  if (state.features.hasTests) {
    console.log(\`  \${colors.green}✓\${colors.reset} Tests configured\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Load CLI configuration
function loadCLIConfiguration() {
  const pkgFile = path.join(PROJECT_ROOT, 'package.json');
  if (!fs.existsSync(pkgFile)) {
    return { hasPackage: false };
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
    return {
      hasPackage: true,
      name: pkg.name,
      version: pkg.version,
      bin: pkg.bin || null,
      description: pkg.description
    };
  } catch {
    return { hasPackage: false };
  }
}

// Count available commands
function countCommands() {
  const commandsDir = path.join(PROJECT_ROOT, 'commands');
  if (!fs.existsSync(commandsDir)) {
    // Check alternative locations
    const binDir = path.join(PROJECT_ROOT, 'bin');
    if (fs.existsSync(binDir)) {
      try {
        const files = fs.readdirSync(binDir);
        return {
          exists: true,
          count: files.length,
          location: 'bin',
          files: files.slice(0, 10)
        };
      } catch {
        return { exists: false, count: 0 };
      }
    }
    return { exists: false, count: 0 };
  }

  try {
    const files = fs.readdirSync(commandsDir)
      .filter(f => f.endsWith('.js') || f.endsWith('.ts'));
    return {
      exists: true,
      count: files.length,
      location: 'commands',
      files: files.slice(0, 10)
    };
  } catch {
    return { exists: false, count: 0 };
  }
}

// Check CLI frameworks
function checkCLIFrameworks() {
  const pkgFile = path.join(PROJECT_ROOT, 'package.json');
  if (!fs.existsSync(pkgFile)) {
    return { frameworks: [] };
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const frameworks = [];

    const knownFrameworks = {
      'commander': 'Commander.js',
      'yargs': 'Yargs',
      'inquirer': 'Inquirer.js',
      'chalk': 'Chalk',
      'ora': 'Ora',
      'clack': 'Clack',
      'prompts': 'Prompts',
      'minimist': 'Minimist',
      'meow': 'Meow'
    };

    for (const [lib, name] of Object.entries(knownFrameworks)) {
      if (deps[lib]) {
        frameworks.push(name);
      }
    }

    return { frameworks };
  } catch {
    return { frameworks: [] };
  }
}

// Check for configuration files
function findConfigFiles() {
  const configPatterns = [
    'config.json',
    'config.js',
    '.config.json',
    '.{name}rc',
    '.{name}rc.json',
    '{name}.config.js'
  ];

  const found = [];
  const pkg = loadCLIConfiguration();
  const name = pkg.name || 'cli';

  configPatterns.forEach(pattern => {
    const fileName = pattern.replace('{name}', name);
    if (fs.existsSync(path.join(PROJECT_ROOT, fileName))) {
      found.push(fileName);
    }
  });

  // Check config directory
  const configDir = path.join(PROJECT_ROOT, 'config');
  if (fs.existsSync(configDir)) {
    try {
      const files = fs.readdirSync(configDir);
      files.forEach(file => {
        if (file.endsWith('.json') || file.endsWith('.js')) {
          found.push(\`config/\${file}\`);
        }
      });
    } catch {}
  }

  return found;
}

// Check for global installation
function isGloballyInstallable() {
  const pkg = loadCLIConfiguration();
  return pkg.bin ? true : false;
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display CLI configuration
function displayCLIConfiguration() {
  const config = loadCLIConfiguration();

  console.log(\`\${colors.bright}⚙️  CLI Configuration\${colors.reset}\`);

  if (config.hasPackage) {
    console.log(\`  Name: \${colors.cyan}\${config.name}\${colors.reset}\`);
    console.log(\`  Version: \${colors.cyan}\${config.version}\${colors.reset}\`);
    if (config.bin) {
      const binName = typeof config.bin === 'string' ? config.name : Object.keys(config.bin)[0];
      console.log(\`  Command: \${colors.green}\${binName}\${colors.reset}\`);
    }
    if (config.description) {
      console.log(\`  Description: \${config.description}\`);
    }
  } else {
    console.log(\`  \${colors.yellow}No package.json found\${colors.reset}\`);
  }
  console.log('');
}

// Display available commands
function displayCommands() {
  const commands = countCommands();

  console.log(\`\${colors.bright}📋 Available Commands\${colors.reset}\`);

  if (commands.exists) {
    console.log(\`  Commands: \${colors.cyan}\${commands.count}\${colors.reset} in \${commands.location}/\`);
    if (commands.files && commands.files.length > 0) {
      commands.files.slice(0, 5).forEach(file => {
        const cmdName = file.replace(/\\.(js|ts)$/, '');
        console.log(\`    • \${cmdName}\`);
      });
      if (commands.files.length > 5) {
        console.log(\`    ... and \${commands.count - 5} more\`);
      }
    }
  } else {
    console.log(\`  \${colors.yellow}No commands directory found\${colors.reset}\`);
  }
  console.log('');
}

// Display CLI frameworks
function displayCLIFrameworks() {
  const { frameworks } = checkCLIFrameworks();

  console.log(\`\${colors.bright}🛠️  CLI Frameworks\${colors.reset}\`);

  if (frameworks.length > 0) {
    console.log(\`  Using:\`);
    frameworks.forEach(fw => {
      console.log(\`    • \${fw}\`);
    });
  } else {
    console.log(\`  \${colors.yellow}No CLI frameworks detected\${colors.reset}\`);
  }
  console.log('');
}

// Display configuration
function displayConfigFiles() {
  const configs = findConfigFiles();
  const isGlobal = isGloballyInstallable();

  console.log(\`\${colors.bright}📁 Configuration\${colors.reset}\`);

  if (configs.length > 0) {
    console.log(\`  Config files:\`);
    configs.slice(0, 5).forEach(file => {
      console.log(\`    • \${file}\`);
    });
  } else {
    console.log(\`  Config files: \${colors.yellow}None found\${colors.reset}\`);
  }

  console.log(\`  Global install: \${isGlobal ? colors.green + '✓ Available' : colors.yellow + '○ Not configured'}\${colors.reset}\`);
  console.log('');
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayCLIConfiguration();
  displayCommands();
  displayCLIFrameworks();
  displayConfigFiles();`,

  // Footer commands for load command
  projectFooterCommands: `
  const pkg = loadCLIConfiguration();
  if (pkg.bin) {
    const binName = typeof pkg.bin === 'string' ? pkg.name : Object.keys(pkg.bin)[0];
    console.log(\`\${colors.dim}Install: \${colors.bright}npm link\${colors.reset}\${colors.dim} | Run: \${colors.bright}\${binName} --help\${colors.reset}\${colors.dim} | Test: \${colors.bright}npm test\${colors.reset}\`);
  } else {
    console.log(\`\${colors.dim}Run: \${colors.bright}node cli.js\${colors.reset}\${colors.dim} | Test: \${colors.bright}npm test\${colors.reset}\${colors.dim} | Build: \${colors.bright}npm run build\${colors.reset}\`);
  }`,

  // Project description
  projectDescription: "Command-line tool with terminal interface and command management"
};