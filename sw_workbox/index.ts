import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { IS_DEV } from './consts';

// У хабра PWA с Workbox - можно туды глядеть
// https://developer.chrome.com/docs/workbox/caching-strategies-overview?hl=ru
// https://habr.com/ru/companies/macloud/articles/563684/

if (!IS_DEV) {
	const pathNames = [
		'/',
		'/assets/index.js',
		'/assets/index.css',

		'/robots.txt',
		'/manifest.json',
		'/images/blood-moon.jpg',
		'/images/woman.jpg',
	];

	registerRoute(
		({ url }) => url.origin === self.location.origin && pathNames.includes(url.pathname),

		new CacheFirst({
			cacheName: 'content',
			plugins: [
				new CacheableResponsePlugin({ statuses: [200] }),
				new ExpirationPlugin({
					maxEntries: 60,
					maxAgeSeconds: 60 * 60 * 24 * 30,
				}),
			],
		}),
	);
}

registerRoute(
	({ request }) => request.headers.has('Cache-Service-Worker-Name'),
	new CacheFirst({
		cacheName: 'fetch',
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
			new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 60 * 60 }),
		],
	}),
);

registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	new CacheFirst({
		cacheName: 'fonts_styles',
		plugins: [
			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 60 * 60 * 24 * 30,
			}),
		],
	}),
);

registerRoute(
	/^https:\/\/fonts\.gstatic\.com/,
	new CacheFirst({
		cacheName: 'fonts',
		plugins: [
			new CacheableResponsePlugin({ statuses: [200] }),
			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 60 * 60 * 24 * 30,
			}),
		],
	}),
);

// все я чет заебался с sw сидеть...
