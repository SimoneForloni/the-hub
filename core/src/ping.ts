import { exec } from 'node:child_process';
import { CONFIG } from './config.js';

const log = (msg: string) =>
  console.log(`[${new Date().toISOString()}] [PING] ${msg}`);

const pingOnce = (ip: string): Promise<boolean> => 
	new Promise(resolve => {
		const flag = process.platform === 'win32' ? '-n' : '-c';
		exec(`ping ${flag} 1 -W 1 ${ip}`, (err) => resolve(!err));
	});

export const waitUntilOnline = (): Promise<boolean> => {
	const { pingTimeoutMs, pingIntervalMs } = CONFIG.wol;
	const deadline = Date.now() + pingTimeoutMs;

	return new Promise(resolve => {
		const check = async () => {
			if (await pingOnce(CONFIG.downloader.ip)) {
				resolve(true);
				return;
			}
			if (Date.now() >= deadline) {
				log(`Timeout (${pingTimeoutMs}ms) raggiunto.`);
				resolve(false);
				return;
			}
			setTimeout(check, pingIntervalMs);
		};
		check;
	});
}