import dotenv from 'dotenv';
dotenv.config(); // Carica eventuali file .env locali

export const CONFIG = {
    downloader: {
        ip: process.env.DOWNLOADER_IP || '192.168.8.129',
        mac: process.env.DOWNLOADER_MAC || 'bc:30:5b:bf:95:71',
        rpcUrl: `http://${process.env.DOWNLOADER_IP || '192.168.8.129'}:6800/jsonrpc`,
        secret: process.env.RPC_SECRET || 'simone'
    },
    telegramToken: process.env.TELEGRAM_TOKEN || '',
    adminId: Number(process.env.ADMIN_ID) || 0
};