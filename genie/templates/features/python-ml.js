/**
 * Python ML Project Features
 * For machine learning and data science projects
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasRequirements: fs.existsSync(path.join(PROJECT_ROOT, 'requirements.txt')),
    hasModels: fs.existsSync(path.join(PROJECT_ROOT, 'models')),
    hasNotebooks: fs.existsSync(path.join(PROJECT_ROOT, 'notebooks')),
    hasData: fs.existsSync(path.join(PROJECT_ROOT, 'data')),
    hasExperiments: fs.existsSync(path.join(PROJECT_ROOT, 'experiments')),
    hasTrain: fs.existsSync(path.join(PROJECT_ROOT, 'train.py')),
    hasEvaluate: fs.existsSync(path.join(PROJECT_ROOT, 'evaluate.py'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.yellow + '○';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}🧪 ML Project Status:\${colors.reset}\`);
  if (state.features.hasModels) {
    console.log(\`  \${colors.green}✓\${colors.reset} Models directory present\`);
  }
  if (state.features.hasNotebooks) {
    console.log(\`  \${colors.green}✓\${colors.reset} Notebooks available\`);
  }
  if (state.features.hasData) {
    console.log(\`  \${colors.green}✓\${colors.reset} Data directory configured\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Load Python environment information
function loadPythonEnvironment() {
  const venvPaths = [
    path.join(PROJECT_ROOT, 'venv'),
    path.join(PROJECT_ROOT, '.venv'),
    path.join(PROJECT_ROOT, 'env'),
    path.join(PROJECT_ROOT, '.env')
  ];

  for (const venvPath of venvPaths) {
    if (fs.existsSync(venvPath)) {
      return {
        hasVirtualEnv: true,
        venvPath: path.basename(venvPath)
      };
    }
  }

  return { hasVirtualEnv: false };
}

// Load ML libraries from requirements.txt
function loadMLLibraries() {
  const reqFile = path.join(PROJECT_ROOT, 'requirements.txt');
  if (!fs.existsSync(reqFile)) {
    return { exists: false, libraries: [] };
  }

  const content = fs.readFileSync(reqFile, 'utf8');
  const mlLibs = [];

  const knownLibs = {
    'tensorflow': 'TensorFlow',
    'torch': 'PyTorch',
    'scikit-learn': 'Scikit-learn',
    'pandas': 'Pandas',
    'numpy': 'NumPy',
    'matplotlib': 'Matplotlib',
    'seaborn': 'Seaborn',
    'jupyter': 'Jupyter',
    'notebook': 'Jupyter Notebook',
    'keras': 'Keras',
    'xgboost': 'XGBoost',
    'lightgbm': 'LightGBM'
  };

  for (const [lib, name] of Object.entries(knownLibs)) {
    if (content.includes(lib)) {
      mlLibs.push(name);
    }
  }

  return {
    exists: true,
    libraries: mlLibs
  };
}

// Count models in models directory
function countModels() {
  const modelsDir = path.join(PROJECT_ROOT, 'models');
  if (!fs.existsSync(modelsDir)) {
    return 0;
  }

  try {
    const files = fs.readdirSync(modelsDir);
    return files.filter(f =>
      f.endsWith('.pkl') ||
      f.endsWith('.h5') ||
      f.endsWith('.pt') ||
      f.endsWith('.pth') ||
      f.endsWith('.joblib') ||
      f.endsWith('.model')
    ).length;
  } catch {
    return 0;
  }
}

// Count notebooks
function countNotebooks() {
  const notebooksDir = path.join(PROJECT_ROOT, 'notebooks');
  if (!fs.existsSync(notebooksDir)) {
    return 0;
  }

  try {
    const files = fs.readdirSync(notebooksDir);
    return files.filter(f => f.endsWith('.ipynb')).length;
  } catch {
    return 0;
  }
}

// Check for experiment tracking
function hasExperimentTracking() {
  const mlflowPath = path.join(PROJECT_ROOT, 'mlruns');
  const tensorboardPath = path.join(PROJECT_ROOT, 'logs');
  const wandbPath = path.join(PROJECT_ROOT, 'wandb');

  return {
    mlflow: fs.existsSync(mlflowPath),
    tensorboard: fs.existsSync(tensorboardPath),
    wandb: fs.existsSync(wandbPath)
  };
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display Python environment
function displayPythonEnvironment() {
  const env = loadPythonEnvironment();

  console.log(\`\${colors.bright}🐍 Python Environment\${colors.reset}\`);

  if (env.hasVirtualEnv) {
    console.log(\`  Virtual environment: \${colors.green}✓\${colors.reset} (\${env.venvPath})\`);
  } else {
    console.log(\`  Virtual environment: \${colors.yellow}○\${colors.reset} Not configured\`);
  }
  console.log('');
}

// Display ML libraries
function displayMLLibraries() {
  const libs = loadMLLibraries();

  console.log(\`\${colors.bright}📚 ML Libraries\${colors.reset}\`);

  if (libs.exists && libs.libraries.length > 0) {
    console.log(\`  Installed frameworks:\`);
    libs.libraries.forEach(lib => {
      console.log(\`    • \${lib}\`);
    });
  } else if (libs.exists) {
    console.log(\`  \${colors.yellow}No ML libraries found in requirements.txt\${colors.reset}\`);
  } else {
    console.log(\`  \${colors.yellow}No requirements.txt found\${colors.reset}\`);
  }
  console.log('');
}

// Display model information
function displayModels() {
  const modelCount = countModels();
  const notebookCount = countNotebooks();

  console.log(\`\${colors.bright}🧠 Models & Notebooks\${colors.reset}\`);

  if (modelCount > 0) {
    console.log(\`  Saved models: \${colors.cyan}\${modelCount}\${colors.reset}\`);
  } else {
    console.log(\`  Saved models: \${colors.yellow}0\${colors.reset}\`);
  }

  if (notebookCount > 0) {
    console.log(\`  Notebooks: \${colors.cyan}\${notebookCount}\${colors.reset}\`);
  } else {
    console.log(\`  Notebooks: \${colors.yellow}0\${colors.reset}\`);
  }

  console.log('');
}

// Display experiment tracking
function displayExperimentTracking() {
  const tracking = hasExperimentTracking();

  console.log(\`\${colors.bright}📊 Experiment Tracking\${colors.reset}\`);

  console.log(\`  MLflow: \${tracking.mlflow ? colors.green + '✓' : colors.yellow + '○'}\${colors.reset}\`);
  console.log(\`  TensorBoard: \${tracking.tensorboard ? colors.green + '✓' : colors.yellow + '○'}\${colors.reset}\`);
  console.log(\`  Weights & Biases: \${tracking.wandb ? colors.green + '✓' : colors.yellow + '○'}\${colors.reset}\`);
  console.log('');
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayPythonEnvironment();
  displayMLLibraries();
  displayModels();
  displayExperimentTracking();`,

  // Footer commands for load command
  projectFooterCommands: `
  console.log(\`\${colors.dim}Train: \${colors.bright}python train.py\${colors.reset}\${colors.dim} | Evaluate: \${colors.bright}python evaluate.py\${colors.reset}\${colors.dim} | Notebook: \${colors.bright}jupyter notebook\${colors.reset}\`);`,

  // Project description
  projectDescription: "Python machine learning project with data science tools and experiment tracking"
};