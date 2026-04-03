declare module 'node-wol' {
	export function wake(mac: string, callback?: (err: Error | null) => void): void;
	export function wake(mac: string, options: object, callback?: (err: Error | null) => void): void;
}