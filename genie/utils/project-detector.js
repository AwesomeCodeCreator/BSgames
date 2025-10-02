/**
 * Project Type Detection Utility
 * Analyzes project structure to determine type
 */

const fs = require('fs');
const path = require('path');

class ProjectDetector {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.projectName = path.basename(projectRoot);
  }

  /**
   * Main detection method
   * Returns detected project type and confidence score
   */
  detect() {
    const detections = this.runAllDetections();
    const bestMatch = this.selectBestMatch(detections);

    return {
      type: bestMatch.type,
      confidence: bestMatch.confidence,
      features: bestMatch.features,
      description: bestMatch.description
    };
  }

  /**
   * Run all detection strategies
   */
  runAllDetections() {
    return [
      this.detectAWSCloud(),
      this.detectReactApp(),
      this.detectNextApp(),
      this.detectNodeAPI(),
      this.detectPythonML(),
      this.detectCLITool(),
      this.detectDockerized(),
      this.detectGeneric()
    ];
  }

  /**
   * AWS Cloud Project Detection
   */
  detectAWSCloud() {
    let score = 0;
    const features = [];

    // Check for AWS configuration
    if (this.hasFile('.env')) {
      const envContent = this.readFile('.env');
      if (envContent.includes('AWS_')) {
        score += 30;
        features.push('AWS credentials');
      }
    }

    // Check for AWS scripts
    const awsScripts = [
      'provision-lightsail.sh',
      'setup-aws.sh',
      'deploy.sh',
      'store-api-keys.sh',
      'validate-env.sh'
    ];

    awsScripts.forEach(script => {
      if (this.hasFile(script)) {
        score += 20;
        features.push(script);
      }
    });

    // Check for knowledge base (common project pattern)
    if (this.hasDirectory('knowledge_base')) {
      score += 25;
      features.push('Knowledge base');
    }

    // Check for Docker compose
    if (this.hasFile('docker-compose.yml')) {
      score += 15;
      features.push('Docker compose');
    }

    return {
      type: 'aws-cloud',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'AWS cloud deployment project with infrastructure automation'
    };
  }

  /**
   * React Application Detection
   */
  detectReactApp() {
    let score = 0;
    const features = [];

    // Check package.json for React
    if (this.hasFile('package.json')) {
      const pkg = this.readJSON('package.json');
      if (pkg && pkg.dependencies) {
        if (pkg.dependencies.react) {
          score += 40;
          features.push('React dependency');
        }
        if (pkg.dependencies['react-dom']) {
          score += 10;
          features.push('React DOM');
        }
        if (pkg.dependencies['create-react-app']) {
          score += 20;
          features.push('Create React App');
        }
      }
    }

    // Check for React files
    const reactFiles = [
      'src/App.js',
      'src/App.jsx',
      'src/App.tsx',
      'src/index.js',
      'src/index.tsx'
    ];

    reactFiles.forEach(file => {
      if (this.hasFile(file)) {
        score += 20;
        features.push(file);
      }
    });

    // Check for public/index.html
    if (this.hasFile('public/index.html')) {
      score += 15;
      features.push('Public HTML');
    }

    return {
      type: 'react-app',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'React web application with component-based architecture'
    };
  }

  /**
   * Next.js Application Detection
   */
  detectNextApp() {
    let score = 0;
    const features = [];

    // Check for Next.js specific files/folders
    if (this.hasDirectory('.next')) {
      score += 50;
      features.push('.next build directory');
    }

    if (this.hasFile('next.config.js') || this.hasFile('next.config.mjs')) {
      score += 40;
      features.push('Next.js config');
    }

    if (this.hasDirectory('pages') || this.hasDirectory('app')) {
      score += 30;
      features.push('Next.js routing');
    }

    // Check package.json for Next.js
    if (this.hasFile('package.json')) {
      const pkg = this.readJSON('package.json');
      if (pkg && pkg.dependencies && pkg.dependencies.next) {
        score += 30;
        features.push('Next.js dependency');
      }
    }

    return {
      type: 'nextjs-app',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'Next.js application with server-side rendering'
    };
  }

  /**
   * Node.js API Detection
   */
  detectNodeAPI() {
    let score = 0;
    const features = [];

    // Check package.json for API frameworks
    if (this.hasFile('package.json')) {
      const pkg = this.readJSON('package.json');
      if (pkg && pkg.dependencies) {
        const apiFrameworks = ['express', 'fastify', 'koa', 'hapi', 'restify'];
        apiFrameworks.forEach(framework => {
          if (pkg.dependencies[framework]) {
            score += 40;
            features.push(`${framework} framework`);
          }
        });
      }
    }

    // Check for API files
    const apiFiles = [
      'server.js',
      'app.js',
      'index.js',
      'api.js'
    ];

    apiFiles.forEach(file => {
      if (this.hasFile(file)) {
        const content = this.readFile(file);
        if (content.includes('express()') || content.includes('listen(')) {
          score += 30;
          features.push(file);
        }
      }
    });

    // Check for API directories
    const apiDirs = ['routes', 'controllers', 'models', 'middleware'];
    apiDirs.forEach(dir => {
      if (this.hasDirectory(dir)) {
        score += 15;
        features.push(`${dir} directory`);
      }
    });

    return {
      type: 'node-api',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'Node.js API service with RESTful endpoints'
    };
  }

  /**
   * Python ML Project Detection
   */
  detectPythonML() {
    let score = 0;
    const features = [];

    // Check for Python files
    if (this.hasFile('requirements.txt')) {
      score += 30;
      features.push('requirements.txt');

      const content = this.readFile('requirements.txt');
      const mlLibraries = [
        'tensorflow', 'keras', 'pytorch', 'torch',
        'scikit-learn', 'sklearn', 'pandas', 'numpy',
        'jupyter', 'notebook', 'matplotlib', 'seaborn'
      ];

      mlLibraries.forEach(lib => {
        if (content.includes(lib)) {
          score += 10;
          features.push(lib);
        }
      });
    }

    // Check for ML directories
    const mlDirs = ['models', 'data', 'notebooks', 'experiments'];
    mlDirs.forEach(dir => {
      if (this.hasDirectory(dir)) {
        score += 20;
        features.push(`${dir} directory`);
      }
    });

    // Check for ML files
    const mlFiles = ['train.py', 'model.py', 'predict.py', 'evaluate.py'];
    mlFiles.forEach(file => {
      if (this.hasFile(file)) {
        score += 15;
        features.push(file);
      }
    });

    return {
      type: 'python-ml',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'Python machine learning project with data science tools'
    };
  }

  /**
   * CLI Tool Detection
   */
  detectCLITool() {
    let score = 0;
    const features = [];

    // Check for bin directory
    if (this.hasDirectory('bin')) {
      score += 40;
      features.push('bin directory');
    }

    // Check package.json for bin field
    if (this.hasFile('package.json')) {
      const pkg = this.readJSON('package.json');
      if (pkg && pkg.bin) {
        score += 50;
        features.push('CLI entry point');
      }

      // Check for CLI libraries
      if (pkg.dependencies) {
        const cliLibs = ['commander', 'yargs', 'inquirer', 'chalk', 'ora'];
        cliLibs.forEach(lib => {
          if (pkg.dependencies[lib]) {
            score += 15;
            features.push(lib);
          }
        });
      }
    }

    // Check for CLI files
    if (this.hasFile('cli.js') || this.hasFile('cli.ts')) {
      score += 30;
      features.push('CLI script');
    }

    return {
      type: 'cli-tool',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'Command-line tool with terminal interface'
    };
  }

  /**
   * Dockerized Project Detection
   */
  detectDockerized() {
    let score = 0;
    const features = [];

    if (this.hasFile('Dockerfile')) {
      score += 40;
      features.push('Dockerfile');
    }

    if (this.hasFile('docker-compose.yml') || this.hasFile('docker-compose.yaml')) {
      score += 40;
      features.push('Docker Compose');
    }

    if (this.hasFile('.dockerignore')) {
      score += 10;
      features.push('.dockerignore');
    }

    if (this.hasDirectory('.docker')) {
      score += 10;
      features.push('.docker directory');
    }

    return {
      type: 'docker-project',
      score,
      confidence: Math.min(score / 100, 1),
      features,
      description: 'Containerized application with Docker'
    };
  }

  /**
   * Generic Project Detection (fallback)
   */
  detectGeneric() {
    const features = [];

    if (this.hasFile('README.md')) {
      features.push('README');
    }
    if (this.hasFile('package.json')) {
      features.push('Node.js project');
    }
    if (this.hasFile('requirements.txt')) {
      features.push('Python project');
    }
    if (this.hasDirectory('.git')) {
      features.push('Git repository');
    }

    return {
      type: 'generic',
      score: 10,
      confidence: 0.1,
      features,
      description: 'General purpose software project'
    };
  }

  /**
   * Select best match from all detections
   */
  selectBestMatch(detections) {
    // Sort by score descending
    detections.sort((a, b) => b.score - a.score);

    // If top score is significantly higher, use it
    if (detections[0].score >= 50) {
      return detections[0];
    }

    // Otherwise use generic
    return detections.find(d => d.type === 'generic');
  }

  /**
   * Utility methods
   */
  hasFile(filePath) {
    try {
      const fullPath = path.join(this.projectRoot, filePath);
      return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
    } catch {
      return false;
    }
  }

  hasDirectory(dirPath) {
    try {
      const fullPath = path.join(this.projectRoot, dirPath);
      return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
    } catch {
      return false;
    }
  }

  readFile(filePath) {
    try {
      const fullPath = path.join(this.projectRoot, filePath);
      return fs.readFileSync(fullPath, 'utf8');
    } catch {
      return '';
    }
  }

  readJSON(filePath) {
    try {
      const content = this.readFile(filePath);
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
}

module.exports = ProjectDetector;