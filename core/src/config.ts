import dotenv from 'dotenv';
dotenv.config(); // Carica eventuali file .env locali

export const CONFIG = {
	downloader: {
		ip:  process.env.DOWNLOADER_IP  || '192.168.8.129',
		mac: process.env.DOWNLOADER_MAC || 'bc:30:5b:bf:95:71',
	},
	wol: {
		cronExpression:  process.env.WOL_CRON    || '0 7 * * *',
		maxRetries:      Number(process.env.WOL_RETRIES  || 3),
		retryDelayMs:    Number(process.env.WOL_DELAY_MS || 5000),
		pingTimeoutMs:   Number(process.env.PING_TIMEOUT || 30000),
		pingIntervalMs:  Number(process.env.PING_INTERVAL || 3000),
	},
	telegramToken: process.env.TELEGRAM_TOKEN || '',
	adminId: Number(process.env.ADMIN_ID) || 0
} as const;