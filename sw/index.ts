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
});

self.addEventListener('fetch', ({ request, respondWith }) => {});
