/**
 * React Application Features
 * For React/Next.js web applications
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasBuildDirectory: fs.existsSync(path.join(PROJECT_ROOT, 'build')) ||
                      fs.existsSync(path.join(PROJECT_ROOT, '.next')),
    hasNodeModules: fs.existsSync(path.join(PROJECT_ROOT, 'node_modules')),
    hasPackageJson: fs.existsSync(path.join(PROJECT_ROOT, 'package.json')),
    hasTests: fs.existsSync(path.join(PROJECT_ROOT, 'src', '__tests__')) ||
             fs.existsSync(path.join(PROJECT_ROOT, 'tests')),
    hasPublicAssets: fs.existsSync(path.join(PROJECT_ROOT, 'public')),
    hasComponents: fs.existsSync(path.join(PROJECT_ROOT, 'src', 'components')) ||
                  fs.existsSync(path.join(PROJECT_ROOT, 'components'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.yellow + '○';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}📦 Build Status:\${colors.reset}\`);
  if (state.features.hasBuildDirectory) {
    console.log(\`  \${colors.green}✓\${colors.reset} Build exists\`);
  } else {
    console.log(\`  \${colors.yellow}○\${colors.reset} No build (run npm/yarn build)\`);
  }
  if (state.features.hasTests) {
    console.log(\`  \${colors.green}✓\${colors.reset} Tests configured\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Load package.json information
function loadPackageInfo() {
  const PACKAGE_FILE = path.join(PROJECT_ROOT, 'package.json');
  if (!fs.existsSync(PACKAGE_FILE)) {
    return null;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_FILE, 'utf8'));
    return {
      name: pkg.name,
      version: pkg.version,
      scripts: Object.keys(pkg.scripts || {}),
      dependencies: Object.keys(pkg.dependencies || {}).length,
      devDependencies: Object.keys(pkg.devDependencies || {}).length
    };
  } catch {
    return null;
  }
}

// Check build status
function getBuildStatus() {
  const buildDirs = ['build', '.next', 'dist'];
  for (const dir of buildDirs) {
    const buildPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(buildPath)) {
      const stats = fs.statSync(buildPath);
      return {
        exists: true,
        dir: dir,
        lastBuilt: stats.mtime
      };
    }
  }
  return { exists: false };
}

// Get component count
function getComponentCount() {
  const componentDirs = [
    path.join(PROJECT_ROOT, 'src', 'components'),
    path.join(PROJECT_ROOT, 'components')
  ];

  for (const dir of componentDirs) {
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir, { recursive: true })
          .filter(f => f.toString().match(/\\.(jsx?|tsx?)$/));
        return files.length;
      } catch {
        return 0;
      }
    }
  }
  return 0;
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display package information
function displayPackageInfo() {
  const pkg = loadPackageInfo();

  if (pkg) {
    console.log(\`\${colors.bright}📦 Package Information\${colors.reset}\`);
    console.log(\`  Name: \${colors.cyan}\${pkg.name}\${colors.reset}\`);
    console.log(\`  Version: \${colors.cyan}\${pkg.version}\${colors.reset}\`);
    console.log(\`  Dependencies: \${colors.cyan}\${pkg.dependencies}\${colors.reset} (\${pkg.devDependencies} dev)\`);

    if (pkg.scripts.length > 0) {
      console.log(\`  Scripts: \${pkg.scripts.slice(0, 5).join(', ')}\${pkg.scripts.length > 5 ? '...' : ''}\`);
    }
    console.log('');
  }
}

// Display build status
function displayBuildStatus() {
  const build = getBuildStatus();
  const components = getComponentCount();

  console.log(\`\${colors.bright}🏗️  Development Status\${colors.reset}\`);

  if (build.exists) {
    console.log(\`  Build: \${colors.green}✓\${colors.reset} \${build.dir} (Last: \${new Date(build.lastBuilt).toLocaleDateString()})\`);
  } else {
    console.log(\`  Build: \${colors.yellow}○\${colors.reset} Not built yet\`);
  }

  console.log(\`  Components: \${colors.cyan}\${components}\${colors.reset} files\`);

  const nodeModules = fs.existsSync(path.join(PROJECT_ROOT, 'node_modules'));
  console.log(\`  Node Modules: \${nodeModules ? colors.green + '✓' : colors.red + '✗'}\${colors.reset}\`);

  console.log('');
}

// Display test status
function displayTestStatus() {
  const testDirs = [
    path.join(PROJECT_ROOT, 'src', '__tests__'),
    path.join(PROJECT_ROOT, 'tests'),
    path.join(PROJECT_ROOT, '__tests__')
  ];

  const hasTests = testDirs.some(dir => fs.existsSync(dir));

  if (hasTests) {
    console.log(\`\${colors.bright}🧪 Test Configuration\${colors.reset}\`);
    console.log(\`  Tests: \${colors.green}✓\${colors.reset} Configured\`);
    console.log(\`  Run: \${colors.cyan}npm test\${colors.reset} or \${colors.cyan}yarn test\${colors.reset}\`);
    console.log('');
  }
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayPackageInfo();
  displayBuildStatus();
  displayTestStatus();`,

  // Footer commands for load command
  projectFooterCommands: `
  console.log(\`\${colors.dim}Dev: \${colors.bright}npm start\${colors.reset}\${colors.dim} | Build: \${colors.bright}npm run build\${colors.reset}\${colors.dim} | Test: \${colors.bright}npm test\${colors.reset}\`);`,

  // Project description
  projectDescription: "React web application with component-based architecture and modern build tools"
};