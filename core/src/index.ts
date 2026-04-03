import { CONFIG } from './config.js';
import * as wol from 'node-wol';
import * as cron from 'node-cron';

console.log("🧠 Core in modalità Sviluppo avviato...");
console.log("📡 In ascolto per l'Optiplex all'IP:", CONFIG.downloader.ip);

const wakeDownloader = () => {
    console.log('Tentativo di risveglio:', CONFIG.downloader.ip, '[' + CONFIG.downloader.mac + ']');

    wol.wake(CONFIG.downloader.mac, (err) => {
        if (err) {
            console.error("❌ Errore durante l'invio del WOL:", err);
        } else {
            console.log("✅ Magic Packet inviato con successo!");
        }
    });
}

cron.schedule('0 7 * * *', () => {
    wakeDownloader();
})