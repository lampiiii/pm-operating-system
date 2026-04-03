// Action Tracker API Server
// Zero dependencies — uses only Node.js built-in modules
// Start: node server.js
// Dashboard: http://localhost:3000

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env (re-reads on each call to pick up changes without restart)
const ENV_FILE = path.join(__dirname, '..', '.env');
function loadEnv() {
  if (fs.existsSync(ENV_FILE)) {
    fs.readFileSync(ENV_FILE, 'utf8').split('\n').forEach(line => {
      const m = line.match(/^\s*([^#=]+?)\s*=\s*"?([^"]*)"?\s*$/);
      if (m) process.env[m[1]] = m[2];
    });
  }
}
loadEnv();

const PORT = 3000;
const DIR = __dirname;
const ACTIVE_FILE = path.join(DIR, 'active-tasks.md');
const COMPLETED_FILE = path.join(DIR, 'completed-tasks.md');
const DASHBOARD_FILE = path.join(DIR, 'action-tracker-dashboard.html');
const HOMEPAGE_FILE = path.join(DIR, '..', 'velyo', 'pm-workspace-home.html');
const SYNC_DIR = path.join(DIR, '..', 'growth-and-syncs', 'weekly-sync-log');
const SYNC_HUB_FILE = path.join(SYNC_DIR, 'sync-hub.html');
const SYNC_DASHBOARD_FILE = path.join(SYNC_DIR, 'weekly-sync-dashboard.html');
const SYNC_PEOPLE_FILE = path.join(SYNC_DIR, 'people.json');

function readPeople() {
  try { return JSON.parse(fs.readFileSync(SYNC_PEOPLE_FILE, 'utf8')); }
  catch { return []; }
}

function syncFilesFor(personSlug) {
  const dir = path.join(SYNC_DIR, personSlug);
  return {
    active: path.join(dir, 'active-points.md'),
    discussed: path.join(dir, 'discussed-points.md')
  };
}
const PLAYBOOK_FILE = path.join(DIR, '..', 'growth-and-syncs', 'framework-and-mindset', 'strategic-playbook-dashboard.html');
const BACKLOG_ACTIVE_FILE = path.join(DIR, '..', 'products', 'customer-success-management', 'product-ideas-backlogs', 'active-backlog.md');
const BACKLOG_COMPLETED_FILE = path.join(DIR, '..', 'products', 'customer-success-management', 'product-ideas-backlogs', 'completed-backlog.md');
const BACKLOG_DASHBOARD_FILE = path.join(DIR, '..', 'products', 'customer-success-management', 'product-ideas-backlogs', 'backlog-dashboard.html');
const ACTIVITY_LOG_FILE = path.join(DIR, 'claude-code-activity-log.md');
const DOCS_VIEWER_FILE = path.join(DIR, '..', 'velyo', 'docs-viewer.html');
const DRIP_LOG_FILE = path.join(DIR, '..', 'persona-drip', 'drip-log.md');
const DRIP_DIR = path.join(DIR, '..', 'persona-drip', 'drips');
const WORKSPACE_ROOT = path.resolve(DIR, '..');

// ─── SSE clients ───
let sseClients = [];

// ─── Activity log LLM cache ───
let activityCache = { hash: 0, entries: [] };

function broadcastSSE(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  sseClients = sseClients.filter(res => {
    try { res.write(msg); return true; }
    catch { return false; }
  });
}

// ─── File watcher ───
let suppressWatch = false;
fs.watch(ACTIVE_FILE, { persistent: false }, () => {
  if (suppressWatch) return;
  setTimeout(() => broadcastSSE('file-changed', { source: 'disk' }), 200);
});

// ─── Markdown Parser ───
function parseTasks(content) {
  const tasks = [];
  const lines = content.split('\n');
  // Detect columns by checking the header row
  const headerLine = lines.find(l => /^\|.*#.*\|.*Task.*\|/i.test(l));
  const hasFeatureCol = headerLine ? /Feature/i.test(headerLine) : false;
  const hasVisibilityCol = headerLine ? /Visibility/i.test(headerLine) : false;
  for (let i = 0; i < lines.length; i++) {
    let m;
    if (hasFeatureCol && hasVisibilityCol) {
      m = lines[i].match(/^\|\s*(\d+)\s*\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|/);
      if (m) tasks.push({ id: parseInt(m[1]), name: m[2].trim(), due: m[3].trim(), priority: m[4].trim(), status: m[5].trim(), feature: m[6].trim(), visibility: m[7].trim() || 'Active', notes: m[8].trim() });
    } else if (hasFeatureCol) {
      m = lines[i].match(/^\|\s*(\d+)\s*\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|/);
      if (m) tasks.push({ id: parseInt(m[1]), name: m[2].trim(), due: m[3].trim(), priority: m[4].trim(), status: m[5].trim(), feature: m[6].trim(), visibility: 'Active', notes: m[7].trim() });
    } else {
      m = lines[i].match(/^\|\s*(\d+)\s*\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|/);
      if (m) tasks.push({ id: parseInt(m[1]), name: m[2].trim(), due: m[3].trim(), priority: m[4].trim(), status: m[5].trim(), feature: '', visibility: 'Active', notes: m[6].trim() });
    }
    if (!m && tasks.length > 0 && lines[i].trim() && !lines[i].startsWith('|') && !lines[i].startsWith('<!--') && !lines[i].startsWith('#') && !lines[i].startsWith('╔') && !lines[i].startsWith('║') && !lines[i].startsWith('╚')) {
      const continuation = lines[i].replace(/\|\s*$/, '').trim();
      if (continuation) tasks[tasks.length - 1].notes += ' ' + continuation;
    }
  }
  return tasks;
}

function generateMarkdown(tasks) {
  const header = [
    '╔══════════════════════════════════════════════════════════════╗',
    '║                       ACTIVE TASKS                          ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    '| # | Task | Due Date | Priority | Status | Feature | Visibility | Notes |',
    '|---|------|----------|----------|--------|---------|------------|-------|'
  ].join('\n');

  const rows = tasks.map((t, i) => {
    // Sanitize notes: replace newlines with spaces to prevent broken table rows
    const safeNotes = (t.notes || '').replace(/[\r\n]+/g, ' ').trim();
    return `| ${i + 1} | ${t.name} | ${t.due || ''} | ${t.priority} | ${t.status} | ${t.feature || ''} | ${t.visibility || 'Active'} | ${safeNotes} |`;
  }).join('\n');

  const footer = [
    '',
    '<!--',
    'How to use:',
    '- Add tasks with a number, description, due date (YYYY-MM-DD), and priority',
    '- Due date: Only fill if user explicitly provides a deadline',
    '- Priority uses the LNO framework (Shreyas Doshi):',
    '    L (Leverage)  — 10x-100x returns. Go all-in, 100% effort. Outcome-changing.',
    '    N (Neutral)   — 1x returns. Do well enough, ~70% effort. Keeps things moving.',
    '    O (Overhead)  — Necessary but low-value. Do quickly, "good enough."',
    '- Status values: Not Started / In Progress / Blocked / Done',
    '- When a task is marked Done → remove from this file and move to completed-tasks.md with today\'s date',
    '- Renumber remaining tasks after removal to keep sequence clean',
    '-->'
  ].join('\n');

  return header + '\n' + rows + '\n' + footer + '\n';
}

function readTasks() {
  try { return parseTasks(fs.readFileSync(ACTIVE_FILE, 'utf8')); }
  catch { return []; }
}

// ─── Sync Points Parser ───
function parseSyncActive(content) {
  const points = [];
  for (const line of content.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s*\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|/);
    if (m) {
      points.push({
        id: parseInt(m[1]),
        topic: m[2].trim(),
        category: m[3].trim(),
        context: unescapePipe(m[4].trim()),
        addedOn: m[5].trim(),
        status: m[6].trim()
      });
    }
  }
  return points;
}

function parseSyncDiscussed(content) {
  const points = [];
  for (const line of content.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s*\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|/);
    if (m) {
      points.push({
        id: parseInt(m[1]),
        topic: m[2].trim(),
        category: m[3].trim(),
        context: unescapePipe(m[4].trim()),
        discussedOn: m[5].trim(),
        outcome: m[6].trim()
      });
    }
  }
  return points;
}

function generateSyncActiveMarkdown(points) {
  const header = [
    '╔══════════════════════════════════════════════════════════════╗',
    '║             WEEKLY SYNC — ACTIVE DISCUSSION POINTS           ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    '| # | Topic | Category | Context / Details | Added On | Status |',
    '|---|-------|----------|-------------------|----------|--------|'
  ].join('\n');

  const rows = points.map((p, i) =>
    `| ${i + 1} | ${p.topic} | ${p.category} | ${escapePipe(p.context)} | ${p.addedOn || ''} | ${p.status || 'To Discuss'} |`
  ).join('\n');

  const footer = [
    '',
    '<!--',
    'How to use:',
    '- Add points you want to discuss in your next weekly sync with your manager',
    '- Category values:',
    '    Work Item     — Updates, blockers, or questions about current tasks',
    '    Issue         — Problems you\'re facing (process, team, tooling, etc.)',
    '    Feedback      — Seeking or giving feedback',
    '    Career Growth — Growth conversations, goals, skill development',
    '    Decision      — Need manager\'s input or sign-off on a decision',
    '    FYI           — Informational — no action needed, just awareness',
    '- Status values: To Discuss / Ready to Discuss / Discussed',
    '- When a point is marked "Discussed" → remove from this file and move to discussed-points.md with the sync date and any outcome/notes',
    '- Renumber remaining points after removal to keep sequence clean',
    '- Add new points anytime during the week as they come up',
    '-->'
  ].join('\n');

  return header + '\n' + rows + '\n' + footer + '\n';
}

function generateSyncDiscussedMarkdown(points) {
  const header = [
    '╔══════════════════════════════════════════════════════════════╗',
    '║             WEEKLY SYNC — DISCUSSED POINTS LOG               ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    '| # | Topic | Category | Context / Details | Discussed On | Outcome / Next Steps |',
    '|---|-------|----------|-------------------|--------------|----------------------|'
  ].join('\n');

  const rows = points.map((p, i) =>
    `| ${i + 1} | ${p.topic} | ${p.category} | ${escapePipe(p.context)} | ${p.discussedOn || ''} | ${escapePipe(p.outcome)} |`
  ).join('\n');

  const footer = [
    '',
    '<!--',
    'Archive of all points discussed in weekly syncs.',
    '- Points move here from active-points.md once marked "Discussed"',
    '- "Discussed On" = date of the weekly sync when it was covered',
    '- "Outcome / Next Steps" = what was decided, any follow-up actions',
    '- This serves as a running log — never delete entries, only append',
    '- Useful for tracking patterns, revisiting decisions, and preparing for reviews',
    '-->'
  ].join('\n');

  return header + '\n' + rows + '\n' + footer + '\n';
}

function readSyncActive(personSlug) {
  try { return parseSyncActive(fs.readFileSync(syncFilesFor(personSlug).active, 'utf8')); }
  catch { return []; }
}

function readSyncDiscussed(personSlug) {
  try { return parseSyncDiscussed(fs.readFileSync(syncFilesFor(personSlug).discussed, 'utf8')); }
  catch { return []; }
}

function writeSyncActive(personSlug, points) {
  fs.writeFileSync(syncFilesFor(personSlug).active, generateSyncActiveMarkdown(points), 'utf8');
}

function writeSyncDiscussed(personSlug, points) {
  fs.writeFileSync(syncFilesFor(personSlug).discussed, generateSyncDiscussedMarkdown(points), 'utf8');
}

function writeTasks(tasks) {
  suppressWatch = true;
  fs.writeFileSync(ACTIVE_FILE, generateMarkdown(tasks), 'utf8');
  setTimeout(() => { suppressWatch = false; }, 500);
}

function appendCompleted(taskList) {
  const today = new Date().toISOString().slice(0, 10);
  let content = fs.readFileSync(COMPLETED_FILE, 'utf8');
  // Find the last row number
  const existing = parseTasks(content.replace(/Completed/g, 'Priority'));
  let nextNum = existing.length + 1;
  const newRows = taskList.map((t, i) =>
    `| ${nextNum + i} | ${t.name} | ${t.due || ''} | ${today} | Done |`
  ).join('\n');
  // Append before the trailing newline
  content = content.trimEnd() + '\n' + newRows + '\n';
  fs.writeFileSync(COMPLETED_FILE, content, 'utf8');
}

// ─── Backlog parsers ───
function parseBacklogActive() {
  if (!fs.existsSync(BACKLOG_ACTIVE_FILE)) return [];
  const text = fs.readFileSync(BACKLOG_ACTIVE_FILE, 'utf8');
  const rows = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/);
    if (m) rows.push({ id: +m[1], shortDesc: m[2].trim(), description: unescapePipe(m[3].trim()), priority: m[4].trim(), status: m[5].trim() });
  }
  return rows;
}

