#!/usr/bin/env node

/**
 * Universal AI Agent Skills Library CLI
 * 
 * Usage:
 *   npx universal-agent-skills add <skill-name>
 *   npx universal-agent-skills add @bundle/saas
 *   npx universal-agent-skills search <term>
 *   npx universal-agent-skills list
 *   npx universal-agent-skills info <skill-name>
 *   npx universal-agent-skills init
 *   npx universal-agent-skills mcp
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT_DIR, 'scripts', 'catalog.json');
const LOCAL_SKILLS_DIR = path.join(ROOT_DIR, '.agents', 'skills');

// Color helpers
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

function loadCatalog() {
  if (fs.existsSync(CATALOG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    } catch (e) {}
  }
  return { total: 0, skills: [] };
}

const PRESET_BUNDLES = {
  '@bundle/saas': {
    name: 'SaaS Platform & Monetization Starter',
    description: 'Stripe billing, Postgres RLS multi-tenancy, Auth.js, and Vercel deployment',
    skills: [
      'saas-billing-and-stripe',
      'auth-and-session-management',
      'saas-multi-tenancy-architecture',
      'startup-growth',
      'mobile-cross-platform-flutter-react-native',
      'deploy-to-vercel',
      'ui-styling'
    ]
  },
  '@bundle/swarms': {
    name: 'Ruflo Multi-Agent Swarms & Hive Mind',
    description: 'Queen coordination, Byzantine consensus, CRDT sync, and SPARC coding loops',
    skills: [
      'hive-mind',
      'sparc-methodology',
      'agent-byzantine-coordinator',
      'agent-crdt-synchronizer',
      'agent-coordination',
      'agent-sparc-coordinator',
      'agent-implementer-sparc-coder'
    ]
  },
  '@bundle/security': {
    name: 'DevSecOps & Cybersecurity Pentesting',
    description: 'OWASP Top 10 automated testing, Strix security audits, and zero-trust patterns',
    skills: [
      'owasp-top-10-testing',
      'security-audit',
      'security-and-hardening',
      'security-penetration-tester',
      'security-cloud-security-architect',
      'security-secrets-credential-engineer'
    ]
  },
  '@bundle/data-ai': {
    name: 'Data Engineering, RAG & LLM Agents',
    description: 'LangGraph, MCP servers, Polars, dbt, Lakehouse, and PEFT fine-tuning',
    skills: [
      'langgraph-agent-workflows',
      'mcp-server-and-client-builder',
      'embeddings',
      'data-data-scientist',
      'data-data-engineer',
      'database-optimizer'
    ]
  },
  '@bundle/frontend': {
    name: 'UI/UX Pro Max & Modern Design Systems',
    description: 'UI/UX Pro Max, Brutalism, Glassmorphism, animations, and clean components',
    skills: [
      'ui-ux-pro-max',
      'brutalist-skill',
      'design-style-glassmorphism',
      'design-style-clean',
      'design-style-modern',
      'design-system'
    ]
  },
  '@bundle/leadership': {
    name: 'GStack Leadership & Engineering Excellence',
    description: "Garry Tan's CEO/Eng reviews, QA, shipping, and Addy Osmani performance standards",
    skills: [
      'gstack-plan-ceo-review',
      'gstack-plan-eng-review',
      'gstack-plan-design-review',
      'gstack-shipping-readiness',
      'code-review-skill',
      'doubt-driven-development'
    ]
  }
};

const ALIASES = {
  'stripe': 'saas-billing-and-stripe',
  'stripe-billing': 'saas-billing-and-stripe',
  'billing': 'saas-billing-and-stripe',
  'multi-tenancy': 'saas-multi-tenancy-architecture',
  'rls': 'saas-multi-tenancy-architecture',
  'auth': 'auth-and-session-management',
  'sparc': 'sparc-methodology',
  'hive-mind': 'hive-mind',
  'byzantine': 'agent-byzantine-coordinator',
  'owasp': 'owasp-top-10-testing',
  'pentest': 'security-penetration-tester',
  'langgraph': 'langgraph-agent-workflows',
  'mcp': 'mcp-server-and-client-builder',
  'glassmorphism': 'design-style-glassmorphism',
  'ui-ux': 'ui-ux-pro-max',
  'vercel': 'deploy-to-vercel',
  'gstack-ceo': 'gstack-plan-ceo-review',
  'gstack-eng': 'gstack-plan-eng-review',
};

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function installSkill(skillFolder, targetDir) {
  const destAgentsDir = path.join(targetDir, '.agents', 'skills', skillFolder);
  const srcPath = path.join(LOCAL_SKILLS_DIR, skillFolder);

  if (fs.existsSync(srcPath)) {
    copyDirRecursive(srcPath, destAgentsDir);
    return true;
  }
  return false;
}

function printHelp() {
  console.log(`
${c.bold}${c.cyan}⚡ Universal AI Agent Skills Library CLI${c.reset}
${c.gray}Unified standard library of 672 production AI agent skills.${c.reset}

${c.bold}USAGE:${c.reset}
  ${c.green}npx universal-agent-skills${c.reset} <command> [options]
  ${c.green}uas${c.reset} <command> [options]

${c.bold}COMMANDS:${c.reset}
  ${c.yellow}add <skill | @bundle>${c.reset}    Install a specific skill or bundle into ./.agents/skills/
  ${c.yellow}search <term>${c.reset}            Search skills by keyword or category
  ${c.yellow}list [filter]${c.reset}            List all available skills (supports filter)
  ${c.yellow}info <skill>${c.reset}             View detailed description and path for a skill
  ${c.yellow}init${c.reset}                      Interactive setup wizard to configure skill bundles
  ${c.yellow}mcp${c.reset}                       Launch stdio Model Context Protocol (MCP) server

${c.bold}POPULAR BUNDLES:${c.reset}
  ${c.cyan}@bundle/saas${c.reset}        Stripe, Postgres RLS, Next.js, Auth.js, Vercel
  ${c.cyan}@bundle/swarms${c.reset}      Ruflo Queen, SPARC coder, Byzantine consensus, CRDT
  ${c.cyan}@bundle/security${c.reset}    Strix OWASP Top 10, Semgrep, Compliance, Zero-Trust
  ${c.cyan}@bundle/data-ai${c.reset}     LangGraph, MCP, Vector RAG, Polars, dbt
  ${c.cyan}@bundle/frontend${c.reset}    UI/UX Pro Max, Brutalism, Glassmorphism, Tailwind v4
  ${c.cyan}@bundle/leadership${c.reset}  GStack CEO/Eng Review, Ship, Performance, QA

${c.bold}EXAMPLES:${c.reset}
  ${c.gray}# Install Stripe billing skill:${c.reset}
  npx universal-agent-skills add stripe-billing

  ${c.gray}# Install complete SaaS starter bundle:${c.reset}
  npx universal-agent-skills add @bundle/saas

  ${c.gray}# Search for Kubernetes skills:${c.reset}
  npx universal-agent-skills search kubernetes
`);
}

function handleSearch(query) {
  if (!query) {
    console.log(`${c.red}Please provide a search term.${c.reset}`);
    return;
  }
  const catalog = loadCatalog();
  const q = query.toLowerCase();
  const matches = catalog.skills.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.folder.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    (s.category && s.category.toLowerCase().includes(q))
  );

  console.log(`\n${c.bold}${c.cyan}Search Results for "${query}" (${matches.length} matches):${c.reset}\n`);
  if (matches.length === 0) {
    console.log(`${c.gray}No skills matched your query. Try a broader term like 'data', 'cloud', or 'agent'.${c.reset}\n`);
    return;
  }

  matches.slice(0, 20).forEach(s => {
    console.log(`• ${c.bold}${c.green}${s.folder}${c.reset} ${c.gray}(${s.category})${c.reset}`);
    console.log(`  ${s.description.slice(0, 110)}${s.description.length > 110 ? '...' : ''}\n`);
  });

  if (matches.length > 20) {
    console.log(`${c.yellow}...and ${matches.length - 20} more. Refine your search or run 'uas list'.${c.reset}\n`);
  }
}

function handleList(filter) {
  const catalog = loadCatalog();
  let skills = catalog.skills;
  if (filter) {
    const q = filter.toLowerCase();
    skills = skills.filter(s => s.category && s.category.toLowerCase().includes(q));
  }

  console.log(`\n${c.bold}${c.cyan}Universal Skills Catalog (${skills.length} skills):${c.reset}\n`);
  skills.forEach(s => {
    console.log(`${c.bold}${c.green}${s.folder.padEnd(36)}${c.reset} ${c.gray}${s.description.slice(0, 75)}...${c.reset}`);
  });
  console.log(`\n${c.bold}Install any skill with:${c.reset} npx universal-agent-skills add <name>\n`);
}

function handleInfo(skillName) {
  if (!skillName) {
    console.log(`${c.red}Please specify a skill name.${c.reset}`);
    return;
  }
  const catalog = loadCatalog();
  const s = catalog.skills.find(x => x.folder === skillName || x.name === skillName);
  if (!s) {
    console.log(`${c.red}Skill "${skillName}" not found in catalog.${c.reset}`);
    return;
  }

  console.log(`\n${c.bold}${c.cyan}Skill: ${s.name}${c.reset}`);
  console.log(`${c.bold}Folder:${c.reset}      ${s.folder}`);
  console.log(`${c.bold}Category:${c.reset}    ${s.category}`);
  console.log(`${c.bold}Description:${c.reset} ${s.description}\n`);
  console.log(`${c.bold}Installation:${c.reset} npx universal-agent-skills add ${s.folder}\n`);
}

function handleAdd(target, targetDir = process.cwd()) {
  if (!target) {
    console.log(`${c.red}Please specify a skill name or bundle to install.${c.reset}`);
    return;
  }

  // Handle preset bundles
  if (target.startsWith('@bundle/')) {
    const bundleKey = target.toLowerCase();
    const bundle = PRESET_BUNDLES[bundleKey];
    if (!bundle) {
      console.log(`${c.red}Unknown bundle "${target}".${c.reset}`);
      console.log(`Available bundles: ${Object.keys(PRESET_BUNDLES).join(', ')}`);
      return;
    }

    console.log(`\n${c.bold}${c.cyan}📦 Installing Bundle: ${bundle.name}${c.reset}`);
    console.log(`${c.gray}${bundle.description}${c.reset}\n`);

    let installed = 0;
    for (const skill of bundle.skills) {
      const ok = installSkill(skill, targetDir);
      if (ok) {
        console.log(`  ${c.green}✔ Installed:${c.reset} .agents/skills/${skill}`);
        installed++;
      } else {
        console.log(`  ${c.yellow}⚠ Skipped (not found):${c.reset} ${skill}`);
      }
    }
    console.log(`\n${c.bold}${c.green}✅ Success! ${installed} skills installed into .agents/skills/${c.reset}\n`);
    return;
  }

  // Handle all skills
  if (target === '@all' || target === 'all') {
    const catalog = loadCatalog();
    console.log(`\n${c.bold}${c.cyan}📦 Installing all ${catalog.skills.length} skills into .agents/skills/...${c.reset}\n`);
    let installed = 0;
    for (const s of catalog.skills) {
      if (installSkill(s.folder, targetDir)) installed++;
    }
    console.log(`\n${c.bold}${c.green}✅ All ${installed} skills installed successfully!${c.reset}\n`);
    return;
  }

  // Handle single skill (with alias resolution)
  const resolved = ALIASES[target.toLowerCase()] || target;
  const ok = installSkill(resolved, targetDir);
  if (ok) {
    console.log(`\n${c.bold}${c.green}✔ Successfully installed skill:${c.reset} .agents/skills/${resolved}\n`);
  } else {
    console.log(`\n${c.red}Skill "${target}" was not found.${c.reset}`);
    console.log(`Run ${c.cyan}npx universal-agent-skills search ${target}${c.reset} to find matching skills.\n`);
  }
}

function handleInit() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`\n${c.bold}${c.cyan}⚡ Universal AI Agent Skills Initializer${c.reset}\n`);
  console.log(`Select a preset stack to configure for your workspace:\n`);

  const bundles = Object.entries(PRESET_BUNDLES);
  bundles.forEach(([key, val], idx) => {
    console.log(`  ${c.bold}${idx + 1}.${c.reset} ${c.green}${val.name.padEnd(42)}${c.reset} ${c.gray}(${key})${c.reset}`);
    console.log(`     ${c.gray}${val.description}${c.reset}`);
  });
  console.log(`  ${c.bold}${bundles.length + 1}.${c.reset} ${c.yellow}Install Complete Library (672 Skills)${c.reset} ${c.gray}(@bundle/all)${c.reset}\n`);

  rl.question(`${c.bold}Enter choice [1-${bundles.length + 1}]: ${c.reset}`, (answer) => {
    rl.close();
    const num = parseInt(answer.trim(), 10);
    if (num >= 1 && num <= bundles.length) {
      const selected = bundles[num - 1][0];
      handleAdd(selected);
    } else if (num === bundles.length + 1) {
      handleAdd('@all');
    } else {
      console.log(`${c.red}Invalid selection.${c.reset}`);
    }
  });
}

/**
 * Model Context Protocol (MCP) Stdio JSON-RPC Server
 */
