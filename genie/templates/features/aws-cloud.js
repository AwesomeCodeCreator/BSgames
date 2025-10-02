/**
 * AWS Cloud Project Features
 * For projects with AWS deployment capabilities
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasAWSConfig: fs.existsSync(path.join(PROJECT_ROOT, '.env')) &&
                  fs.readFileSync(path.join(PROJECT_ROOT, '.env'), 'utf8').includes('AWS'),
    hasKnowledgeBase: fs.existsSync(path.join(PROJECT_ROOT, 'knowledge_base')),
    hasDeploymentScripts: fs.existsSync(path.join(PROJECT_ROOT, 'provision-lightsail.sh')) ||
                         fs.existsSync(path.join(PROJECT_ROOT, 'deploy.sh')),
    hasDockerCompose: fs.existsSync(path.join(PROJECT_ROOT, 'docker-compose.yml')),
    hasSecretsManager: fs.existsSync(path.join(PROJECT_ROOT, 'store-api-keys.sh')),
    hasValidation: fs.existsSync(path.join(PROJECT_ROOT, 'validate-env.sh'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.red + '✗';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}☁️  AWS Status:\${colors.reset}\`);
  if (state.features.hasAWSConfig) {
    console.log(\`  \${colors.green}✓\${colors.reset} AWS credentials configured\`);
    if (state.features.hasDeploymentScripts) {
      console.log(\`  \${colors.green}✓\${colors.reset} Deployment scripts available\`);
    }
    if (state.features.hasSecretsManager) {
      console.log(\`  \${colors.green}✓\${colors.reset} Secrets management configured\`);
    }
  } else {
    console.log(\`  \${colors.yellow}⚠\${colors.reset} AWS not configured\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Load AWS configuration status
function loadAWSStatus() {
  if (!fs.existsSync(ENV_FILE)) {
    return { configured: false };
  }

  const content = fs.readFileSync(ENV_FILE, 'utf8');
  return {
    configured: true,
    hasAWSCredentials: content.includes('AWS_ACCESS_KEY_ID') || content.includes('AWS_REGION'),
    hasOpenAI: content.includes('OPENAI_API_KEY'),
    hasAnthropic: content.includes('ANTHROPIC_API_KEY'),
    region: content.match(/AWS_REGION=([^\\n]+)/)?.[1] || 'not set',
    profile: content.match(/AWS_PROFILE=([^\\n]+)/)?.[1] || 'default'
  };
}

// Load knowledge base status
function loadKnowledgeBaseStatus() {
  const KB_DIR = path.join(PROJECT_ROOT, 'knowledge_base');
  if (!fs.existsSync(KB_DIR)) {
    return { exists: false, documents: 0 };
  }

  try {
    const files = fs.readdirSync(KB_DIR, { recursive: true })
      .filter(f => f.toString().endsWith('.txt') || f.toString().endsWith('.md'));

    return {
      exists: true,
      documents: files.length,
      categories: fs.readdirSync(KB_DIR)
        .filter(f => fs.statSync(path.join(KB_DIR, f)).isDirectory()).length
    };
  } catch {
    return { exists: true, documents: 0, categories: 0 };
  }
}

// Get deployment scripts status
function getDeploymentStatus() {
  const scripts = [
    'setup-aws.sh',
    'provision-lightsail.sh',
    'deploy.sh',
    'validate-env.sh',
    'store-api-keys.sh'
  ];

  const available = scripts.filter(script =>
    fs.existsSync(path.join(PROJECT_ROOT, script))
  );

  return {
    total: scripts.length,
    available: available.length,
    scripts: available
  };
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display AWS status
function displayAWSStatus() {
  const aws = loadAWSStatus();

  console.log(\`\${colors.bright}☁️  AWS Configuration\${colors.reset}\`);

  if (!aws.configured) {
    console.log(\`  \${colors.red}✗ No .env file found\${colors.reset}\`);
  } else {
    console.log(\`  \${aws.hasAWSCredentials ? colors.green + '✓' : colors.red + '✗'} AWS Credentials\${colors.reset}\`);
    if (aws.hasAWSCredentials) {
      console.log(\`  Region: \${colors.cyan}\${aws.region}\${colors.reset}\`);
      console.log(\`  Profile: \${colors.cyan}\${aws.profile}\${colors.reset}\`);
    }
    console.log(\`  \${aws.hasOpenAI ? colors.green + '✓' : colors.yellow + '○'} OpenAI API Key\${colors.reset}\`);
    console.log(\`  \${aws.hasAnthropic ? colors.green + '✓' : colors.yellow + '○'} Anthropic API Key\${colors.reset}\`);
  }
  console.log('');
}

// Display knowledge base status
function displayKnowledgeBase() {
  const kb = loadKnowledgeBaseStatus();

  console.log(\`\${colors.bright}📚 Knowledge Base\${colors.reset}\`);

  if (!kb.exists) {
    console.log(\`  \${colors.yellow}Directory not found\${colors.reset}\`);
  } else {
    console.log(\`  Documents: \${colors.cyan}\${kb.documents}\${colors.reset}\`);
    if (kb.categories > 0) {
      console.log(\`  Categories: \${colors.cyan}\${kb.categories}\${colors.reset}\`);
    }
  }
  console.log('');
}

// Display deployment readiness
function displayDeployment() {
  const deployment = getDeploymentStatus();

  console.log(\`\${colors.bright}🚀 Deployment Readiness\${colors.reset}\`);
  console.log(\`  Scripts: \${colors.cyan}\${deployment.available}/\${deployment.total}\${colors.reset} available\`);

  if (deployment.available > 0) {
    console.log(\`  Available:\`);
    deployment.scripts.slice(0, 4).forEach(script => {
      console.log(\`    \${colors.green}✓\${colors.reset} \${script}\`);
    });
  }
  console.log('');
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayAWSStatus();
  displayKnowledgeBase();
  displayDeployment();`,

  // Footer commands for load command
  projectFooterCommands: `
  console.log(\`\${colors.dim}Deploy: \${colors.bright}./deploy.sh\${colors.reset}\${colors.dim} | Validate: \${colors.bright}./validate-env.sh\${colors.reset}\`);`,

  // Project description
  projectDescription: "AWS cloud deployment project with infrastructure automation and knowledge base management"
};