/**
 * Node.js API Project Features
 * For Express/Fastify/Koa API services
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasEnvFile: fs.existsSync(path.join(PROJECT_ROOT, '.env')),
    hasRoutesDirectory: fs.existsSync(path.join(PROJECT_ROOT, 'routes')),
    hasControllersDirectory: fs.existsSync(path.join(PROJECT_ROOT, 'controllers')),
    hasModelsDirectory: fs.existsSync(path.join(PROJECT_ROOT, 'models')),
    hasMiddleware: fs.existsSync(path.join(PROJECT_ROOT, 'middleware')),
    hasDatabase: fs.existsSync(path.join(PROJECT_ROOT, 'config', 'database.js')) ||
                 fs.existsSync(path.join(PROJECT_ROOT, 'db.js')),
    hasTests: fs.existsSync(path.join(PROJECT_ROOT, 'tests')) ||
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
  console.log(\`\${colors.bright}🔌 API Status:\${colors.reset}\`);
  if (state.features.hasRoutesDirectory) {
    console.log(\`  \${colors.green}✓\${colors.reset} Routes configured\`);
  }
  if (state.features.hasDatabase) {
    console.log(\`  \${colors.green}✓\${colors.reset} Database configured\`);
  }
  if (state.features.hasTests) {
    console.log(\`  \${colors.green}✓\${colors.reset} Tests available\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Load API routes information
function loadAPIRoutes() {
  const routesDir = path.join(PROJECT_ROOT, 'routes');
  if (!fs.existsSync(routesDir)) {
    return { exists: false, count: 0 };
  }

  try {
    const files = fs.readdirSync(routesDir)
      .filter(f => f.endsWith('.js') || f.endsWith('.ts'));
    return {
      exists: true,
      count: files.length,
      files: files
    };
  } catch {
    return { exists: false, count: 0 };
  }
}

// Check database connection
function checkDatabaseStatus() {
  const envFile = path.join(PROJECT_ROOT, '.env');
  if (!fs.existsSync(envFile)) {
    return { configured: false };
  }

  const content = fs.readFileSync(envFile, 'utf8');
  return {
    configured: content.includes('DATABASE_URL') || content.includes('DB_'),
    hasMongoDB: content.includes('MONGODB') || content.includes('MONGO_'),
    hasPostgres: content.includes('POSTGRES') || content.includes('PG_'),
    hasMySQL: content.includes('MYSQL'),
    hasRedis: content.includes('REDIS')
  };
}

// Get middleware count
function getMiddlewareCount() {
  const middlewareDir = path.join(PROJECT_ROOT, 'middleware');
  if (!fs.existsSync(middlewareDir)) {
    return 0;
  }

  try {
    return fs.readdirSync(middlewareDir)
      .filter(f => f.endsWith('.js') || f.endsWith('.ts')).length;
  } catch {
    return 0;
  }
}

// Check for authentication
function hasAuthentication() {
  const authFiles = [
    'middleware/auth.js',
    'middleware/authentication.js',
    'controllers/auth.js',
    'routes/auth.js'
  ];

  return authFiles.some(file =>
    fs.existsSync(path.join(PROJECT_ROOT, file))
  );
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display API routes
function displayAPIRoutes() {
  const routes = loadAPIRoutes();

  console.log(\`\${colors.bright}🛣️  API Routes\${colors.reset}\`);

  if (routes.exists) {
    console.log(\`  Route files: \${colors.cyan}\${routes.count}\${colors.reset}\`);
    if (routes.files && routes.files.length > 0) {
      routes.files.slice(0, 5).forEach(file => {
        console.log(\`    • \${file}\`);
      });
      if (routes.files.length > 5) {
        console.log(\`    ... and \${routes.files.length - 5} more\`);
      }
    }
  } else {
    console.log(\`  \${colors.yellow}No routes directory found\${colors.reset}\`);
  }
  console.log('');
}

// Display database status
function displayDatabaseStatus() {
  const db = checkDatabaseStatus();

  console.log(\`\${colors.bright}💾 Database Configuration\${colors.reset}\`);

  if (!db.configured) {
    console.log(\`  \${colors.yellow}○\${colors.reset} No database configuration found\`);
  } else {
    console.log(\`  \${colors.green}✓\${colors.reset} Database configured\`);
    if (db.hasMongoDB) console.log(\`    • MongoDB\`);
    if (db.hasPostgres) console.log(\`    • PostgreSQL\`);
    if (db.hasMySQL) console.log(\`    • MySQL\`);
    if (db.hasRedis) console.log(\`    • Redis (cache)\`);
  }
  console.log('');
}

// Display middleware and auth
function displayMiddleware() {
  const middlewareCount = getMiddlewareCount();
  const hasAuth = hasAuthentication();

  console.log(\`\${colors.bright}🔧 Middleware & Security\${colors.reset}\`);

  if (middlewareCount > 0) {
    console.log(\`  Middleware: \${colors.cyan}\${middlewareCount}\${colors.reset} modules\`);
  }

  console.log(\`  Authentication: \${hasAuth ? colors.green + '✓' : colors.yellow + '○'}\${colors.reset}\`);
  console.log('');
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayAPIRoutes();
  displayDatabaseStatus();
  displayMiddleware();`,

  // Footer commands for load command
  projectFooterCommands: `
  console.log(\`\${colors.dim}Start: \${colors.bright}npm start\${colors.reset}\${colors.dim} | Test: \${colors.bright}npm test\${colors.reset}\${colors.dim} | Dev: \${colors.bright}npm run dev\${colors.reset}\`);`,

  // Project description
  projectDescription: "Node.js API service with RESTful endpoints and database integration"
};