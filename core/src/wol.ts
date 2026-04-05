import * as wol from 'node-wol';
import { CONFIG } from './config.js';
import { waitUntilOnline } from './ping.js';

const log = (msg: string) => 
	console.log(`[${new Date().toISOString()}] [WOL] ${msg}`);

const senMagicPacket = (): Promise<void> => 
	new Promise((resolve, reject) => {
		wol.wake(CONFIG.downloader.mac, (err) => {
			if (err) reject(err);
      else resolve();
		});
	});

export const wakeDownloader = async (): Promise<boolean> => {
	const { maxRetries, retryDelayMs } = CONFIG.wol;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try { 
			log(`Tentativo ${attempt}/${maxRetries} → ${CONFIG.downloader.mac}`);
			await senMagicPacket();
      log('Magic Packet inviato.');

			const online = await waitUntilOnline();
			if (online) {
				log(`Downloader online (${CONFIG.downloader.ip}).`);
        return true;
			}
		} catch (err) {
      log(`ERRORE invio WOL: ${err}`);
    }

		if (attempt < maxRetries)
      await new Promise(r => setTimeout(r, retryDelayMs));
	}

	log('ERRORE: impossibile svegliare il downloader dopo tutti i tentativi.');
  return false;
}