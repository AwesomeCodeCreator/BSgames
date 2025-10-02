/**
 * Template Engine Utility
 * Processes templates with placeholders and generates customized scripts
 */

const fs = require('fs');
const path = require('path');

class TemplateEngine {
  constructor(templatesDir) {
    this.templatesDir = templatesDir;
    this.cache = new Map();
  }

  /**
   * Process a template file with given variables
   */
  processTemplate(templatePath, variables) {
    const template = this.loadTemplate(templatePath);
    return this.replaceVariables(template, variables);
  }

  /**
   * Load template from file (with caching)
   */
  loadTemplate(templatePath) {
    if (this.cache.has(templatePath)) {
      return this.cache.get(templatePath);
    }

    const fullPath = path.join(this.templatesDir, templatePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    const template = fs.readFileSync(fullPath, 'utf8');
    this.cache.set(templatePath, template);
    return template;
  }

  /**
   * Replace all placeholders in template with values
   */
  replaceVariables(template, variables) {
    let result = template;

    // Replace simple variables {{VAR_NAME}}
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(placeholder, value);
    });

    return result;
  }

  /**
   * Generate save script from template
   */
  generateSaveScript(projectType, config) {
    const baseTemplate = this.loadTemplate('base/project-save.template.js');
    const features = this.loadFeatures(projectType);

    const variables = {
      ...config,
      PROJECT_NAME: config.projectName,
      PROJECT_TYPE: config.projectType,
      PROJECT_ID: this.generateProjectId(config.projectName),
      PROJECT_DESCRIPTION: config.description || `${projectType} project`,
      GENERATED_DATE: new Date().toISOString(),
      SESSION_MAX_LINES: config.sessionMaxLines || 300,
      JSON_MAX_LINES: config.jsonMaxLines || 400,
      PROJECT_FEATURES: features.projectFeatures || '',
      PROJECT_FEATURES_DISPLAY: features.projectFeaturesDisplay || '',
      PROJECT_STATUS_DISPLAY: features.projectStatusDisplay || ''
    };

    return this.replaceVariables(baseTemplate, variables);
  }

  /**
   * Generate load script from template
   */
  generateLoadScript(projectType, config) {
    const baseTemplate = this.loadTemplate('base/project-load.template.js');
    const features = this.loadFeatures(projectType);

    const variables = {
      ...config,
      PROJECT_NAME: config.projectName,
      PROJECT_TYPE: config.projectType,
      PROJECT_ID: this.generateProjectId(config.projectName),
      GENERATED_DATE: new Date().toISOString(),
      PROJECT_STATUS_LOADERS: features.projectStatusLoaders || '',
      PROJECT_STATUS_DISPLAYS: features.projectStatusDisplays || '',
      PROJECT_DISPLAY_CALLS: features.projectDisplayCalls || '',
      PROJECT_FOOTER_COMMANDS: features.projectFooterCommands || ''
    };

    return this.replaceVariables(baseTemplate, variables);
  }

  /**
   * Load feature module for project type
   */
  loadFeatures(projectType) {
    const featurePaths = [
      path.join(this.templatesDir, 'features', `${projectType}.js`),
      path.join(this.templatesDir, 'features', 'generic.js')
    ];

    for (const featurePath of featurePaths) {
      if (fs.existsSync(featurePath)) {
        // Clear require cache to get fresh module
        delete require.cache[featurePath];
        return require(featurePath);
      }
    }

    // Return empty features if no module found
    return {
      projectFeatures: '',
      projectFeaturesDisplay: '',
      projectStatusDisplay: '',
      projectStatusLoaders: '',
      projectStatusDisplays: '',
      projectDisplayCalls: '',
      projectFooterCommands: '',
      projectDescription: 'Software development project'
    };
  }

  /**
   * Generate project ID from name
   */
  generateProjectId(projectName) {
    return projectName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Merge configurations with defaults
   */
  mergeWithDefaults(config, defaults) {
    return {
      ...defaults,
      ...config,
      // Deep merge for nested objects
      features: {
        ...(defaults.features || {}),
        ...(config.features || {})
      }
    };
  }

  /**
   * Validate configuration
   */
  validateConfig(config) {
    const required = ['projectName', 'projectType'];
    const missing = required.filter(field => !config[field]);

    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }

    // Validate numeric values
    if (config.sessionMaxLines && typeof config.sessionMaxLines !== 'number') {
      config.sessionMaxLines = parseInt(config.sessionMaxLines) || 300;
    }

    if (config.jsonMaxLines && typeof config.jsonMaxLines !== 'number') {
      config.jsonMaxLines = parseInt(config.jsonMaxLines) || 400;
    }

    return config;
  }

  /**
   * DEPRECATED - No longer generating wrapper scripts
   * Now using npm scripts in package.json instead
   */
  generateWrappers_DEPRECATED() {
    // Wrapper scripts have been replaced with npm scripts
    // This method is kept for reference but not used
    return {};
  }

  /**
   * Generate initialization files
   */
  generateInitFiles(config) {
    const files = {};

    // Session context
    files['session-context.md'] = `# ${config.projectName} Session Context

## Project Overview
${config.description || 'Project managed with save/load tools'}

## Current Status
- Save/Load tools installed via Genie
- Project type: ${config.projectType}
- Ready for session tracking

---

*For archived sessions, see ./docs/project/session-logs/*
`;

    // Todo JSON
    files['todo.json'] = JSON.stringify({
      tasks: [],
      metadata: {
        projectName: config.projectName,
        projectType: config.projectType,
        lastUpdated: new Date().toLocaleDateString(),
        deployedOn: new Date().toISOString()
      },
      inProgress: {
        currentFocus: `${config.projectName} development`,
        notes: [`Save/Load tools deployed on ${new Date().toLocaleString()}`]
      },
      _archive_note: "For archived todos, see ./docs/project/todo-logs/"
    }, null, 2);

    // Projects JSON
    files['projects.json'] = JSON.stringify({
      projects: [{
        id: this.generateProjectId(config.projectName),
        name: config.projectName,
        type: config.projectType,
        created: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleDateString()
      }],
      metadata: {
        version: '1.0.0',
        projectName: config.projectName,
        deployedOn: new Date().toISOString()
      },
      _archive_note: "For archived projects, see ./docs/project/projects-logs/"
    }, null, 2);

    // Deployment config
    files['.save-load-config.json'] = JSON.stringify({
      ...config,
      deployed: new Date().toISOString(),
      version: '2.0.0',
      deployer: 'genie',
      basedOn: 'proven-implementation-patterns'
    }, null, 2);

    return files;
  }

  /**
   * Clear template cache
   */
  clearCache() {
    this.cache.clear();
  }
}

module.exports = TemplateEngine;