function parseBacklogCompleted() {
  if (!fs.existsSync(BACKLOG_COMPLETED_FILE)) return [];
  const text = fs.readFileSync(BACKLOG_COMPLETED_FILE, 'utf8');
  const rows = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/);
    if (m) rows.push({ id: +m[1], shortDesc: m[2].trim(), description: unescapePipe(m[3].trim()), completedOn: m[4].trim(), status: m[5].trim() });
  }
  return rows;
}

function generateBacklogActiveMarkdown(items) {
  let md = `╔══════════════════════════════════════════════════════════════╗\n║                      ACTIVE BACKLOG                         ║\n╚══════════════════════════════════════════════════════════════╝\n\n| # | Short Description | Description | Priority | Status |\n|---|-------------------|-------------|----------|--------|\n`;
  items.forEach((item, i) => {
    md += `| ${i + 1} | ${item.shortDesc} | ${escapePipe(item.description)} | ${item.priority || 'N'} | ${item.status || 'Not Started'} |\n`;
  });
  return md;
}

function generateBacklogCompletedMarkdown(items) {
  let md = `╔══════════════════════════════════════════════════════════════╗\n║                    COMPLETED BACKLOG                        ║\n╚══════════════════════════════════════════════════════════════╝\n\n| # | Short Description | Description | Completed | Status |\n|---|-------------------|-------------|-----------|--------|\n`;
  items.forEach((item, i) => {
    md += `| ${i + 1} | ${item.shortDesc} | ${escapePipe(item.description)} | ${item.completedOn || ''} | ${item.status || 'Done'} |\n`;
  });
  return md;
}

