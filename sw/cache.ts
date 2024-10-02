import { self } from './index';

const CACHE_SEPARATOR = '__v';

export const deleteOldVersions = async ({ version, name }: DefineCache) => {
	for (const key of await self.caches.keys()) {
		const [cacheName, cacheVersion] = key.split(CACHE_SEPARATOR);

		if (cacheName !== name) {
			continue;
		}

		if (+cacheVersion === version) {
			continue;
		}

		await self.caches.delete(key);
	}
};

export const addAll = async ({ hrefs, version, name }: DefineCache) => {
	const cache = await self.caches.open(`${name}${CACHE_SEPARATOR}${version}`);
	return cache.addAll(hrefs);
};
