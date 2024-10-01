// https://github.com/microsoft/TypeScript/issues/11781
// по умолчанию self это WorkerGlobalScope,
// а нам надо другой ServiceWorker
export declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
	console.info(event);
});

self.addEventListener('activate', (event) => {
	console.info(event);
});

self.addEventListener('fetch', (event) => {
	console.info(event);
});

self.addEventListener('message', (event) => {
	console.info(event);
});
