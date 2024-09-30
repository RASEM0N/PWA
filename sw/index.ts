/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
	console.info(event);
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	console.info(event);
});

self.addEventListener('fetch', (event: ExtendableEvent) => {
	console.info(event);
});

self.addEventListener('message', (event: ExtendableEvent) => {
	console.info(event);
});
