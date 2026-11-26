import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log(' Starting Gounder & Co. Showroom Website Services');
console.log('====================================================\n');

// 1. Launch Server (Express API on Port 5000)
const serverScript = path.join(__dirname, 'server', 'server.js');
const serverProcess = spawn(process.execPath, ['--watch', serverScript], {
  stdio: 'inherit',
  shell: false,
  env: { ...process.env, PORT: '5000' }
});

// 2. Launch Client (Vite Dev Server on Port 5173)
const viteCli = path.join(__dirname, 'client', 'node_modules', 'vite', 'bin', 'vite.js');
const clientDir = path.join(__dirname, 'client');
const clientProcess = spawn(process.execPath, [viteCli, clientDir, '--host'], {
  stdio: 'inherit',
  shell: false,
});

serverProcess.on('error', (err) => {
  console.error('[Server Error]:', err);
});

clientProcess.on('error', (err) => {
  console.error('[Client Error]:', err);
});

// Graceful exit
const cleanup = () => {
  try { serverProcess.kill('SIGINT'); } catch (e) {}
  try { clientProcess.kill('SIGINT'); } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

