import { addAll, deleteOldVersions } from './cache';

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

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
	console.info('%c[Service Worker] Activate claiming control', 'background: #222; color: #bada55');
})

self.addEventListener('fetch', ({ request, respondWith }) => {});
