import { startScheduler } from './scheduler.js';
import { CONFIG } from './config.js';

const log = (msg: string) =>
  console.log(`[${new Date().toISOString()}] [CORE] ${msg}`);

log('Avviato.');
log(`Downloader: ${CONFIG.downloader.ip} [${CONFIG.downloader.mac}]`);
log(`Cron: "${CONFIG.wol.cronExpression}"`);

const task = startScheduler();

/* Shutdown pulito */
const shutdown = (signal: string) => {
  log(`Segnale ${signal} ricevuto. Arresto in corso...`);
  task.stop();
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));