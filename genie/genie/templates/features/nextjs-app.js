/**
 * Next.js Application Features
 * For Next.js projects with server-side rendering and app router
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasNextConfig: fs.existsSync(path.join(PROJECT_ROOT, 'next.config.js')) ||
                   fs.existsSync(path.join(PROJECT_ROOT, 'next.config.mjs')),
    hasAppRouter: fs.existsSync(path.join(PROJECT_ROOT, 'app')),
    hasPagesRouter: fs.existsSync(path.join(PROJECT_ROOT, 'pages')),
    hasAPIRoutes: fs.existsSync(path.join(PROJECT_ROOT, 'pages', 'api')) ||
                  fs.existsSync(path.join(PROJECT_ROOT, 'app', 'api')),
    hasPublicAssets: fs.existsSync(path.join(PROJECT_ROOT, 'public')),
    hasComponents: fs.existsSync(path.join(PROJECT_ROOT, 'components')),
    hasStyles: fs.existsSync(path.join(PROJECT_ROOT, 'styles')),
    hasNextBuild: fs.existsSync(path.join(PROJECT_ROOT, '.next'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.yellow + '○';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}⚛️  Next.js Status:\${colors.reset}\`);
  if (state.features.hasNextBuild) {
    console.log(\`  \${colors.green}✓\${colors.reset} Build available\`);
  }
  if (state.features.hasAppRouter) {
    console.log(\`  \${colors.green}✓\${colors.reset} App Router configured\`);
  } else if (state.features.hasPagesRouter) {
    console.log(\`  \${colors.green}✓\${colors.reset} Pages Router configured\`);
  }
  if (state.features.hasAPIRoutes) {
    console.log(\`  \${colors.green}✓\${colors.reset} API routes available\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Load Next.js configuration
function loadNextConfiguration() {
  const pkgFile = path.join(PROJECT_ROOT, 'package.json');
  if (!fs.existsSync(pkgFile)) {
    return { hasPackage: false };
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    return {
      hasPackage: true,
      nextVersion: deps.next || 'unknown',
      reactVersion: deps.react || 'unknown',
      typescriptEnabled: !!deps.typescript,
      tailwindEnabled: !!deps.tailwindcss
    };
  } catch {
    return { hasPackage: false };
  }
}

// Count routes in app router
function countAppRoutes() {
  const appDir = path.join(PROJECT_ROOT, 'app');
  if (!fs.existsSync(appDir)) {
    return { exists: false, routes: [] };
  }

  const routes = [];

  function scanDir(dir, basePath = '') {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !file.startsWith('_') && !file.startsWith('.')) {
          const routePath = basePath + '/' + file;

          // Check for page.js/tsx in this directory
          const pageFiles = ['page.js', 'page.jsx', 'page.ts', 'page.tsx'];
          const hasPage = pageFiles.some(pf =>
            fs.existsSync(path.join(fullPath, pf))
          );

          if (hasPage) {
            routes.push(routePath);
          }

          // Recursively scan subdirectories
          scanDir(fullPath, routePath);
        }
      });
    } catch {}
  }

  scanDir(appDir);

  return {
    exists: true,
    routes: routes,
    count: routes.length
  };
}

// Count pages router routes
function countPageRoutes() {
  const pagesDir = path.join(PROJECT_ROOT, 'pages');
  if (!fs.existsSync(pagesDir)) {
    return { exists: false, routes: [] };
  }

  const routes = [];

  function scanDir(dir, basePath = '') {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'api') {
          scanDir(fullPath, basePath + '/' + file);
        } else if (stat.isFile() && !file.startsWith('_')) {
          const ext = path.extname(file);
          if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
            const routeName = file.replace(ext, '');
            if (routeName !== 'index') {
              routes.push(basePath + '/' + routeName);
            } else if (basePath) {
              routes.push(basePath);
            }
          }
        }
      });
    } catch {}
  }

  scanDir(pagesDir);

  return {
    exists: true,
    routes: routes,
    count: routes.length
  };
}

// Count API routes
function countAPIRoutes() {
  const apiPaths = [
    path.join(PROJECT_ROOT, 'pages', 'api'),
    path.join(PROJECT_ROOT, 'app', 'api')
  ];

  let totalRoutes = [];

  for (const apiPath of apiPaths) {
    if (fs.existsSync(apiPath)) {
      function scanDir(dir, basePath = '') {
        try {
          const files = fs.readdirSync(dir);
          files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              scanDir(fullPath, basePath + '/' + file);
            } else if (stat.isFile()) {
              const ext = path.extname(file);
              if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
                totalRoutes.push('/api' + basePath + '/' + file.replace(ext, ''));
              }
            }
          });
        } catch {}
      }

      scanDir(apiPath);
    }
  }

  return {
    exists: totalRoutes.length > 0,
    routes: totalRoutes,
    count: totalRoutes.length
  };
}

// Check build status
function checkBuildStatus() {
  const nextDir = path.join(PROJECT_ROOT, '.next');
  if (!fs.existsSync(nextDir)) {
    return { built: false };
  }

  try {
    const stat = fs.statSync(nextDir);
    return {
      built: true,
      lastBuild: stat.mtime,
      isRecent: (Date.now() - stat.mtime.getTime()) < 3600000 // within last hour
    };
  } catch {
    return { built: false };
  }
}

// Check for static generation
function checkStaticGeneration() {
  const outDir = path.join(PROJECT_ROOT, 'out');
  return {
    hasStaticExport: fs.existsSync(outDir),
    hasISG: fs.existsSync(path.join(PROJECT_ROOT, '.next', 'cache'))
  };
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display Next.js configuration
function displayNextConfiguration() {
  const config = loadNextConfiguration();

  console.log(\`\${colors.bright}⚛️  Next.js Configuration\${colors.reset}\`);

  if (config.hasPackage) {
    console.log(\`  Next.js: \${colors.cyan}\${config.nextVersion}\${colors.reset}\`);
    console.log(\`  React: \${colors.cyan}\${config.reactVersion}\${colors.reset}\`);

    const features = [];
    if (config.typescriptEnabled) features.push('TypeScript');
    if (config.tailwindEnabled) features.push('Tailwind CSS');

    if (features.length > 0) {
      console.log(\`  Features: \${features.join(', ')}\`);
    }
  } else {
    console.log(\`  \${colors.yellow}No package.json found\${colors.reset}\`);
  }
  console.log('');
}

// Display routing information
function displayRouting() {
  const appRoutes = countAppRoutes();
  const pageRoutes = countPageRoutes();
  const apiRoutes = countAPIRoutes();

  console.log(\`\${colors.bright}🛣️  Routing\${colors.reset}\`);

  if (appRoutes.exists) {
    console.log(\`  App Router: \${colors.cyan}\${appRoutes.count}\${colors.reset} routes\`);
    if (appRoutes.routes.length > 0) {
      appRoutes.routes.slice(0, 3).forEach(route => {
        console.log(\`    • \${route}\`);
      });
      if (appRoutes.routes.length > 3) {
        console.log(\`    ... and \${appRoutes.count - 3} more\`);
      }
    }
  } else if (pageRoutes.exists) {
    console.log(\`  Pages Router: \${colors.cyan}\${pageRoutes.count}\${colors.reset} routes\`);
    if (pageRoutes.routes.length > 0) {
      pageRoutes.routes.slice(0, 3).forEach(route => {
        console.log(\`    • \${route}\`);
      });
      if (pageRoutes.routes.length > 3) {
        console.log(\`    ... and \${pageRoutes.count - 3} more\`);
      }
    }
  } else {
    console.log(\`  \${colors.yellow}No routes configured\${colors.reset}\`);
  }

  if (apiRoutes.exists) {
    console.log(\`  API Routes: \${colors.cyan}\${apiRoutes.count}\${colors.reset} endpoints\`);
    if (apiRoutes.routes.length > 0) {
      apiRoutes.routes.slice(0, 2).forEach(route => {
        console.log(\`    • \${route}\`);
      });
      if (apiRoutes.routes.length > 2) {
        console.log(\`    ... and \${apiRoutes.count - 2} more\`);
      }
    }
  }

  console.log('');
}

// Display build information
function displayBuildStatus() {
  const build = checkBuildStatus();
  const staticGen = checkStaticGeneration();

  console.log(\`\${colors.bright}🏗️  Build Status\${colors.reset}\`);

  if (build.built) {
    console.log(\`  Build: \${colors.green}✓\${colors.reset} Available\`);
    if (build.isRecent) {
      console.log(\`  Last build: \${colors.green}Recent\${colors.reset} (< 1 hour ago)\`);
    } else {
      console.log(\`  Last build: \${build.lastBuild.toLocaleString()}\`);
    }
  } else {
    console.log(\`  Build: \${colors.yellow}○\${colors.reset} Not built yet\`);
  }

  if (staticGen.hasStaticExport) {
    console.log(\`  Static export: \${colors.green}✓\${colors.reset} Available in /out\`);
  }
  if (staticGen.hasISG) {
    console.log(\`  ISR/ISG: \${colors.green}✓\${colors.reset} Cache configured\`);
  }

  console.log('');
}

// Display component structure
function displayComponents() {
  const componentsDir = path.join(PROJECT_ROOT, 'components');
  const libDir = path.join(PROJECT_ROOT, 'lib');
  const utilsDir = path.join(PROJECT_ROOT, 'utils');

  console.log(\`\${colors.bright}📦 Project Structure\${colors.reset}\`);

  let componentCount = 0;
  if (fs.existsSync(componentsDir)) {
    try {
      const files = fs.readdirSync(componentsDir);
      componentCount = files.filter(f =>
        f.endsWith('.js') || f.endsWith('.jsx') ||
        f.endsWith('.ts') || f.endsWith('.tsx')
      ).length;
      console.log(\`  Components: \${colors.cyan}\${componentCount}\${colors.reset} files\`);
    } catch {}
  }

  if (fs.existsSync(libDir)) {
    console.log(\`  Library: \${colors.green}✓\${colors.reset} /lib\`);
  }
  if (fs.existsSync(utilsDir)) {
    console.log(\`  Utils: \${colors.green}✓\${colors.reset} /utils\`);
  }

  console.log('');
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayNextConfiguration();
  displayRouting();
  displayBuildStatus();
  displayComponents();`,

  // Footer commands for load command
  projectFooterCommands: `
  console.log(\`\${colors.dim}Dev: \${colors.bright}npm run dev\${colors.reset}\${colors.dim} | Build: \${colors.bright}npm run build\${colors.reset}\${colors.dim} | Start: \${colors.bright}npm start\${colors.reset}\`);`,

  // Project description
  projectDescription: "Next.js application with server-side rendering and modern React features"
};