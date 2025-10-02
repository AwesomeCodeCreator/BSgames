/**
 * Docker Project Features
 * For containerized applications with Docker
 */

module.exports = {
  // Feature detection for save command
  projectFeatures: `
    hasDockerfile: fs.existsSync(path.join(PROJECT_ROOT, 'Dockerfile')),
    hasDockerCompose: fs.existsSync(path.join(PROJECT_ROOT, 'docker-compose.yml')) ||
                      fs.existsSync(path.join(PROJECT_ROOT, 'docker-compose.yaml')),
    hasDockerIgnore: fs.existsSync(path.join(PROJECT_ROOT, '.dockerignore')),
    hasDockerFolder: fs.existsSync(path.join(PROJECT_ROOT, '.docker')),
    hasKubernetes: fs.existsSync(path.join(PROJECT_ROOT, 'k8s')) ||
                   fs.existsSync(path.join(PROJECT_ROOT, 'kubernetes')),
    hasHelmChart: fs.existsSync(path.join(PROJECT_ROOT, 'helm')) ||
                  fs.existsSync(path.join(PROJECT_ROOT, 'chart'))`,

  // Feature display for save command
  projectFeaturesDisplay: `
  Object.entries(state.features).forEach(([key, value]) => {
    const icon = value ? colors.green + '✓' : colors.yellow + '○';
    const label = key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').trim();
    sessionUpdate.push(\`  \${icon} \${label}\${colors.reset}\`);
  });`,

  // Status display for save command
  projectStatusDisplay: `
  console.log(\`\${colors.bright}🐳 Docker Status:\${colors.reset}\`);
  if (state.features.hasDockerfile) {
    console.log(\`  \${colors.green}✓\${colors.reset} Dockerfile present\`);
  }
  if (state.features.hasDockerCompose) {
    console.log(\`  \${colors.green}✓\${colors.reset} Docker Compose configured\`);
  }
  if (state.features.hasKubernetes) {
    console.log(\`  \${colors.green}✓\${colors.reset} Kubernetes manifests available\`);
  }
  console.log('');`,

  // Status loaders for load command
  projectStatusLoaders: `
// Check Docker daemon status
function checkDockerStatus() {
  try {
    const { execSync } = require('child_process');
    execSync('docker ps', { stdio: 'pipe' });
    return { running: true, error: null };
  } catch (error) {
    return { running: false, error: 'Docker daemon not running' };
  }
}

// List running containers
function getRunningContainers() {
  try {
    const { execSync } = require('child_process');
    const output = execSync('docker ps --format "{{.Names}}|{{.Status}}|{{.Ports}}"', { encoding: 'utf8' });
    const lines = output.trim().split('\\n').filter(line => line);

    return {
      hasContainers: lines.length > 0,
      containers: lines.map(line => {
        const [name, status, ports] = line.split('|');
        return { name, status, ports };
      })
    };
  } catch {
    return { hasContainers: false, containers: [] };
  }
}

// List Docker images
function getDockerImages() {
  try {
    const { execSync } = require('child_process');
    const output = execSync('docker images --format "{{.Repository}}:{{.Tag}}|{{.Size}}"', { encoding: 'utf8' });
    const lines = output.trim().split('\\n').filter(line => line && !line.includes('<none>'));

    return {
      hasImages: lines.length > 0,
      images: lines.slice(0, 10).map(line => {
        const [name, size] = line.split('|');
        return { name, size };
      }),
      count: lines.length
    };
  } catch {
    return { hasImages: false, images: [], count: 0 };
  }
}

// Parse docker-compose.yml
function parseDockerCompose() {
  const composeFiles = [
    'docker-compose.yml',
    'docker-compose.yaml',
    'compose.yml',
    'compose.yaml'
  ];

  for (const file of composeFiles) {
    const composePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(composePath)) {
      try {
        const content = fs.readFileSync(composePath, 'utf8');

        // Basic parsing of services
        const services = [];
        const lines = content.split('\\n');
        let inServices = false;
        let currentService = null;

        for (const line of lines) {
          if (line.trim() === 'services:') {
            inServices = true;
            continue;
          }
          if (inServices) {
            if (line.match(/^[a-zA-Z]/)) {
              // End of services section
              break;
            }
            const serviceMatch = line.match(/^\\s{2}([a-zA-Z][\\w-]*):$/);
            if (serviceMatch) {
              currentService = serviceMatch[1];
              services.push(currentService);
            }
          }
        }

        return {
          exists: true,
          file: file,
          services: services
        };
      } catch {
        return { exists: false };
      }
    }
  }

  return { exists: false };
}

// Check for Kubernetes resources
function checkKubernetesResources() {
  const k8sDirs = ['k8s', 'kubernetes', '.k8s'];

  for (const dir of k8sDirs) {
    const k8sPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(k8sPath)) {
      try {
        const files = fs.readdirSync(k8sPath);
        const yamlFiles = files.filter(f =>
          f.endsWith('.yaml') || f.endsWith('.yml')
        );

        const resources = {
          deployments: [],
          services: [],
          configmaps: [],
          ingresses: [],
          other: []
        };

        yamlFiles.forEach(file => {
          const lower = file.toLowerCase();
          if (lower.includes('deploy')) {
            resources.deployments.push(file);
          } else if (lower.includes('service') || lower.includes('svc')) {
            resources.services.push(file);
          } else if (lower.includes('configmap') || lower.includes('cm')) {
            resources.configmaps.push(file);
          } else if (lower.includes('ingress')) {
            resources.ingresses.push(file);
          } else {
            resources.other.push(file);
          }
        });

        return {
          exists: true,
          path: dir,
          resources: resources,
          totalFiles: yamlFiles.length
        };
      } catch {
        return { exists: false };
      }
    }
  }

  return { exists: false };
}

// Check Docker volumes
function getDockerVolumes() {
  try {
    const { execSync } = require('child_process');
    const output = execSync('docker volume ls --format "{{.Name}}"', { encoding: 'utf8' });
    const volumes = output.trim().split('\\n').filter(line => line);

    return {
      hasVolumes: volumes.length > 0,
      volumes: volumes.slice(0, 10),
      count: volumes.length
    };
  } catch {
    return { hasVolumes: false, volumes: [], count: 0 };
  }
}`,

  // Status displays for load command
  projectStatusDisplays: `
// Display Docker daemon status
function displayDockerStatus() {
  const docker = checkDockerStatus();

  console.log(\`\${colors.bright}🐳 Docker Environment\${colors.reset}\`);

  if (docker.running) {
    console.log(\`  Docker daemon: \${colors.green}✓ Running\${colors.reset}\`);
  } else {
    console.log(\`  Docker daemon: \${colors.red}✗ Not running\${colors.reset}\`);
    if (docker.error) {
      console.log(\`  Error: \${docker.error}\`);
    }
  }
  console.log('');
}

// Display running containers
function displayContainers() {
  const containers = getRunningContainers();

  console.log(\`\${colors.bright}📦 Containers\${colors.reset}\`);

  if (containers.hasContainers) {
    console.log(\`  Running: \${colors.cyan}\${containers.containers.length}\${colors.reset} container(s)\`);
    containers.containers.slice(0, 5).forEach(container => {
      const statusColor = container.status.includes('Up') ? colors.green : colors.yellow;
      console.log(\`    • \${container.name} \${statusColor}(\${container.status.split(' ')[0]})\${colors.reset}\`);
      if (container.ports) {
        console.log(\`      Ports: \${container.ports}\`);
      }
    });
    if (containers.containers.length > 5) {
      console.log(\`    ... and \${containers.containers.length - 5} more\`);
    }
  } else {
    console.log(\`  \${colors.yellow}No containers running\${colors.reset}\`);
  }
  console.log('');
}

// Display Docker images
function displayImages() {
  const images = getDockerImages();

  console.log(\`\${colors.bright}🖼️  Images\${colors.reset}\`);

  if (images.hasImages) {
    console.log(\`  Available: \${colors.cyan}\${images.count}\${colors.reset} image(s)\`);
    images.images.slice(0, 3).forEach(image => {
      console.log(\`    • \${image.name} (\${image.size})\`);
    });
    if (images.count > 3) {
      console.log(\`    ... and \${images.count - 3} more\`);
    }
  } else {
    console.log(\`  \${colors.yellow}No images available\${colors.reset}\`);
  }
  console.log('');
}

// Display Docker Compose configuration
function displayDockerCompose() {
  const compose = parseDockerCompose();

  if (compose.exists) {
    console.log(\`\${colors.bright}🎼 Docker Compose\${colors.reset}\`);
    console.log(\`  Config: \${colors.cyan}\${compose.file}\${colors.reset}\`);
    if (compose.services.length > 0) {
      console.log(\`  Services: \${compose.services.join(', ')}\`);
    }
    console.log('');
  }
}

// Display Kubernetes resources
function displayKubernetes() {
  const k8s = checkKubernetesResources();

  if (k8s.exists) {
    console.log(\`\${colors.bright}☸️  Kubernetes\${colors.reset}\`);
    console.log(\`  Manifests: \${colors.cyan}\${k8s.totalFiles}\${colors.reset} files in \${k8s.path}/\`);

    if (k8s.resources.deployments.length > 0) {
      console.log(\`  Deployments: \${k8s.resources.deployments.length}\`);
    }
    if (k8s.resources.services.length > 0) {
      console.log(\`  Services: \${k8s.resources.services.length}\`);
    }
    if (k8s.resources.ingresses.length > 0) {
      console.log(\`  Ingresses: \${k8s.resources.ingresses.length}\`);
    }
    console.log('');
  }
}

// Display volumes
function displayVolumes() {
  const volumes = getDockerVolumes();

  if (volumes.hasVolumes) {
    console.log(\`\${colors.bright}💾 Volumes\${colors.reset}\`);
    console.log(\`  Configured: \${colors.cyan}\${volumes.count}\${colors.reset} volume(s)\`);
    if (volumes.volumes.length > 0) {
      volumes.volumes.slice(0, 3).forEach(vol => {
        console.log(\`    • \${vol}\`);
      });
      if (volumes.count > 3) {
        console.log(\`    ... and \${volumes.count - 3} more\`);
      }
    }
    console.log('');
  }
}`,

  // Display calls for load command
  projectDisplayCalls: `
  displayDockerStatus();
  displayContainers();
  displayImages();
  displayDockerCompose();
  displayKubernetes();
  displayVolumes();`,

  // Footer commands for load command
  projectFooterCommands: `
  const compose = parseDockerCompose();
  if (compose.exists) {
    console.log(\`\${colors.dim}Up: \${colors.bright}docker-compose up\${colors.reset}\${colors.dim} | Down: \${colors.bright}docker-compose down\${colors.reset}\${colors.dim} | Logs: \${colors.bright}docker-compose logs\${colors.reset}\`);
  } else {
    console.log(\`\${colors.dim}Build: \${colors.bright}docker build .\${colors.reset}\${colors.dim} | Run: \${colors.bright}docker run\${colors.reset}\${colors.dim} | List: \${colors.bright}docker ps\${colors.reset}\`);
  }`,

  // Project description
  projectDescription: "Containerized application with Docker and orchestration support"
};