function readBacklogActive() { return parseBacklogActive(); }
function readBacklogCompleted() { return parseBacklogCompleted(); }
function writeBacklogActive(items) { fs.writeFileSync(BACKLOG_ACTIVE_FILE, generateBacklogActiveMarkdown(items), 'utf8'); }
function writeBacklogCompleted(items) { fs.writeFileSync(BACKLOG_COMPLETED_FILE, generateBacklogCompletedMarkdown(items), 'utf8'); }

// ─── Pipe escaping for HTML content in markdown tables ───
function escapePipe(str) { return (str || '').replace(/\|/g, '&#124;').replace(/[\r\n]+/g, ' '); }
function unescapePipe(str) { return (str || '').replace(/&#124;/g, '|'); }

// ─── Request helpers ───
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

// ─── File tree helper (for docs viewer) ───
function buildFileTree(dirPath, relativeTo) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];
  // Sort: folders first, then files, both alphabetical
  const sorted = entries
    .filter(e => !e.name.startsWith('.') && e.name !== 'node_modules' && e.name !== 'dist' && e.name !== 'venv' && e.name !== 'packages')
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });
  for (const entry of sorted) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(relativeTo, fullPath);
    if (entry.isDirectory()) {
      const children = buildFileTree(fullPath, relativeTo);
      if (children.length > 0) { // Only include folders that contain .md files (directly or nested)
        result.push({ name: entry.name, path: relPath, type: 'folder', children });
      }
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('CLAUDE') && entry.name !== 'MEMORY.md') {
      result.push({ name: entry.name, path: relPath, type: 'file' });
    }
  }
  return result;
}

