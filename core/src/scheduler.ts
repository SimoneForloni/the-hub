import * as cron from 'node-cron';
import { CONFIG } from './config.js';
import { wakeDownloader } from './wol.js';

const log = (msg: string) =>
  console.log(`[${new Date().toISOString()}] [SCHEDULER] ${msg}`);

export const startScheduler = (): cron.ScheduledTask => {
  log(`Cron registrato: "${CONFIG.wol.cronExpression}"`);

  const task = cron.schedule(CONFIG.wol.cronExpression, async () => {
    log('Esecuzione schedulata avviata.');
    await wakeDownloader();
  });

  return task;
};