function handleMCP() {
  const catalog = loadCatalog();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  function sendResponse(id, result) {
    const msg = JSON.stringify({ jsonrpc: '2.0', id, result });
    process.stdout.write(`Content-Length: ${Buffer.byteLength(msg, 'utf8')}\r\n\r\n${msg}`);
  }

  function sendError(id, code, message) {
    const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
    process.stdout.write(`Content-Length: ${Buffer.byteLength(msg, 'utf8')}\r\n\r\n${msg}`);
  }

  let buffer = '';
  process.stdin.on('data', (chunk) => {
    buffer += chunk.toString();
    while (true) {
      const headerEnd = buffer.indexOf('\r\n\r\n');
      if (headerEnd === -1) break;
      const headers = buffer.slice(0, headerEnd);
      const match = headers.match(/Content-Length:\s*(\d+)/i);
      if (!match) {
        buffer = buffer.slice(headerEnd + 4);
        continue;
      }
      const len = parseInt(match[1], 10);
      const bodyStart = headerEnd + 4;
      if (buffer.length < bodyStart + len) break;
      const body = buffer.slice(bodyStart, bodyStart + len);
      buffer = buffer.slice(bodyStart + len);

      try {
        const req = JSON.parse(body);
        const { id, method, params } = req;

        if (method === 'initialize') {
          sendResponse(id, {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'universal-agent-skills', version: '1.0.0' }
          });
        } else if (method === 'tools/list') {
          sendResponse(id, {
            tools: [
              {
                name: 'search_skills',
                description: 'Search the library of 672 production AI agent skills by keyword or domain.',
                inputSchema: {
                  type: 'object',
                  properties: { query: { type: 'string', description: 'Keyword or domain to search for (e.g., stripe, swarm, security, gis)' } },
                  required: ['query']
                }
              },
              {
                name: 'get_skill',
                description: 'Retrieve the complete SKILL.md markdown prompt and engineering playbook for a skill.',
                inputSchema: {
                  type: 'object',
                  properties: { skill_name: { type: 'string', description: 'Exact skill folder name' } },
                  required: ['skill_name']
                }
              },
              {
                name: 'list_categories',
                description: 'List all 14 skill categories and their skill counts.',
                inputSchema: { type: 'object', properties: {} }
              }
            ]
          });
        } else if (method === 'tools/call') {
          const { name, arguments: args } = params;
          if (name === 'search_skills') {
            const q = (args.query || '').toLowerCase();
            const matches = catalog.skills
              .filter(s => s.name.toLowerCase().includes(q) || s.folder.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
              .slice(0, 15)
              .map(s => ({ name: s.name, folder: s.folder, category: s.category, description: s.description }));

            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(matches, null, 2) }]
            });
          } else if (name === 'get_skill') {
            const skillFolder = args.skill_name;
            const skillPath = path.join(LOCAL_SKILLS_DIR, skillFolder, 'SKILL.md');
            if (fs.existsSync(skillPath)) {
              const content = fs.readFileSync(skillPath, 'utf8');
              sendResponse(id, {
                content: [{ type: 'text', text: content }]
              });
            } else {
              sendResponse(id, {
                content: [{ type: 'text', text: `Skill "${skillFolder}" not found.` }],
                isError: true
              });
            }
          } else if (name === 'list_categories') {
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(catalog.categories, null, 2) }]
            });
          } else {
            sendError(id, -32601, `Tool not found: ${name}`);
          }
        } else {
          sendResponse(id, {});
        }
      } catch (err) {
        // Handle malformed JSON
      }
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] ? args[0].toLowerCase() : '';

  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
    printHelp();
    return;
  }

  if (cmd === '--version' || cmd === '-v') {
    const pkg = require(path.join(ROOT_DIR, 'package.json'));
    console.log(`v${pkg.version}`);
    return;
  }

  if (cmd === 'search' || cmd === 'find') {
    handleSearch(args.slice(1).join(' '));
  } else if (cmd === 'list' || cmd === 'ls') {
    handleList(args[1]);
  } else if (cmd === 'info' || cmd === 'view') {
    handleInfo(args[1]);
  } else if (cmd === 'add' || cmd === 'install' || cmd === 'i') {
    handleAdd(args[1]);
  } else if (cmd === 'init') {
    handleInit();
  } else if (cmd === 'mcp' || cmd === 'serve') {
    handleMCP();
  } else {
    // If user passed a skill directly: npx universal-agent-skills stripe-billing
    if (args[0] && !args[0].startsWith('-')) {
      handleAdd(args[0]);
    } else {
      printHelp();
    }
  }
}

main();
