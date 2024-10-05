import { addAll, deleteOldVersions } from './cache/cache';
import { cacheFirst } from './cache/cacheStrategies';

// https://github.com/microsoft/TypeScript/issues/11781
// по умолчанию self это WorkerGlobalScope,
// а нам надо другой ServiceWorker

export declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		(async () => {
			await deleteOldVersions(__CACHE_FOR_CONTENT__);
			await addAll(__CACHE_FOR_CONTENT__);
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


// не расскукоживать { respondWith } - наебыватся начинает TypeError: Illegal invocation
self.addEventListener('fetch', (event: FetchEvent) => {
	const request = event.request;
	const url = new URL(request.url);
	const IS_DEV = new URL(self.location.href).searchParams.get('development') === 'true';

	if (request.headers.has('Cache-Service-Worker-Name')) {
		return event.respondWith(
			cacheFirst(
				{
					name: request.headers.get('Cache-Service-Worker-Name') as string,
					version: Number(request.headers.get('Cache-Service-Worker-Version')),
					hrefs: [],
				},
				request,
			),
		);
	}

	// ниче не кэшируем если DEV
	if (IS_DEV) {
		return;
	}

	if (self.location.origin === url.origin) {
		return event.respondWith(cacheFirst(__CACHE_FOR_CONTENT__, request));
	}

	if (__CACHE_FOR_OUT_CONTENT__.hrefs.includes(url.hostname)) {
		return event.respondWith(cacheFirst(__CACHE_FOR_OUT_CONTENT__, request));
	}
});
