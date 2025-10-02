/**
 * Generic Project Features
 * Default fallback for unrecognized project types
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasGitRepo: fs.existsSync(path.join(PROJECT_ROOT, '.git')),
    hasReadme: fs.existsSync(path.join(PROJECT_ROOT, 'README.md')),
    hasPackageJson: fs.existsSync(path.join(PROJECT_ROOT, 'package.json')),
    hasEnvFile: fs.existsSync(path.join(PROJECT_ROOT, '.env')),
    hasDocker: fs.existsSync(path.join(PROJECT_ROOT, 'Dockerfile')) ||
               fs.existsSync(path.join(PROJECT_ROOT, 'docker-compose.yml')),
    hasTests: fs.existsSync(path.join(PROJECT_ROOT, 'tests')) ||
             fs.existsSync(path.join(PROJECT_ROOT, 'test'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.gray + '○';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}📊 Project Configuration:\${colors.reset}\`);
  const featureCount = Object.values(state.features).filter(v => v).length;
  console.log(\`  Features detected: \${colors.cyan}\${featureCount}\${colors.reset}\`);
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Check for common configuration files
function getProjectConfig() {
  const config = {
    hasPackageJson: fs.existsSync(path.join(PROJECT_ROOT, 'package.json')),
    hasRequirementsTxt: fs.existsSync(path.join(PROJECT_ROOT, 'requirements.txt')),
    hasDockerfile: fs.existsSync(path.join(PROJECT_ROOT, 'Dockerfile')),
    hasEnvFile: fs.existsSync(path.join(PROJECT_ROOT, '.env')),
    hasMakefile: fs.existsSync(path.join(PROJECT_ROOT, 'Makefile'))
  };

  // Count configuration files
  config.configFileCount = Object.values(config).filter(v => v).length;

  return config;
}

// Get directory statistics
function getDirectoryStats() {
  try {
    const getAllFiles = (dirPath, arrayOfFiles = []) => {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          if (!file.startsWith('.') && file !== 'node_modules') {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
          }
        } else {
          arrayOfFiles.push(filePath);
        }
      });

      return arrayOfFiles;
    };

    const allFiles = getAllFiles(PROJECT_ROOT);
    const codeFiles = allFiles.filter(f =>
      f.match(/\\.(js|jsx|ts|tsx|py|java|cpp|c|h|go|rs|rb|php|swift|kt|scala)$/)
    );

    return {
      totalFiles: allFiles.length,
      codeFiles: codeFiles.length
    };
  } catch {
    return { totalFiles: 0, codeFiles: 0 };
  }
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display project configuration
function displayProjectConfig() {
  const config = getProjectConfig();

  console.log(\`\${colors.bright}⚙️  Project Configuration\${colors.reset}\`);

  if (config.hasPackageJson) {
    console.log(\`  \${colors.green}✓\${colors.reset} Node.js project (package.json)\`);
  }
  if (config.hasRequirementsTxt) {
    console.log(\`  \${colors.green}✓\${colors.reset} Python project (requirements.txt)\`);
  }
  if (config.hasDockerfile) {
    console.log(\`  \${colors.green}✓\${colors.reset} Docker configuration\`);
  }
  if (config.hasEnvFile) {
    console.log(\`  \${colors.green}✓\${colors.reset} Environment variables\`);
  }
  if (config.hasMakefile) {
    console.log(\`  \${colors.green}✓\${colors.reset} Makefile automation\`);
  }

  if (config.configFileCount === 0) {
    console.log(\`  \${colors.yellow}No standard configuration files detected\${colors.reset}\`);
  }

  console.log('');
}

// Display project statistics
function displayProjectStats() {
  const stats = getDirectoryStats();

  if (stats.totalFiles > 0) {
    console.log(\`\${colors.bright}📈 Project Statistics\${colors.reset}\`);
    console.log(\`  Total files: \${colors.cyan}\${stats.totalFiles}\${colors.reset}\`);
    console.log(\`  Code files: \${colors.cyan}\${stats.codeFiles}\${colors.reset}\`);
    console.log('');
  }
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayProjectConfig();
  displayProjectStats();`,

  // Footer commands for load command
  projectFooterCommands: ``,

  // Project description
  projectDescription: "General purpose software development project"
};