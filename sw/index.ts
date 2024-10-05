import { addAll, deleteOldVersions, getCacheValue } from './cache';
import { cacheFirst } from './cacheStrategies';

// https://github.com/microsoft/TypeScript/issues/11781
// по умолчанию self это WorkerGlobalScope,
// а нам надо другой ServiceWorker

export declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		(async () => {
			await deleteOldVersions(__CACHE_PAYLOAD__);
			await addAll(__CACHE_PAYLOAD__);
		})(),
	);

	event.waitUntil(self.skipWaiting());
	console.info('%c[Service Worker] Install complete', 'background: #222; color: #bada55');
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(self.clients.claim());
	console.info(
		'%c[Service Worker] Activate claiming control',
		'background: #222; color: #bada55',
	);
});

self.addEventListener('fetch', (event: FetchEvent) => {
	const url = new URL(event.request.url);

	if (self.location.origin !== url.origin) {
		return;
	}

	event.respondWith(cacheFirst(__CACHE_PAYLOAD__, event.request));
});