// ─── HTTP Server ───
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // ─── Theme sync injection ───
  const THEME_SYNC_SCRIPT = `<script>!function(){var t=localStorage.getItem('portfolio-theme');t&&document.documentElement.setAttribute('data-theme',t)}()</script>`;
  function injectThemeSync(html) {
    return html.replace('<head>', '<head>' + THEME_SYNC_SCRIPT);
  }
  const HTML_HEADERS = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache, no-store, must-revalidate' };
  function serveHTML(res, filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, HTML_HEADERS);
    return res.end(injectThemeSync(html));
  }

  try {
    // ─── Serve HTML pages ───
    if (method === 'GET' && url.pathname === '/') return serveHTML(res, DASHBOARD_FILE);
    if (method === 'GET' && (url.pathname === '/tracker' || url.pathname === '/dashboard')) return serveHTML(res, DASHBOARD_FILE);
    if (method === 'GET' && url.pathname === '/home') return serveHTML(res, HOMEPAGE_FILE);
    // ─── SSE stream ───
    if (method === 'GET' && url.pathname === '/api/events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write('event: connected\ndata: {}\n\n');
      sseClients.push(res);
      req.on('close', () => {
        sseClients = sseClients.filter(c => c !== res);
      });
      return;
    }

    // ─── GET tasks ───
    if (method === 'GET' && url.pathname === '/api/tasks') {
      return json(res, { tasks: readTasks() });
    }

    // ─── POST tasks (full overwrite) ───
    if (method === 'POST' && url.pathname === '/api/tasks') {
      const body = await readBody(req);
      writeTasks(body.tasks || []);
      broadcastSSE('tasks-updated', { source: 'dashboard' });
      return json(res, { ok: true });
    }

    // ─── POST single task ───
    if (method === 'POST' && url.pathname === '/api/task') {
      const body = await readBody(req);
      const tasks = readTasks();
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      const task = {
        id: newId,
        name: body.name || 'Untitled',
        due: body.due || '',
        priority: body.priority || 'N',
        status: body.status || 'Not Started',
        feature: body.feature || '',
        visibility: body.visibility || 'Active',
        notes: (body.notes || '').replace(/[\r\n]+/g, ' ').trim()
      };
      tasks.push(task);
      writeTasks(tasks);
      broadcastSSE('tasks-updated', { source: 'dashboard' });
      return json(res, { ok: true, task });
    }

    // ─── DELETE tasks ───
    if (method === 'DELETE' && url.pathname === '/api/tasks') {
      const body = await readBody(req);
      const ids = new Set(body.ids || []);
      const tasks = readTasks();
      const toDelete = tasks.filter(t => ids.has(t.id));
      const remaining = tasks.filter(t => !ids.has(t.id));
      // Re-number
      remaining.forEach((t, i) => { t.id = i + 1; });
      if (body.archive && toDelete.length > 0) {
        appendCompleted(toDelete);
      }
      writeTasks(remaining);
      broadcastSSE('tasks-updated', { source: 'dashboard' });
      return json(res, { ok: true, deleted: toDelete.length });
    }

    if (method === 'GET' && url.pathname === '/playbook') return serveHTML(res, PLAYBOOK_FILE);
    if (method === 'GET' && url.pathname === '/backlog') return serveHTML(res, BACKLOG_DASHBOARD_FILE);

    // ─── GET drips ───
    if (method === 'GET' && url.pathname === '/api/drips') {
      try {
        // Parse drip log for the index
        const logContent = fs.readFileSync(DRIP_LOG_FILE, 'utf8');
        const drips = [];
        for (const line of logContent.split('\n')) {
          const m = line.match(/^\|\s*(\d+)\s*\|(.*?)\|(.*?)\|(.*?)\|(.*?)\|/);
          if (m) drips.push({ num: parseInt(m[1]), date: m[2].trim(), scenario: m[3].trim(), category: m[4].trim(), segment: m[5].trim() });
        }
        // Sort descending (newest first)
        drips.sort((a, b) => b.num - a.num);
        // Read content for each drip file
        const results = drips.map(d => {
          const filename = `${d.date}-drip-${String(d.num).padStart(3, '0')}.md`;
          const filepath = path.join(DRIP_DIR, filename);
          let content = '';
          try { content = fs.readFileSync(filepath, 'utf8'); } catch {}
          return { ...d, content };
        });
        return json(res, { drips: results });
      } catch (e) {
        return json(res, { drips: [] });
      }
    }

    // ─── GET backlogs ───
    if (method === 'GET' && url.pathname === '/api/backlogs') {
      return json(res, { active: readBacklogActive(), completed: readBacklogCompleted() });
    }

    // ─── POST single backlog item ───
    if (method === 'POST' && url.pathname === '/api/backlog') {
      const body = await readBody(req);
      const items = readBacklogActive();
      const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
      const item = { id: nextId, shortDesc: body.shortDesc || '', description: body.description || '', priority: body.priority || 'N', status: body.status || 'Not Started' };
      items.push(item);
      writeBacklogActive(items);
      broadcastSSE('file-changed', { file: 'active-backlog.md' });
      return json(res, { ok: true, item });
    }

    // ─── POST bulk backlog overwrite ───
    if (method === 'POST' && url.pathname === '/api/backlogs') {
      const body = await readBody(req);
      if (body.items) {
        writeBacklogActive(body.items);
        broadcastSSE('file-changed', { file: 'active-backlog.md' });
        return json(res, { ok: true });
      }
      return json(res, { error: 'Missing items' }, 400);
    }

    // ─── POST complete backlog items ───
    if (method === 'POST' && url.pathname === '/api/backlogs/complete') {
      const body = await readBody(req);
      const ids = new Set(body.ids || []);
      const active = readBacklogActive();
      const toMove = active.filter(i => ids.has(i.id));
      const remaining = active.filter(i => !ids.has(i.id));
      writeBacklogActive(remaining);
      const completed = readBacklogCompleted();
      const today = new Date().toISOString().slice(0, 10);
      toMove.forEach(i => {
        completed.push({ id: completed.length + 1, shortDesc: i.shortDesc, description: i.description, completedOn: body.completedOn || today, status: 'Done' });
      });
      writeBacklogCompleted(completed);
      broadcastSSE('file-changed', { file: 'active-backlog.md' });
      return json(res, { ok: true, moved: toMove.length });
    }

    // ─── DELETE backlog items ───
    if (method === 'DELETE' && url.pathname === '/api/backlogs') {
      const body = await readBody(req);
      const ids = new Set(body.ids || []);
      const items = readBacklogActive().filter(i => !ids.has(i.id));
      writeBacklogActive(items);
      broadcastSSE('file-changed', { file: 'active-backlog.md' });
      return json(res, { ok: true, deleted: ids.size });
    }

    // ─── Sync hub vs per-person dashboard ───
    if (method === 'GET' && url.pathname === '/sync') {
      const person = url.searchParams.get('person');
      if (person) {
        const people = readPeople();
        if (!people.find(p => p.slug === person)) return json(res, { error: 'Unknown person' }, 404);
        return serveHTML(res, SYNC_DASHBOARD_FILE);
      }
      return serveHTML(res, SYNC_HUB_FILE);
    }

    // ─── GET sync people (with live counts) ───
    if (method === 'GET' && url.pathname === '/api/sync-people') {
      const people = readPeople();
      const result = people.map(p => {
        const active = readSyncActive(p.slug);
        const discussed = readSyncDiscussed(p.slug);
        const queued = active.filter(pt => pt.status === 'To Discuss' || pt.status === 'Ready to Discuss').length;
        const lastDiscussed = discussed.length > 0 ? discussed[discussed.length - 1].discussedOn : null;
        return { ...p, activeCount: active.length, queuedCount: queued, lastDiscussed };
      });
      return json(res, { people: result });
    }

    // ─── GET sync points ───
    if (method === 'GET' && url.pathname === '/api/sync-points') {
      const person = url.searchParams.get('person');
      if (person) {
        return json(res, { active: readSyncActive(person), discussed: readSyncDiscussed(person) });
      }
      // Aggregate mode (for homepage nudge)
      const people = readPeople();
      let totalQueued = 0;
      const breakdown = [];
      for (const p of people) {
        const active = readSyncActive(p.slug);
        const queued = active.filter(pt => pt.status === 'To Discuss' || pt.status === 'Ready to Discuss').length;
        totalQueued += queued;
        if (queued > 0) breakdown.push({ name: p.name, slug: p.slug, count: queued });
      }
      return json(res, { totalQueued, breakdown });
    }

    // ─── POST single sync point ───
    if (method === 'POST' && url.pathname === '/api/sync-point') {
      const person = url.searchParams.get('person');
      if (!person) return json(res, { error: 'Missing ?person param' }, 400);
      const body = await readBody(req);
      const points = readSyncActive(person);
      const newId = points.length > 0 ? Math.max(...points.map(p => p.id)) + 1 : 1;
      const point = {
        id: newId,
        topic: body.topic || 'Untitled',
        category: body.category || 'Work Item',
        context: body.context || '',
        addedOn: body.addedOn || new Date().toISOString().slice(0, 10),
        status: 'To Discuss'
      };
      points.push(point);
      writeSyncActive(person, points);
      return json(res, { ok: true, point });
    }

    // ─── POST discuss sync points (move active → discussed) ───
    if (method === 'POST' && url.pathname === '/api/sync-points/discuss') {
      const person = url.searchParams.get('person');
      if (!person) return json(res, { error: 'Missing ?person param' }, 400);
      const body = await readBody(req);
      const ids = new Set(body.ids || []);
      const active = readSyncActive(person);
      const discussed = readSyncDiscussed(person);
      const toMove = active.filter(p => ids.has(p.id));
      const remaining = active.filter(p => !ids.has(p.id));
      remaining.forEach((p, i) => { p.id = i + 1; });
      let nextNum = discussed.length + 1;
      for (const p of toMove) {
        discussed.push({
          id: nextNum++,
          topic: p.topic,
          category: p.category,
          context: p.context,
          discussedOn: body.discussedOn || new Date().toISOString().slice(0, 10),
          outcome: body.outcome || ''
        });
      }
      writeSyncActive(person, remaining);
      writeSyncDiscussed(person, discussed);
      return json(res, { ok: true, moved: toMove.length });
    }

    // ─── PUT sync points (bulk overwrite active) ───
    if (method === 'PUT' && url.pathname === '/api/sync-points') {
      const person = url.searchParams.get('person');
      if (!person) return json(res, { error: 'Missing ?person param' }, 400);
      const body = await readBody(req);
      if (body.active) {
        writeSyncActive(person, body.active);
        broadcastSSE('file-changed', { file: 'active-points.md', person });
        return json(res, { ok: true });
      }
      return json(res, { error: 'Missing active array' }, 400);
    }

    // ─── DELETE sync points ───
    if (method === 'DELETE' && url.pathname === '/api/sync-points') {
      const person = url.searchParams.get('person');
      if (!person) return json(res, { error: 'Missing ?person param' }, 400);
      const body = await readBody(req);
      const ids = new Set(body.ids || []);
      const points = readSyncActive(person);
      const remaining = points.filter(p => !ids.has(p.id));
      remaining.forEach((p, i) => { p.id = i + 1; });
      writeSyncActive(person, remaining);
      return json(res, { ok: true, deleted: points.length - remaining.length });
    }

    // ─── POST extract points from voice transcript via Claude API ───
    if (method === 'POST' && url.pathname === '/api/extract-points') {
      const body = await readBody(req);
      const transcript = body.transcript || '';
      loadEnv();
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return json(res, { error: 'ANTHROPIC_API_KEY not set in .env' }, 500);
      }
      const prompt = `You are a structured data extractor. Extract discussion points from the following voice transcript for a 1:1 meeting with a manager.

For EACH distinct discussion point, return a JSON object with:
- "topic": A concise title (max 10 words)
- "category": One of: "Work Item", "Issue", "Feedback", "Career Growth", "Decision", "FYI"
- "context": The relevant details/context from the transcript for this point

Return a JSON array of objects. If the transcript contains multiple points, return multiple objects. Always return valid JSON only — no markdown, no explanation.

Transcript:
"""
${transcript}
"""`;

      try {
        const payload = JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }]
        });

        // Retry up to 3 times on overloaded (529) responses
        let result;
        for (let attempt = 0; attempt < 3; attempt++) {
          result = await new Promise((resolve, reject) => {
            const req2 = https.request({
              hostname: 'api.anthropic.com',
              path: '/v1/messages',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
              }
            }, (res2) => {
              let data = '';
              res2.on('data', chunk => data += chunk);
              res2.on('end', () => {
                try { resolve({ status: res2.statusCode, body: JSON.parse(data) }); }
                catch { reject(new Error('Invalid API response')); }
              });
            });
            req2.on('error', reject);
            req2.write(payload);
            req2.end();
          });
          if (result.status !== 529) break;
          // Wait before retrying (1s, 2s, 4s)
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        }

        if (result.status === 529) {
          return json(res, { error: 'API is overloaded. Please try again in a moment.' }, 503);
        }

        if (result.body.error) {
          return json(res, { error: result.body.error.message || 'Claude API error' }, 500);
        }

        const text = result.body.content?.[0]?.text || '[]';
        // Extract JSON array from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const points = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        return json(res, { points });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── POST extract tasks from voice transcript via Claude API ───
    if (method === 'POST' && url.pathname === '/api/extract-tasks') {
      const body = await readBody(req);
      const transcript = body.transcript || '';
      loadEnv();
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return json(res, { error: 'ANTHROPIC_API_KEY not set in .env' }, 500);
      }
      const prompt = `You are a structured data extractor. Extract action items/tasks from the following voice transcript.

For EACH distinct task, return a JSON object with:
- "name": A concise task title (max 12 words)
- "priority": One of "L" (Leverage — high-impact, 10x returns), "N" (Neutral — standard work), "O" (Overhead — do quickly, low value)
- "status": One of "Not Started", "In Progress", "Blocked"
- "notes": Any relevant context or details from the transcript
- "due": A due date in YYYY-MM-DD format if mentioned, otherwise empty string

Return a JSON array of objects. Always return valid JSON only — no markdown, no explanation.

Transcript:
"""
${transcript}
"""`;

      try {
        const payload = JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }]
        });

        let result;
        for (let attempt = 0; attempt < 3; attempt++) {
          result = await new Promise((resolve, reject) => {
            const req2 = https.request({
              hostname: 'api.anthropic.com',
              path: '/v1/messages',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
              }
            }, (res2) => {
              let data = '';
              res2.on('data', chunk => data += chunk);
              res2.on('end', () => {
                try { resolve({ status: res2.statusCode, body: JSON.parse(data) }); }
                catch { reject(new Error('Invalid API response')); }
              });
            });
            req2.on('error', reject);
            req2.write(payload);
            req2.end();
          });
          if (result.status !== 529) break;
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        }

        if (result.status === 529) {
          return json(res, { error: 'API is overloaded. Please try again in a moment.' }, 503);
        }

        if (result.body.error) {
          return json(res, { error: result.body.error.message || 'Claude API error' }, 500);
        }

        const text = result.body.content?.[0]?.text || '[]';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const tasks = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        return json(res, { tasks });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── POST extract backlog items from voice transcript ───
    if (method === 'POST' && url.pathname === '/api/extract-backlogs') {
      loadEnv();
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return json(res, { error: 'ANTHROPIC_API_KEY is not set in .env' }, 500);
      const body = await readBody(req);
      const transcript = body.transcript;
      if (!transcript) return json(res, { error: 'No transcript provided' }, 400);
      try {
        const payload = JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 4096,
          messages: [{ role: 'user', content: `Extract product backlog items from this voice transcript. Return a JSON array where each item has these four fields:\n1. "name" — a concise short description / title for the backlog item (required, max ~10 words)\n2. "description" — a detailed explanation of the idea (1-3 sentences)\n3. "priority" — one of "L" (Leverage / high-impact, 10x returns), "N" (Neutral / normal, 1x returns), or "O" (Overhead / low-value, do quickly)\n4. "status" — always "Not Started"\n\nAll four fields are required for every item. Generate all of them from the context provided.\n\nTranscript: "${transcript}"\n\nReturn ONLY a JSON array, no other text.` }]
        });
        let result;
        for (let attempt = 0; attempt < 3; attempt++) {
          result = await new Promise((resolve, reject) => {
            const r = https.request({ hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' } }, (res2) => {
              let data = '';
              res2.on('data', chunk => data += chunk);
              res2.on('end', () => {
                try { resolve({ status: res2.statusCode, body: JSON.parse(data) }); }
                catch { reject(new Error('Invalid API response')); }
              });
            });
            r.on('error', reject);
            r.write(payload);
            r.end();
          });
          if (result.status !== 529) break;
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        }
        if (result.status === 529) return json(res, { error: 'API is overloaded. Please try again in a moment.' }, 503);
        if (result.body.error) return json(res, { error: result.body.error.message }, 500);
        const text = result.body.content?.[0]?.text || '[]';
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const items = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        return json(res, { items });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── Favicon fallback ───
    if (method === 'GET' && url.pathname === '/favicon.ico') {
      const favPath = path.join(DIR, '..', 'velyo', 'resources', 'velyo-favicon.png');
      if (fs.existsSync(favPath)) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        return res.end(fs.readFileSync(favPath));
      }
    }

    // ─── Serve portfolio static files (resources/) ───
    if (method === 'GET' && url.pathname.startsWith('/resources/')) {
      const PORTFOLIO_DIR = path.join(DIR, '..', 'velyo');
      const filePath = path.join(PORTFOLIO_DIR, decodeURIComponent(url.pathname));
      const resolved = path.resolve(filePath);
      // Prevent directory traversal
      if (!resolved.startsWith(path.resolve(PORTFOLIO_DIR))) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        return res.end('Forbidden');
      }
      if (fs.existsSync(resolved)) {
        const ext = path.extname(resolved).toLowerCase();
        const mimeTypes = { '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp' };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        const fileName = path.basename(resolved);
        const isInline = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.js', '.css'].includes(ext);
        const headers = { 'Content-Type': contentType };
        if (!isInline) {
          headers['Content-Disposition'] = `attachment; filename="${fileName}"`;
        }
        res.writeHead(200, headers);
        return fs.createReadStream(resolved).pipe(res);
      }
    }

    // ─── GET activity log (with LLM-shortened summaries, cached) ───
    if (method === 'GET' && url.pathname === '/api/activity-log') {
      try {
        const raw = fs.readFileSync(ACTIVITY_LOG_FILE, 'utf8');
        const lines = raw.split('\n').filter(l => l.startsWith('|') && !l.startsWith('| Date') && !l.startsWith('| ----'));
        const entries = lines.map(l => {
          const cols = l.split('|').map(c => c.trim()).filter(Boolean);
          if (cols.length >= 2) return { date: cols[0], what: cols[1], feature: cols[2] || '', opportunity: cols[3] || '' };
          return null;
        }).filter(Boolean).reverse().slice(0, 10);

        // Check if summaries need generating (cache by hash of entries)
        const entriesHash = entries.map(e => e.what).join('|').length;
        if (activityCache.hash === entriesHash && activityCache.entries.length > 0) {
          return json(res, { entries: activityCache.entries });
        }

        // Try LLM shortening
        loadEnv();
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (apiKey) {
          const prompt = `Shorten each activity description to max 8 words. Keep the core action and subject. Return a JSON array of strings, one per input. No markdown, only valid JSON.

Input:
${JSON.stringify(entries.map(e => e.what))}`;

          try {
            const shortened = await new Promise((resolve, reject) => {
              const payload = JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }]
              });
              const req = https.request({
                hostname: 'api.anthropic.com',
                path: '/v1/messages',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': apiKey,
                  'anthropic-version': '2023-06-01'
                }
              }, apiRes => {
                let d = '';
                apiRes.on('data', c => d += c);
                apiRes.on('end', () => {
                  try {
                    const r = JSON.parse(d);
                    const text = r.content?.[0]?.text || '[]';
                    resolve(JSON.parse(text));
                  } catch { resolve(null); }
                });
              });
              req.on('error', () => resolve(null));
              req.end(payload);
            });

            if (shortened && Array.isArray(shortened) && shortened.length === entries.length) {
              entries.forEach((e, i) => { e.short = shortened[i]; });
            }
          } catch { /* fall through to raw text */ }
        }

        activityCache = { hash: entriesHash, entries };
        return json(res, { entries });
      } catch (e) {
        return json(res, { entries: [] });
      }
    }

    // ─── Docs viewer page ───
    if (method === 'GET' && url.pathname === '/docs') return serveHTML(res, DOCS_VIEWER_FILE);

    // ─── GET file tree ───
    if (method === 'GET' && url.pathname === '/api/files/tree') {
      try {
        const tree = buildFileTree(WORKSPACE_ROOT, WORKSPACE_ROOT);
        return json(res, { tree });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── GET file content (with metadata) ───
    if (method === 'GET' && url.pathname === '/api/files/read') {
      const filePath = url.searchParams.get('path');
      if (!filePath) return json(res, { error: 'Missing path parameter' }, 400);
      const resolved = path.resolve(WORKSPACE_ROOT, filePath);
      if (!resolved.startsWith(WORKSPACE_ROOT)) return json(res, { error: 'Forbidden' }, 403);
      if (!fs.existsSync(resolved)) return json(res, { error: 'File not found' }, 404);
      try {
        const content = fs.readFileSync(resolved, 'utf8');
        const stat = fs.statSync(resolved);
        return json(res, { path: filePath, content, modifiedAt: stat.mtime.toISOString() });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── GET full-text search across .md files ───
    if (method === 'GET' && url.pathname === '/api/files/search') {
      const query = (url.searchParams.get('q') || '').toLowerCase().trim();
      if (!query) return json(res, { results: [] });
      try {
        const results = [];
        function searchDir(dir) {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'venv' || entry.name === 'packages') continue;
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) { searchDir(full); }
            else if (entry.name.endsWith('.md') && !entry.name.startsWith('CLAUDE') && entry.name !== 'MEMORY.md') {
              const content = fs.readFileSync(full, 'utf8');
              const lower = content.toLowerCase();
              const idx = lower.indexOf(query);
              if (idx !== -1) {
                // Extract snippet around match
                const start = Math.max(0, idx - 60);
                const end = Math.min(content.length, idx + query.length + 60);
                const snippet = (start > 0 ? '...' : '') + content.slice(start, end).replace(/\n/g, ' ') + (end < content.length ? '...' : '');
                results.push({ path: path.relative(WORKSPACE_ROOT, full), name: entry.name, snippet });
                if (results.length >= 50) return;
              }
            }
          }
        }
        searchDir(WORKSPACE_ROOT);
        return json(res, { results });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── GET backlinks (files that link to a given file) ───
    if (method === 'GET' && url.pathname === '/api/files/backlinks') {
      const targetPath = url.searchParams.get('path');
      if (!targetPath) return json(res, { error: 'Missing path parameter' }, 400);
      try {
        const targetName = path.basename(targetPath, '.md');
        const backlinks = [];
        function scanDir(dir) {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'venv' || entry.name === 'packages') continue;
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) { scanDir(full); }
            else if (entry.name.endsWith('.md') && !entry.name.startsWith('CLAUDE') && entry.name !== 'MEMORY.md') {
              const rel = path.relative(WORKSPACE_ROOT, full);
              if (rel === targetPath) continue; // skip self
              const content = fs.readFileSync(full, 'utf8');
              // Check for markdown links containing the target filename or path
              if (content.includes(targetPath) || content.includes(targetName + '.md') || content.includes(targetName + ')')) {
                backlinks.push({ path: rel, name: entry.name });
              }
            }
          }
        }
        scanDir(WORKSPACE_ROOT);
        return json(res, { backlinks });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── POST save file content ───
    if (method === 'POST' && url.pathname === '/api/files/write') {
      const body = await readBody(req);
      if (!body.path || typeof body.content !== 'string') return json(res, { error: 'Missing path or content' }, 400);
      const resolved = path.resolve(WORKSPACE_ROOT, body.path);
      if (!resolved.startsWith(WORKSPACE_ROOT)) return json(res, { error: 'Forbidden' }, 403);
      if (!resolved.endsWith('.md')) return json(res, { error: 'Only .md files can be saved' }, 400);
      try {
        fs.writeFileSync(resolved, body.content, 'utf8');
        return json(res, { ok: true });
      } catch (err) {
        return json(res, { error: err.message }, 500);
      }
    }

    // ─── 404 ───
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');

  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`\n  PM Workspace Server`);
  console.log(`  ────────────────────`);
  console.log(`  Homepage:   http://localhost:${PORT}`);
  console.log(`  Tracker:    http://localhost:${PORT}/tracker`);
  console.log(`  1:1 Hub:    http://localhost:${PORT}/sync`);
  console.log(`  API:        http://localhost:${PORT}/api/tasks`);
  console.log(`  File:       ${ACTIVE_FILE}\n`);
});
